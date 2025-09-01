<script lang="ts">
  export let typedAnswer = "";
  export let onCheckAnswer: () => void;
</script>

<div class="form-control">
  <input
    type="value"
    id="answer"
    required
    bind:value={typedAnswer}
    on:keydown={(e) => e.key === "Enter" && onCheckAnswer()}
  />
  <label for="answer">
    <span style="transition-delay:0ms">Y</span>
    <span style="transition-delay:50ms">o</span>
    <span style="transition-delay:100ms">u</span>
    <span style="transition-delay:150ms">r</span>
    <span style="transition-delay:200ms"></span>
    <span style="transition-delay:250ms">A</span>
    <span style="transition-delay:300ms">n</span>
    <span style="transition-delay:350ms">s</span>
    <span style="transition-delay:400ms">w</span>
    <span style="transition-delay:450ms">e</span>
    <span style="transition-delay:500ms">r</span>
  </label>
</div>

<style>
  .form-control {
    position: relative;
    margin: 20px 0 40px;
    width: 260px;
  }

  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px #fff solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 18px;
    color: #fff;
    font-size: 1.5rem;
  }

  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: lightblue;
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    color: #fff;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control input:focus + label span,
  .form-control input:valid + label span {
    color: lightblue;
    transform: translateY(-30px);
  }
</style>
