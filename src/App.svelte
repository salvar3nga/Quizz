<script lang="ts">
  import CategorySelector from "./components/CategorySelector.svelte";
  import Question from "./components/Question.svelte";
  import Report from "./components/Report.svelte";
  import QuizHeader from "./components/QuizHeader.svelte";
  import { quizFinished, currentCategory } from "./store/quizStore";
  import { rise } from "./utils/motion";

  $: screen = !$currentCategory ? "home" : !$quizFinished ? "quiz" : "report";
</script>

<div class="shell">
  {#if screen === "quiz"}
    <QuizHeader />
  {:else}
    <header class="brand">
      <span class="logo" aria-hidden="true">?</span>
      <span class="display brand-name">Quizz Mei</span>
    </header>
  {/if}

  {#key screen}
    <main class="main" in:rise={{ y: 12, duration: 300 }}>
      {#if screen === "home"}
        <CategorySelector />
      {:else if screen === "quiz"}
        <Question />
      {:else}
        <Report />
      {/if}
    </main>
  {/key}

  <footer>
    <a href="https://github.com/salvar3nga/Quizz/issues" target="_blank"
      >Suggestion or bug?</a
    >
    <span aria-hidden="true">·</span>
    <span>
      {new Date().getFullYear()} Feito com
      <svg class="heart" width="13" height="13" viewBox="0 0 24 24" role="img" aria-label="amor">
        <path d="M12 21s-8-4.9-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.1-8 11-8 11z" />
      </svg>
    </span>
  </footer>
</div>

<style>
  .shell {
    flex: 1;
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
  }

  .logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 11px;
    background: var(--accent);
    color: var(--on-accent);
    font-family: "Bricolage Grotesque", system-ui, sans-serif;
    font-weight: 800;
    font-size: 22px;
    line-height: 1;
  }

  .brand-name {
    font-size: 22px;
    font-weight: 800;
  }

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 12px 0 4px;
    font-size: 13px;
    color: var(--muted);
  }

  .heart {
    fill: var(--accent);
    vertical-align: -2px;
  }
</style>
