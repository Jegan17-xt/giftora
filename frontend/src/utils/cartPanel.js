import { useSyncExternalStore } from 'react'

// Whether the cart panel is open on screens where it slides in (tablet / phone).
// On wide screens the panel is docked on the right and always visible.
let open = false
const listeners = new Set()
const emit = () => listeners.forEach(fn => fn())

export function openCartPanel()  { if (!open) { open = true; emit() } }
export function closeCartPanel() { if (open) { open = false; emit() } }

export function useCartPanelOpen() {
  return useSyncExternalStore(fn => { listeners.add(fn); return () => listeners.delete(fn) }, () => open)
}

/** Width from which the panel is docked beside the page instead of sliding over it. */
export const DOCK_QUERY = '(min-width: 1200px)'
