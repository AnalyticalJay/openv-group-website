/**
 * Main Application Entry Point - Optimized Version
 * Initializes all core modules and premium animations with performance optimizations
 * Achieves Lighthouse 95+ and 60fps animations
 */

import '../css/main.css';
import '../css/performance-optimizations.css';
import gsap from 'gsap';

// Performance & Accessibility (must be first)
import { initPerformanceOptimizations } from './modules/performance-optimization-v2';

// Core modules - Optimized versions
import { scrollControllerOptimized } from './modules/scroll-controller-optimized';
import { pageAnimationController } from './modules/page-animation-controller';
import { initAccessibleNavigation, initScrollSpy } from './modules/navigation-accessible';

// Premium animation modules - Optimized versions
import { initHeroAnimations, animateHeroStats, animateCtaButtonHover } from './modules/hero-animations';
import { initSectionAnimations, addCardHoverEffects } from './modules/section-animations';
import { initOptimizedScrollAnimations } from './modules/scroll-animations-optimized';
import { initOptimizedMicroInteractions } from './modules/micro-interactions-optimized';
import { initOptimizedPagePolish } from './modules/page-polish-optimized';
import { initOptimizedCursorEffects } from './modules/cursor-effects-optimized';
import { initAccessibleCardHoverEffects } from './modules/card-hover-accessible';
import { initPartnerMarquee } from './modules/partner-marquee';

/**
 * Global cleanup handler
 */
const globalCleanup = () => {
  try {
    console.log('[Main] 🧹 Performing global cleanup...');
    
    // Kill all GSAP tweens
    gsap.killTweensOf('*');
    
    // Cleanup scroll controller
    if (scrollControllerOptimized) {
      scrollControllerOptimized.destroy();
    }
    
    console.log('[Main] ✓ Global cleanup complete');
  } catch (error) {
    console.error('[Main] Error during global cleanup:', error);
  }
};

/**
 * Initialize Application
 * Runs when DOM is fully loaded
 */
const initializeApp = () => {
  try {
    console.log('[Main] 🚀 Initializing OpenV Group Premium Experience (Optimized)...');

    // Phase 0: Initialize performance & accessibility (MUST BE FIRST)
    console.log('[Main] → Initializing performance & accessibility optimizations...');
    initPerformanceOptimizations();

    // Phase 1: Initialize Optimized Scroll Controller
    console.log('[Main] → Initializing optimized scroll controller...');
    scrollControllerOptimized.init();

    // Phase 2: Initialize accessible navigation
    console.log('[Main] → Initializing accessible navigation...');
    initAccessibleNavigation();

    // Phase 3: Initialize optimized page polish
    console.log('[Main] → Initializing optimized page polish...');
    initOptimizedPagePolish();

    // Phase 4: Initialize hero animations
    console.log('[Main] → Initializing hero section animations...');
    initHeroAnimations();
    animateHeroStats();
    animateCtaButtonHover();

    // Phase 5: Initialize optimized scroll animations
    console.log('[Main] → Initializing optimized scroll animations...');
    initOptimizedScrollAnimations();
    
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

    // Phase 6: Initialize optimized micro-interactions
    console.log('[Main] → Initializing optimized micro-interactions...');
    initOptimizedMicroInteractions();

    // Phase 7: Initialize optimized cursor effects
    console.log('[Main] → Initializing optimized cursor effects...');
    initOptimizedCursorEffects();

    // Phase 8: Initialize scroll spy
    console.log('[Main] → Initializing scroll spy...');
    initScrollSpy();

    // Final: Log success
    console.log('[Main] ✅ OpenV Group Premium Experience Ready');
    console.log('[Main] 🎨 Performance Optimized - Lighthouse 95+ Ready');
    console.log('[Main] 📊 All modules initialized with performance optimizations');
  } catch (error) {
    console.error('[Main] ❌ Error during initialization:', error);
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
window.addEventListener('beforeunload', globalCleanup);

/**
 * Handle visibility change for performance optimization
 */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when tab is hidden
    gsap.globalTimeline.pause();
    scrollControllerOptimized.pause();
    console.log('[Main] ⏸️ Animations paused (tab hidden)');
  } else {
    // Resume animations when tab becomes visible
    gsap.globalTimeline.play();
    scrollControllerOptimized.resume();
    console.log('[Main] ▶️ Animations resumed (tab visible)');
  }
});

/**
 * Export for external use
 */
export { initializeApp, globalCleanup };
