import { quintOut } from "svelte/easing";

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Enter transition: fade + small upward slide, optional blur to soften content swaps.
export function rise(
  _node: Element,
  { y = 8, blur = 0, duration = 240 }: { y?: number; blur?: number; duration?: number } = {}
) {
  const reduced = prefersReducedMotion();
  return {
    duration,
    easing: quintOut,
    css: (t: number, u: number) =>
      reduced
        ? `opacity: ${t}`
        : `opacity: ${t}; transform: translateY(${u * y}px); filter: blur(${u * blur}px)`,
  };
}

export function shake(node: HTMLElement | undefined, amplitude = 6) {
  if (!node || prefersReducedMotion()) return;
  node.animate(
    [
      { transform: "translateX(0)" },
      { transform: `translateX(${-amplitude}px)` },
      { transform: `translateX(${amplitude * 0.8}px)` },
      { transform: `translateX(${-amplitude * 0.4}px)` },
      { transform: "translateX(0)" },
    ],
    { duration: 320, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
  );
}

export function focusOnMount(node: HTMLElement) {
  node.focus({ preventScroll: true });
}
