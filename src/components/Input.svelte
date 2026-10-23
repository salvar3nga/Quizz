<script lang="ts">
  import { focusOnMount, shake } from "../utils/motion";

  export let typedAnswer = "";
  export let onCheckAnswer: () => void;
  export let disabled = false;
  export let status: "correct" | "incorrect" | null = null;

  let field: HTMLDivElement;

  export function nudge(amplitude = 6) {
    shake(field, amplitude);
  }
</script>

<div class="form-control">
  <label for="answer">Your answer</label>
  <div
    bind:this={field}
    class="field"
    class:correct={status === "correct"}
    class:incorrect={status === "incorrect"}
  >
    <input
      id="answer"
      type="text"
      autocomplete="off"
      autocapitalize="off"
      spellcheck="false"
      placeholder="Type it here"
      readonly={disabled}
      bind:value={typedAnswer}
      use:focusOnMount
      on:keydown={(e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        onCheckAnswer();
      }}
    />
    {#if !disabled}
      <button class="btn btn-accent press check" on:click={onCheckAnswer}>
        Check <span class="kbd" aria-hidden="true">↵</span>
      </button>
    {/if}
  </div>
  {#if !disabled}
    <span class="hint">Not case-sensitive. Accents optional.</span>
  {/if}
</div>

<style>
  .form-control {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    font-size: 14px;
    font-weight: 600;
    color: var(--muted);
  }

  .field {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 6px 6px 18px;
    border-radius: 16px;
    border: 1.5px solid var(--line);
    background: var(--card);
    transition:
      border-color 150ms ease,
      box-shadow 150ms ease,
      background-color 150ms ease;
  }

  .field:focus-within {
    border-color: var(--ink);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 30%, transparent);
  }

  .field.correct {
    border-color: var(--good);
    background: var(--good-bg);
    box-shadow: none;
  }

  .field.incorrect {
    border-color: var(--bad);
    background: var(--bad-bg);
    box-shadow: none;
  }

  input {
    flex: 1;
    min-width: 0;
    height: 52px;
    border: 0;
    background: transparent;
    color: var(--ink);
    font: inherit;
    font-size: 20px;
    font-weight: 500;
    outline: none;
  }

  input::placeholder {
    color: var(--muted);
  }

  .check {
    padding: 0 14px 0 18px;
  }

  .hint {
    font-size: 13px;
    color: var(--muted);
  }
</style>
