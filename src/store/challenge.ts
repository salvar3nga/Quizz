import { writable } from "svelte/store";
import { parseChallenge, type Challenge } from "@/utils/shareResult";

export type ActiveChallenge = Challenge & { accepted: boolean };

function fromLocation(): ActiveChallenge | null {
  if (typeof location === "undefined") return null;
  const parsed = parseChallenge(location.search);
  if (!parsed) return null;

  // drop the query so a reload or bookmark doesn't replay an old challenge
  history.replaceState(null, "", location.pathname + location.hash);
  return { ...parsed, accepted: false };
}

export const challenge = writable<ActiveChallenge | null>(fromLocation());

export function acceptChallenge() {
  challenge.update((c) => (c ? { ...c, accepted: true } : c));
}

export function dismissChallenge() {
  challenge.set(null);
}
