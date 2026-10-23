import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { normalize } from "@/utils/answers";
import { questions } from "./questions";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "../../public");

function publicFileExists(url: string): boolean {
  const parts = url.replace(/^\.?\//, "").split("/");
  let dir = publicDir;
  for (const part of parts) {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return false;
    }
    if (!entries.includes(part)) return false;
    dir = join(dir, part);
  }
  return true;
}

function duplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const value of values) {
    const key = normalize(value);
    if (seen.has(key)) dupes.add(value);
    seen.add(key);
  }
  return [...dupes];
}

function asList(answer: string | string[]): string[] {
  return Array.isArray(answer) ? answer : [answer];
}

const label = (i: number) =>
  `#${i} ${questions[i].category}: ${questions[i].question}`;

describe("question data", () => {
  it("has no duplicate accepted answers", () => {
    const problems = questions.flatMap((q, i) =>
      q.type === "mcq"
        ? []
        : duplicates(asList(q.answer)).map((d) => `${label(i)} → "${d}"`),
    );
    expect(problems).toEqual([]);
  });

  it("has no duplicate options", () => {
    const problems = questions.flatMap((q, i) =>
      duplicates(q.options ?? []).map((d) => `${label(i)} → "${d}"`),
    );
    expect(problems).toEqual([]);
  });

  it("has every mcq answerText among its options", () => {
    const problems = questions.flatMap((q, i) =>
      q.type === "mcq" && !q.options?.includes(q.answerText ?? "")
        ? [`${label(i)} → "${q.answerText}"`]
        : [],
    );
    expect(problems).toEqual([]);
  });

  it("has an existing image for every image question", () => {
    const problems = questions.flatMap((q, i) => {
      if (q.type !== "image") return [];
      if (!q.imageUrl) return [`${label(i)} → no imageUrl`];
      return publicFileExists(q.imageUrl)
        ? []
        : [`${label(i)} → ${q.imageUrl}`];
    });
    expect(problems).toEqual([]);
  });

  it("has no empty answers or options", () => {
    const problems = questions.flatMap((q, i) =>
      [
        ...asList(q.answer),
        ...(q.options ?? []),
        ...(q.type === "mcq" ? [q.answerText ?? ""] : []),
      ]
        .filter((value) => value.trim() === "")
        .map(() => label(i)),
    );
    expect(problems).toEqual([]);
  });
});
