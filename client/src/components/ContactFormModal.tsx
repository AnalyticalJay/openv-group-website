import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle, AlertCircle, Mail, Phone, Building2, User, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/animations';
import { validateForm, sanitizeInput, FormData, FormErrors } from '@/lib/formValidation';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', company: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const sanitized = sanitizeInput(value);
    setFormData((current) => ({ ...current, [name]: sanitized }));
    if (touchedFields.has(name)) {
      const nextErrors = validateForm({ ...formData, [name]: sanitized });
      setErrors((current) => ({ ...current, [name]: nextErrors[name as keyof FormErrors] }));
    }
  };

  const handleFieldBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target;
    setTouchedFields((current) => new Set([...Array.from(current), name]));
    const nextErrors = validateForm(formData);
    setErrors((current) => ({ ...current, [name]: nextErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouchedFields(new Set(['name', 'email', 'phone', 'company', 'message']));
    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstErrorField = Object.keys(nextErrors)[0];
      formRef.current?.querySelector(`[name="${firstErrorField}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const response = await new Promise<{ success: boolean }>((resolve) => {
        window.setTimeout(() => resolve({ success: true }), 1500);
      });
      if (!response.success) throw new Error('Failed to submit form');

      setSubmitStatus('success');
      setSubmitMessage('Thank you. Our team will be in touch within 24 hours.');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setTouchedFields(new Set());
      setErrors({});
      window.setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 3000);
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;
    if (!modal || !content || !overlay) return;

    gsap.set(modal, { display: 'flex' });
    if (prefersReducedMotion()) {
      gsap.set([overlay, content], { opacity: 1, y: 0, scale: 1 });
    } else {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.24, ease: 'power2.out' });
      gsap.fromTo(content, { opacity: 0, y: 24, scale: 0.975 }, { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: 'power3.out' });
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && submitStatus === 'idle') handleClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, submitStatus]);

  const handleClose = () => {
    if (isSubmitting) return;
    const complete = () => {
      onClose();
      gsap.set(modalRef.current, { display: 'none' });
    };
    if (prefersReducedMotion() || !contentRef.current || !overlayRef.current) {
      complete();
      return;
    }
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.18, ease: 'power2.out' });
    gsap.to(contentRef.current, { opacity: 0, y: 18, scale: 0.985, duration: 0.24, ease: 'power2.in', onComplete: complete });
  };

  if (!isOpen) return null;

  const fieldClass = (hasError: boolean) => `w-full rounded-xl border bg-white/[0.055] px-4 py-3 text-sm text-white placeholder:text-white/28 outline-none transition-[border-color,box-shadow,background-color] duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${hasError ? 'border-[#FF1744] bg-[#FF1744]/[0.08] focus:border-[#FF1744] focus:ring-2 focus:ring-[#FF1744]/25' : 'border-white/12 focus:border-[#13C46B] focus:bg-white/[0.075] focus:ring-2 focus:ring-[#13C46B]/20'}`;
  const fieldError = (field: keyof FormErrors) => errors[field] && touchedFields.has(field);

  return (
    <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5" style={{ display: 'none' }}>
      <div ref={overlayRef} className="absolute inset-0 bg-[#02070D]/80 backdrop-blur-md" onClick={handleClose} style={{ opacity: 0 }} />
      <div ref={contentRef} role="dialog" aria-modal="true" aria-labelledby="consultation-title" className="relative z-10 grid max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#07111C] text-white shadow-[0_32px_100px_rgba(2,7,13,0.68)] lg:max-h-[88vh] lg:grid-cols-[0.84fr_1.16fr] lg:overflow-hidden" style={{ opacity: 0 }} onClick={(event) => event.stopPropagation()}>
        <div className="relative overflow-hidden border-b border-white/10 bg-[#0A1828] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div className="pointer-events-none absolute -left-20 -top-16 h-64 w-64 rounded-full border border-[#FF6B35]/25" />
          <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full border border-[#1B8EFF]/25" />
          <div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: 'linear-gradient(132deg, transparent 0 44%, rgba(255,107,53,0.11) 44.2% 44.5%, transparent 44.7% 100%), linear-gradient(45deg, transparent 0 72%, rgba(27,142,255,0.10) 72.2% 72.5%, transparent 72.7% 100%)' }} />
          <div className="relative flex h-full flex-col">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF6B35]"><span className="h-2 w-2 rounded-full bg-[#FF6B35] shadow-[0_0_16px_rgba(255,107,53,0.7)]" />OPENV GROUP / CONSULTATION</div>
            <h2 id="consultation-title" className="mt-5 max-w-sm font-manrope text-3xl font-black leading-[1.04] sm:text-4xl">Let’s map the <span className="text-[#13C46B]">next move.</span></h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/58">Share the context. Our specialist team will connect the right people, technology and next steps.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">Response</p><p className="mt-2 text-sm font-bold text-white">Within one business day</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">Call us</p><a href="tel:0413790550" className="mt-2 inline-flex text-sm font-bold text-white transition-colors hover:text-[#13C46B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13C46B]">041 379 0550</a></div>
            </div>
            <div className="mt-auto hidden pt-10 lg:block"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/32">One accountable relationship</p><div className="mt-3 h-px w-full bg-gradient-to-r from-[#FF6B35] via-[#1B8EFF] to-transparent" /></div>
          </div>
        </div>

        <div className="relative max-h-[72vh] overflow-y-auto p-6 sm:p-8 lg:max-h-[88vh] lg:p-10">
          <button type="button" onClick={handleClose} disabled={isSubmitting} aria-label="Close modal" className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/60 transition-colors duration-200 hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13C46B] disabled:opacity-40"><X className="h-5 w-5" /></button>
          <div className="pr-12"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#13C46B]">START THE CONVERSATION</p><p className="mt-2 text-sm leading-relaxed text-white/55">A few details help us prepare the right discussion.</p></div>

          {submitStatus === 'success' ? (
            <div aria-live="polite" className="flex min-h-[390px] flex-col items-center justify-center text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#13C46B]/45 bg-[#13C46B]/10"><CheckCircle className="h-8 w-8 text-[#13C46B]" /></div><h3 className="mt-6 font-manrope text-2xl font-black">Thank you.</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-white/58">{submitMessage}</p><p className="mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">Closing in a moment</p></div>
          ) : submitStatus === 'error' ? (
            <div aria-live="assertive" className="flex min-h-[390px] flex-col items-center justify-center text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#FF1744]/45 bg-[#FF1744]/10"><AlertCircle className="h-8 w-8 text-[#FF1744]" /></div><h3 className="mt-6 font-manrope text-2xl font-black">Let’s try that again.</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-white/58">{submitMessage}</p><button type="button" onClick={() => setSubmitStatus('idle')} className="mt-7 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF1744] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111C]">Try again</button></div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label htmlFor="name" className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/62"><User className="h-3.5 w-3.5 text-[#FF6B35]" />Full name <span className="text-[#FF6B35]">*</span></label><input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} onBlur={handleFieldBlur} placeholder="John Doe" className={fieldClass(Boolean(fieldError('name')))} disabled={isSubmitting} autoComplete="name" />{fieldError('name') && <p className="mt-2 flex items-center gap-1.5 text-xs text-[#FF6B35]"><AlertCircle className="h-3.5 w-3.5" />{errors.name}</p>}</div>
                <div><label htmlFor="company" className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/62"><Building2 className="h-3.5 w-3.5 text-[#FF6B35]" />Company <span className="text-[#FF6B35]">*</span></label><input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} onBlur={handleFieldBlur} placeholder="Your company" className={fieldClass(Boolean(fieldError('company')))} disabled={isSubmitting} autoComplete="organization" />{fieldError('company') && <p className="mt-2 flex items-center gap-1.5 text-xs text-[#FF6B35]"><AlertCircle className="h-3.5 w-3.5" />{errors.company}</p>}</div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label htmlFor="email" className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/62"><Mail className="h-3.5 w-3.5 text-[#1B8EFF]" />Email address <span className="text-[#FF6B35]">*</span></label><input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleFieldBlur} placeholder="john@company.com" className={fieldClass(Boolean(fieldError('email')))} disabled={isSubmitting} autoComplete="email" />{fieldError('email') && <p className="mt-2 flex items-center gap-1.5 text-xs text-[#FF6B35]"><AlertCircle className="h-3.5 w-3.5" />{errors.email}</p>}</div>
                <div><label htmlFor="phone" className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/62"><Phone className="h-3.5 w-3.5 text-[#1B8EFF]" />Phone number <span className="text-[#FF6B35]">*</span></label><input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={handleFieldBlur} placeholder="+27 (0)41 379 0550" className={fieldClass(Boolean(fieldError('phone')))} disabled={isSubmitting} autoComplete="tel" />{fieldError('phone') && <p className="mt-2 flex items-center gap-1.5 text-xs text-[#FF6B35]"><AlertCircle className="h-3.5 w-3.5" />{errors.phone}</p>}</div>
              </div>
              <div><div className="mb-2 flex items-center justify-between gap-4"><label htmlFor="message" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/62"><MessageSquare className="h-3.5 w-3.5 text-[#13C46B]" />What would you like to achieve? <span className="text-[#FF6B35]">*</span></label><span className="text-[10px] font-medium text-white/30">{formData.message.length}/5000</span></div><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} onBlur={handleFieldBlur} placeholder="Tell us about the opportunity, challenge or project..." rows={4} className={`${fieldClass(Boolean(fieldError('message')))} resize-none`} disabled={isSubmitting} />{fieldError('message') && <p className="mt-2 flex items-center gap-1.5 text-xs text-[#FF6B35]"><AlertCircle className="h-3.5 w-3.5" />{errors.message}</p>}</div>
              <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xs text-xs leading-relaxed text-white/42">Your details are used only to respond to this consultation request.</p><button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF1744] px-6 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_12px_28px_rgba(255,107,53,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(255,107,53,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111C] disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Sending request</span> : 'Send consultation request'}</button></div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
