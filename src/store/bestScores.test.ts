import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { get } from "svelte/store";

function memoryStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    data,
  };
}

const brokenStorage = {
  getItem: () => {
    throw new Error("blocked");
  },
  setItem: () => {
    throw new Error("blocked");
  },
};

// the store reads storage on import, so each test gets a fresh module
async function load(storage: object) {
  vi.stubGlobal("localStorage", storage);
  vi.resetModules();
  return import("./bestScores");
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("bestScores", () => {
  let storage: ReturnType<typeof memoryStorage>;
  beforeEach(() => {
    storage = memoryStorage();
  });

  it("records the first score without calling it a new best", async () => {
    const { bestScores, recordScore } = await load(storage);

    expect(recordScore("Geography", 8, 15)).toBe(false);
    expect(get(bestScores).Geography).toEqual({ score: 8, total: 15 });
    expect(JSON.parse(storage.data.get("quizz:best")!)).toEqual({
      Geography: { score: 8, total: 15 },
    });
  });

  it("keeps the higher score and reports a beaten best", async () => {
    const { bestScores, recordScore } = await load(storage);
    recordScore("Geography", 8, 15);

    expect(recordScore("Geography", 6, 15)).toBe(false);
    expect(get(bestScores).Geography).toEqual({ score: 8, total: 15 });

    expect(recordScore("Geography", 12, 15)).toBe(true);
    expect(get(bestScores).Geography).toEqual({ score: 12, total: 15 });
  });

  it("keeps the smaller total when scores tie", async () => {
    const { bestScores, recordScore } = await load(storage);
    recordScore("History", 10, 15);

    expect(recordScore("History", 10, 15)).toBe(false);
    expect(recordScore("History", 10, 12)).toBe(true);
    expect(get(bestScores).History).toEqual({ score: 10, total: 12 });
    expect(recordScore("History", 10, 14)).toBe(false);
  });

  it("keeps categories separate", async () => {
    const { bestScores, recordScore } = await load(storage);
    recordScore("Geography", 8, 15);
    recordScore("All", 20, 25);

    expect(get(bestScores)).toEqual({
      Geography: { score: 8, total: 15 },
      All: { score: 20, total: 25 },
    });
  });

  it("ignores a round with no questions", async () => {
    const { bestScores, recordScore } = await load(storage);
    expect(recordScore("IT", 0, 0)).toBe(false);
    expect(get(bestScores)).toEqual({});
  });

  it("loads saved bests after a reload", async () => {
    const first = await load(storage);
    first.recordScore("Science", 11, 15);

    const second = await load(storage);
    expect(get(second.bestScores).Science).toEqual({ score: 11, total: 15 });
  });

  it("drops invalid saved data", async () => {
    storage = memoryStorage({
      "quizz:best": JSON.stringify({
        Science: { score: 11, total: 15 },
        History: { score: "lots" },
        Sports: null,
      }),
    });
    const { bestScores } = await load(storage);
    expect(get(bestScores)).toEqual({ Science: { score: 11, total: 15 } });
  });

  it("treats unreadable saved data as empty", async () => {
    const { bestScores } = await load(memoryStorage({ "quizz:best": "{not json" }));
    expect(get(bestScores)).toEqual({});
  });

  it("still works in memory when storage is blocked", async () => {
    const { bestScores, recordScore } = await load(brokenStorage);

    expect(get(bestScores)).toEqual({});
    expect(recordScore("Geography", 8, 15)).toBe(false);
    expect(recordScore("Geography", 9, 15)).toBe(true);
    expect(get(bestScores).Geography).toEqual({ score: 9, total: 15 });
  });

  it("still works when storage does not exist", async () => {
    const { recordScore } = await load(undefined as unknown as object);
    expect(recordScore("Geography", 8, 15)).toBe(false);
  });
});
