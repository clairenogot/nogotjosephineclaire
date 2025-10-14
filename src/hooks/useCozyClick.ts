import { useEffect } from 'react'
import { playClick } from '../utils/sounds'

/**
 * Hook to add cozy click sounds to all interactive elements globally
 */
export function useCozyClick() {
  useEffect(() => {
    // Track last click time to prevent double sounds
    let lastClickTime = 0
    const DEBOUNCE_MS = 100

    const handleClick = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastClickTime < DEBOUNCE_MS) return
      
      const target = e.target as HTMLElement
      
      // Check if the clicked element or its parent is interactive
      const isInteractive = target.closest('button, a, [role="button"], .interactive-card, input[type="submit"]')
      
      // Skip if element has data-no-sound attribute (for elements that already play sounds)
      const hasNoSound = target.closest('[data-no-sound]')
      
      if (isInteractive && !hasNoSound) {
        lastClickTime = now
        playClick(true)
      }
    }

    // Add event listener to the document
    document.addEventListener('click', handleClick, { capture: true })

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
    }
  }, [])
}
