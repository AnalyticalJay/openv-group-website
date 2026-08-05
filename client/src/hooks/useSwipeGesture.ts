import { useEffect, useRef } from 'react';

interface SwipeOptions {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number; // Minimum distance (in pixels) to trigger swipe
  timeThreshold?: number; // Maximum time (in ms) for a swipe gesture
}

export function useSwipeGesture(
  elementRef: React.RefObject<HTMLElement | null>,
  options: SwipeOptions
) {
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const {
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    threshold = 50,
    timeThreshold = 500,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
        time: Date.now(),
      };

      const { x: startX, y: startY, time: startTime } = touchStartRef.current;
      const deltaX = touchEnd.x - startX;
      const deltaY = touchEnd.y - startY;
      const deltaTime = touchEnd.time - startTime;

      // Check if swipe is within time threshold
      if (deltaTime > timeThreshold) return;

      // Determine swipe direction
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Swipe up (negative Y movement)
      if (absDeltaY > threshold && absDeltaY > absDeltaX && deltaY < 0) {
        onSwipeUp?.();
      }
      // Swipe down (positive Y movement)
      else if (absDeltaY > threshold && absDeltaY > absDeltaX && deltaY > 0) {
        onSwipeDown?.();
      }
      // Swipe left (negative X movement)
      else if (absDeltaX > threshold && absDeltaX > absDeltaY && deltaX < 0) {
        onSwipeLeft?.();
      }
      // Swipe right (positive X movement)
      else if (absDeltaX > threshold && absDeltaX > absDeltaY && deltaX > 0) {
        onSwipeRight?.();
      }
    };

    element.addEventListener('touchstart', handleTouchStart, false);
    element.addEventListener('touchend', handleTouchEnd, false);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart, false);
      element.removeEventListener('touchend', handleTouchEnd, false);
    };
  }, [onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, threshold, timeThreshold]);
}
