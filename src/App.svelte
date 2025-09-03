<script lang="ts">
  import CategorySelector from "./components/CategorySelector.svelte";
  import Question from "./components/Question.svelte";
  import Report from "./components/Report.svelte";
  import { quizFinished, currentCategory } from "./store/quizStore";
</script>

<div class="main-content">
  <main class="main">
    {#if !$currentCategory}
      <CategorySelector />
    {:else if !$quizFinished}
      <Question />
    {:else}
      <Report />
    {/if}
  </main>

  <footer>
    <small
      ><a href="https://github.com/salvar3nga/Quizz/issues" target="_blank"
        >A suggestion or bug?</a
      ></small
    >
    |
    <small> {new Date().getFullYear()} Feito com ❤️</small>
  </footer>
</div>

<style>
  .main-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 94vh;
    gap: 1rem;
  }

  .main {
    margin: 0;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    place-items: center;
  }
</style>
