<script lang="ts" context="module">
  const CIRCLE = "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z";

  const ICONS = {
    bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z",
    globe: `${CIRCLE}M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z`,
    columns: "M12 3L4 7.5V10h16V7.5zM6 10v8M10 10v8M14 10v8M18 10v8M3 21h18M4 18h16",
    flask: "M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3M7.5 15h9",
    ball: `${CIRCLE}M12 3v18M3 12h18M5.6 5.6c2.4 2.4 2.4 10.4 0 12.8M18.4 5.6c-2.4 2.4-2.4 10.4 0 12.8`,
    terminal: "M5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11A2.5 2.5 0 0 1 5.5 4zM7 9.5l3 2.5-3 2.5M13 15h4",
    bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
    arrowRight: "M5 12h14M13 6l6 6-6 6",
    check: "M5 12.5l4.5 4.5L19 7",
    close: "M6 6l12 12M18 6L6 18",
    clock: `${CIRCLE}M12 7v5l3 2`,
    chevronDown: "M6 9l6 6 6-6",
    replay: "M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5",
  };

  export type IconName = keyof typeof ICONS;
</script>

<script lang="ts">
  export let name: IconName;
  export let size = 20;
  export let strokeWidth = 1.75;
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <path d={ICONS[name]} />
</svg>

<style>
  svg {
    flex: none;
  }
</style>
