<script lang="ts">
  import { onMount } from "svelte";
  import { prefersReducedMotion } from "../utils/motion";

  export let anchor: HTMLElement | undefined;
  export let delay = 0;

  const PIECES = 40;
  const DURATION_IN_MS = 1200;
  const STEPS = 12;
  const GRAVITY = 500; // px/s²
  const DRAG = 2.2; // how fast the sideways speed dies off, per second
  const COLORS = ["var(--accent)", "var(--good)", "var(--ink)", "#ffc83d"];

  let layer: HTMLDivElement;
  let done = false;

  function flightPath(angle: number, speed: number, spin: number): Keyframe[] {
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    return Array.from({ length: STEPS + 1 }, (_, step) => {
      const p = step / STEPS;
      const t = (p * DURATION_IN_MS) / 1000;
      const x = (vx * (1 - Math.exp(-DRAG * t))) / DRAG;
      const y = (vy * (1 - Math.exp(-DRAG * t))) / DRAG + 0.5 * GRAVITY * t * t;
      return {
        transform: `translate(${x}px, ${y}px) rotate(${spin * p}deg)`,
        opacity: p < 0.7 ? 1 : 1 - (p - 0.7) / 0.3,
      };
    });
  }

  onMount(() => {
    if (prefersReducedMotion() || !anchor) {
      done = true;
      return;
    }

    const rect = anchor.getBoundingClientRect();
    layer.style.left = `${rect.left + rect.width / 2}px`;
    layer.style.top = `${rect.top + rect.height / 2}px`;

    const animations = Array.from(layer.children, (piece) => {
      // mostly upwards, fanned out to both sides
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
      const speed = 500 + Math.random() * 450;
      const spin = (Math.random() - 0.5) * 900;
      return piece.animate(flightPath(angle, speed, spin), {
        duration: DURATION_IN_MS,
        delay: delay + Math.random() * 60,
        easing: "linear",
        fill: "forwards",
      });
    });

    Promise.all(animations.map((a) => a.finished))
      .catch(() => {})
      .finally(() => (done = true));

    return () => animations.forEach((a) => a.cancel());
  });
</script>

{#if !done}
  <div class="confetti" bind:this={layer} aria-hidden="true">
    {#each { length: PIECES } as _, i}
      <span
        class="piece"
        style:background={COLORS[i % COLORS.length]}
        style:width="{6 + (i % 3) * 2}px"
        style:height="{10 - (i % 3) * 2}px"
      ></span>
    {/each}
  </div>
{/if}

<style>
  .confetti {
    position: fixed;
    z-index: 20;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  .piece {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 2px;
    opacity: 0;
    will-change: transform, opacity;
  }
</style>
