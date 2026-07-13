/**
 * Main Application Entry Point
 * Initializes all core modules and premium animations
 * Accessible Motion & User Experience - Phase 3
 */

import '../css/main.css';
import gsap from 'gsap';

// Performance & Accessibility (must be first)
import { initPerformanceOptimizations } from './modules/performance-optimization-v2';

// Core modules
import { pageAnimationController } from './modules/page-animation-controller';
import { initAccessibleNavigation, initScrollSpy } from './modules/navigation-accessible';

// Premium animation modules
import { initHeroAnimations, animateHeroStats, animateCtaButtonHover } from './modules/hero-animations';
import { initSectionAnimations, addCardHoverEffects } from './modules/section-animations';
import { initAdvancedScrollAnimations } from './modules/scroll-animations';
import { initAccessibleMicroInteractions } from './modules/micro-interactions-accessible';
import { initAccessiblePagePolish, createAccessiblePreloader } from './modules/page-polish-accessible';
import { initAccessibleCursorEffects } from './modules/cursor-effects-accessible';
import { initAccessibleCardHoverEffects } from './modules/card-hover-accessible';
import { initButtonEnhancements, handleReducedMotion } from './modules/button-enhancements';
import { initButtonAnimations, initMobileOptimizations, initThemeVariations } from './modules/button-animations';
import { initPartnerMarquee } from './modules/partner-marquee';

/**
 * Initialize Application
 * Runs when DOM is fully loaded
 */
const initializeApp = () => {
  try {
    console.log('[Main] 🚀 Initializing OpenV Group Premium Experience...');

    // Phase 0: Initialize performance & accessibility (MUST BE FIRST)
    console.log('[Main] → Initializing performance & accessibility optimizations...');
    initPerformanceOptimizations();

    // Phase 1: Initialize Animation Framework & Smooth Scroll
    console.log('[Main] → Initializing animation framework...');
    pageAnimationController.init();

    // Phase 2: Initialize accessible navigation
    console.log('[Main] → Initializing accessible navigation...');
    initAccessibleNavigation();

    // Phase 3: Initialize accessible page polish
    console.log('[Main] → Initializing accessible page polish...');
    initAccessiblePagePolish();
    createAccessiblePreloader();

    // Phase 4: Initialize hero animations
    console.log('[Main] → Initializing hero section animations...');
    initHeroAnimations();
    animateHeroStats();
    animateCtaButtonHover();

    // Phase 5: Initialize advanced scroll animations (data-attribute based)
    console.log('[Main] → Initializing advanced scroll animations...');
    initAdvancedScrollAnimations();
    
    // Phase 5b: Initialize section-specific animations
    console.log('[Main] → Initializing section animations...');
    initSectionAnimations();
    addCardHoverEffects();
    
    // Phase 5c: Initialize enhanced card hover effects
    console.log('[Main] → Initializing enhanced card hover effects...');
    initAccessibleCardHoverEffects();
    
    // Phase 5d: Initialize partner marquee
    console.log('[Main] → Initializing partner marquee...');
    initPartnerMarquee();

    // Phase 6: Initialize micro-interactions
    console.log('[Main] → Initializing micro-interactions...');
    initAccessibleMicroInteractions();
    
    // Phase 6b: Initialize button enhancements
    console.log('[Main] → Initializing button enhancements...');
    initButtonEnhancements();
    handleReducedMotion();
    
    // Phase 6c: Initialize button animations
    console.log('[Main] → Initializing button animations...');
    initButtonAnimations();
    initMobileOptimizations();
    initThemeVariations();

    // Phase 7: Initialize cursor effects
    console.log('[Main] → Initializing cursor effects...');
    initAccessibleCursorEffects();

    // Final: Log success
    console.log('[Main] ✅ OpenV Group Premium Experience Ready');
    console.log('[Main] 🎨 Accessible Motion & User Experience - Phase 3 Complete');
    console.log('[Main] 📊 All modules initialized with accessibility & performance optimizations');
  } catch (error) {
    console.error('[Main] ❌ Error during initialization:', error);
  }
};

/**
 * Cleanup on Page Unload
 */
const cleanupOnUnload = () => {
  try {
    console.log('[Main] 🧹 Cleaning up resources...');
    // Kill all animations
    gsap.killTweensOf('*');
    // Cleanup will be handled by individual modules
  } catch (error) {
    console.error('[Main] Error during cleanup:', error);
  }
};

/**
 * Wait for DOM to be ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

/**
 * Cleanup on unload
 */
window.addEventListener('beforeunload', cleanupOnUnload);

/**
 * Export for external use
 */
export { initializeApp, cleanupOnUnload };
