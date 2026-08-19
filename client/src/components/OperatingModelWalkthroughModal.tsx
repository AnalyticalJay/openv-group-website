import { ArrowRight, Check, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/animations';

type OperatingModelWalkthroughModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBookConsultation: () => void;
};

const walkthroughSteps = [
  {
    label: 'Align',
    title: 'Bring every layer into view.',
    copy: 'We map your technology, operations and growth activity into one accountable picture.',
    accent: '#FF6B35',
  },
  {
    label: 'Coordinate',
    title: 'One team leads the delivery.',
    copy: 'OpenV aligns specialist capability, ownership and priorities across the business.',
    accent: '#1B8EFF',
  },
  {
    label: 'Progress',
    title: 'Move forward with clarity.',
    copy: 'Your team gets connected systems, predictable planning and a clear route to resolution.',
    accent: '#13C46B',
  },
];

export default function OperatingModelWalkthroughModal({ isOpen, onClose, onBookConsultation }: OperatingModelWalkthroughModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeModal = (continueToConsultation = false) => {
    const complete = () => {
      onClose();
      if (continueToConsultation) onBookConsultation();
    };

    if (prefersReducedMotion() || !contentRef.current || !overlayRef.current) {
      complete();
      return;
    }

    gsap.to(overlayRef.current, { opacity: 0, duration: 0.18, ease: 'power2.out' });
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 18,
      scale: 0.985,
      duration: 0.24,
      ease: 'power2.in',
      onComplete: complete,
    });
  };

  useEffect(() => {
    if (!isOpen || !modalRef.current || !contentRef.current || !overlayRef.current) return;

    const modal = modalRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;
    const reducedMotion = prefersReducedMotion();
    gsap.set(modal, { display: 'flex' });

    if (reducedMotion) {
      gsap.set([overlay, content], { opacity: 1, y: 0, scale: 1 });
    } else {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.24, ease: 'power2.out' });
      gsap.fromTo(content, { opacity: 0, y: 20, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: 'power3.out' });
      gsap.fromTo(content.querySelectorAll('[data-walkthrough-step]'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.38, stagger: 0.06, ease: 'power3.out', delay: 0.08 });
    }

    closeButtonRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || prefersReducedMotion()) return;
    const timer = window.setInterval(() => setActiveStep((current) => (current + 1) % walkthroughSteps.length), 4200);
    return () => window.clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || prefersReducedMotion() || !contentRef.current) return;
    const activePanel = contentRef.current.querySelector<HTMLElement>('[data-walkthrough-active]');
    const activeProgress = contentRef.current.querySelector<HTMLElement>('[data-walkthrough-progress]');
    if (activePanel) gsap.fromTo(activePanel, { opacity: 0.5, y: 8 }, { opacity: 1, y: 0, duration: 0.32, ease: 'power3.out', overwrite: true });
    if (activeProgress) gsap.fromTo(activeProgress, { scaleX: 0 }, { scaleX: 1, duration: 3.9, ease: 'none', overwrite: true });
  }, [activeStep, isOpen]);

  if (!isOpen) return null;
  const step = walkthroughSteps[activeStep];

  return (
    <div ref={modalRef} className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ display: 'none' }}>
      <button ref={overlayRef} type="button" aria-label="Close walkthrough" className="absolute inset-0 cursor-default bg-[#07111C]/75 backdrop-blur-md" onClick={() => closeModal()} style={{ opacity: 0 }} />
      <section ref={contentRef} role="dialog" aria-modal="true" aria-labelledby="walkthrough-title" aria-describedby="walkthrough-description" className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111C] text-white shadow-[0_30px_100px_rgba(7,17,28,0.55)]" style={{ opacity: 0 }}>
        <div className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full border border-[#FF6B35]/25" />
        <div className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full border border-[#1B8EFF]/25" />
        <button ref={closeButtonRef} type="button" aria-label="Close walkthrough" onClick={() => closeModal()} className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-white/45 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13C46B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111C]"><X className="h-5 w-5" /></button>

        <div className="relative p-6 sm:p-8 md:p-10">
          <p data-walkthrough-step className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF6B35]">HOW THE OPERATING MODEL WORKS</p>
          <h2 id="walkthrough-title" data-walkthrough-step className="mt-3 max-w-xl font-manrope text-3xl font-black leading-[1.05] sm:text-4xl">A clear path from <span className="text-[#13C46B]">inputs to outcomes.</span></h2>
          <p id="walkthrough-description" data-walkthrough-step className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">Three short moves turn separate services into one coordinated operating model.</p>

          <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
            {walkthroughSteps.map((item, index) => {
              const isActive = activeStep === index;
              return <button key={item.label} type="button" data-walkthrough-step onClick={() => setActiveStep(index)} aria-pressed={isActive} className={`relative overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13C46B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111C] ${isActive ? 'border-white/30 bg-white/[0.09]' : 'border-white/10 bg-white/[0.025] hover:border-white/25'}`}><span className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: item.accent }}>{item.label}</span><span className="mt-2 block font-manrope text-sm font-black leading-tight text-white">{item.title}</span>{isActive && <span data-walkthrough-progress className="absolute bottom-0 left-0 h-0.5 w-full origin-left" style={{ backgroundColor: item.accent }} />}</button>;
            })}
          </div>

          <div data-walkthrough-active className="relative mt-5 rounded-2xl border border-white/10 bg-[#0A1828]/90 p-5 sm:p-6">
            <div className="flex items-start gap-4"><span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-black" style={{ borderColor: `${step.accent}88`, color: step.accent, backgroundColor: `${step.accent}14` }}>0{activeStep + 1}</span><div><p className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: step.accent }}>{step.label}</p><p className="mt-2 font-manrope text-xl font-black leading-tight">{step.title}</p><p className="mt-3 max-w-xl text-sm leading-relaxed text-white/58">{step.copy}</p></div></div>
            <div aria-hidden="true" className="mt-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.15em] text-white/42"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: step.accent }} />Step {activeStep + 1} of {walkthroughSteps.length}<span className="mx-2 h-px flex-1 bg-white/10" /><Check className="h-3.5 w-3.5 text-[#13C46B]" /></div>
          </div>

          <div data-walkthrough-step className="mt-7 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left"><p className="text-sm leading-relaxed text-white/55">Ready to apply this model to your business?</p><button type="button" onClick={() => closeModal(true)} className="inline-flex items-center gap-2 rounded-full border border-[#13C46B]/50 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#13C46B] transition-all duration-300 hover:border-[#13C46B] hover:bg-[#13C46B] hover:text-[#07111C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13C46B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111C]">Book a consultation <ArrowRight className="h-4 w-4" /></button></div>
        </div>
      </section>
    </div>
  );
}
