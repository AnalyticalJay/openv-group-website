import { useState, useRef, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Mail, Phone, Building2, User, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/animations';
import { validateForm, sanitizeInput, FormData, FormErrors } from '@/lib/formValidation';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle input change with real-time validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitized = sanitizeInput(value);
    
    setFormData(prev => ({ ...prev, [name]: sanitized }));

    // Real-time validation for touched fields
    if (touchedFields.has(name)) {
      const newErrors = validateForm({ ...formData, [name]: sanitized });
      setErrors(prev => ({
        ...prev,
        [name]: newErrors[name as keyof FormErrors],
      }));
    }
  };

  // Mark field as touched
  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouchedFields(prev => new Set([...Array.from(prev), name]));

    // Validate on blur
    const newErrors = validateForm(formData);
    setErrors(prev => ({
      ...prev,
      [name]: newErrors[name as keyof FormErrors],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = new Set<string>();
    ['name', 'email', 'phone', 'company', 'message'].forEach(f => allTouched.add(f));
    setTouchedFields(allTouched);

    // Validate form
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Scroll to first error
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = formRef.current?.querySelector(`[name="${firstErrorField}"]`);
      errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call (replace with actual API endpoint)
      // In production, send data to your backend
      const response = await new Promise<{ success: boolean }>((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1500);
      });

      if (response.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! We\'ll be in touch within 24 hours.');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        setTouchedFields(new Set());
        setErrors({});

        // Auto-close after 3 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 3000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again later or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle modal open/close animations
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;

    if (!modal || !content || !overlay) return;

    gsap.set(modal, { display: 'flex' });

    if (!prefersReducedMotion()) {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        content,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.set([overlay, content], { opacity: 1 });
    }

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && submitStatus === 'idle') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, submitStatus]);

  // Handle modal close animation
  const handleClose = () => {
    if (isSubmitting) return; // Prevent closing while submitting

    const content = contentRef.current;
    const overlay = overlayRef.current;

    if (!prefersReducedMotion() && content && overlay) {
      gsap.to(overlay, { opacity: 0, duration: 0.2 });
      gsap.to(content, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          onClose();
          gsap.set(modalRef.current, { display: 'none' });
        },
      });
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ display: 'none' }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        style={{ opacity: 0 }}
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative w-full max-w-md bg-white rounded-lg shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        style={{ opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">Book a Consultation</h2>
          <p className="text-sm md:text-base text-gray-600">
            Tell us about your business needs and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Modal Body */}
        <div className="px-6 md:px-8 py-6 md:py-8">
          {submitStatus === 'success' ? (
            // Success State
            <div className="flex flex-col items-center justify-center py-8 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Success!</h3>
              <p className="text-center text-gray-600 text-sm">{submitMessage}</p>
              <p className="text-center text-gray-500 text-xs mt-4">Closing in a moment...</p>
            </div>
          ) : submitStatus === 'error' ? (
            // Error State
            <div className="flex flex-col items-center justify-center py-8 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Error</h3>
              <p className="text-center text-gray-600 text-sm">{submitMessage}</p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="mt-4 px-4 py-2 text-sm font-bold text-white rounded transition-all hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)' }}
              >
                Try Again
              </button>
            </div>
          ) : (
            // Form State
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="flex items-center text-sm font-bold text-navy mb-2">
                  <User className="w-4 h-4 mr-2 text-orange-500" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  placeholder="John Doe"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.name && touchedFields.has('name')
                      ? 'border-red-500 focus:ring-red-500 bg-red-50'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  }`}
                  disabled={isSubmitting}
                  autoComplete="name"
                />
                {errors.name && touchedFields.has('name') && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="flex items-center text-sm font-bold text-navy mb-2">
                  <Mail className="w-4 h-4 mr-2 text-orange-500" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.email && touchedFields.has('email')
                      ? 'border-red-500 focus:ring-red-500 bg-red-50'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  }`}
                  disabled={isSubmitting}
                  autoComplete="email"
                />
                {errors.email && touchedFields.has('email') && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="flex items-center text-sm font-bold text-navy mb-2">
                  <Phone className="w-4 h-4 mr-2 text-orange-500" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  placeholder="+27 (0)41 379 0550"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.phone && touchedFields.has('phone')
                      ? 'border-red-500 focus:ring-red-500 bg-red-50'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  }`}
                  disabled={isSubmitting}
                  autoComplete="tel"
                />
                {errors.phone && touchedFields.has('phone') && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Company Field */}
              <div>
                <label htmlFor="company" className="flex items-center text-sm font-bold text-navy mb-2">
                  <Building2 className="w-4 h-4 mr-2 text-orange-500" />
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  placeholder="Your Company"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.company && touchedFields.has('company')
                      ? 'border-red-500 focus:ring-red-500 bg-red-50'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  }`}
                  disabled={isSubmitting}
                  autoComplete="organization"
                />
                {errors.company && touchedFields.has('company') && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.company}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="flex items-center text-sm font-bold text-navy mb-2">
                  <MessageSquare className="w-4 h-4 mr-2 text-orange-500" />
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  placeholder="Tell us about your project..."
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message && touchedFields.has('message')
                      ? 'border-red-500 focus:ring-red-500 bg-red-50'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  }`}
                  disabled={isSubmitting}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message && touchedFields.has('message') && (
                    <p className="text-xs text-red-600 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 ml-auto">
                    {formData.message.length}/5000
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 text-white font-bold uppercase tracking-widest rounded transition-all hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)',
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </span>
                ) : (
                  'Send Consultation Request'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                * All fields are required
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
