<script lang="ts">
  export let onClick: () => void;
</script>

<div class="button-container">
  <div on:click={onClick} class="hover bt-1"></div>
  <div on:click={onClick} class="hover bt-2"></div>
  <div on:click={onClick} class="hover bt-3"></div>
  <div on:click={onClick} class="hover bt-4"></div>
  <div on:click={onClick} class="hover bt-5"></div>
  <div on:click={onClick} class="hover bt-6"></div>
  <button on:click={onClick} aria-label="Submit"></button>
</div>

<style>
  .button-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "bt-1 bt-2 bt-3"
      "bt-4 bt-5 bt-6";
    position: relative;
    perspective: 800;
    padding: 0;
    width: 135px;
    height: 47px;
    transition: all 0.3s ease-in-out;
  }

  .button-container:active {
    transform: scale(0.95);
  }

  .hover {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 200;
  }

  .bt-1 {
    grid-area: bt-1;
  }

  .bt-2 {
    grid-area: bt-2;
  }

  .bt-3 {
    grid-area: bt-3;
  }

  .bt-4 {
    grid-area: bt-4;
  }

  .bt-5 {
    grid-area: bt-5;
  }

  .bt-6 {
    grid-area: bt-6;
  }

  .bt-1:hover ~ button {
    transform: rotateX(15deg) rotateY(-15deg) rotateZ(0deg);
    box-shadow: -2px -2px #18181888;
  }

  .bt-1:hover ~ button::after {
    animation: shake 0.5s ease-in-out 0.3s;
    text-shadow: -2px -2px #18181888;
  }

  .bt-3:hover ~ button {
    transform: rotateX(15deg) rotateY(15deg) rotateZ(0deg);
    box-shadow: 2px -2px #18181888;
  }

  .bt-3:hover ~ button::after {
    animation: shake 0.5s ease-in-out 0.3s;
    text-shadow: 2px -2px #18181888;
  }

  .bt-4:hover ~ button {
    transform: rotateX(-15deg) rotateY(-15deg) rotateZ(0deg);
    box-shadow: -2px 2px #18181888;
  }

  .bt-4:hover ~ button::after {
    animation: shake 0.5s ease-in-out 0.3s;
    text-shadow: -2px 2px #18181888;
  }

  .bt-6:hover ~ button {
    transform: rotateX(-15deg) rotateY(15deg) rotateZ(0deg);
    box-shadow: 2px 2px #18181888;
  }

  .bt-6:hover ~ button::after {
    animation: shake 0.5s ease-in-out 0.3s;
    text-shadow: 2px 2px #18181888;
  }

  .hover:hover ~ button::before {
    background: transparent;
  }

  .hover:hover ~ button::after {
    content: "yeay";
    top: -150%;
    transform: translate(-50%, 0);
    font-size: 30px;
    color: rgba(0, 187, 255, 0.7);
  }

  button {
    position: absolute;
    padding: 0;
    width: 135px;
    height: 47px;
    background: transparent;
    font-size: 17px;
    font-weight: 900;
    border: 3px solid rgba(0, 187, 255, 0.462);
    border-radius: 12px;
    transition: all 0.3s ease-in-out;
  }

  button::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 135px;
    height: 47px;
    background-color: rgba(0, 187, 255, 0.462);
    border-radius: 12px;
    transition: all 0.3s ease-in-out;
    z-index: -1;
  }

  button::after {
    content: "Submit";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 135px;
    height: 47px;
    background-color: transparent;
    font-size: 17px;
    font-weight: 900;
    line-height: 47px;
    color: #ffffff;
    border: none;
    border-radius: 12px;
    transition: all 0.3s ease-in-out;
    z-index: 2;
  }

  @keyframes shake {
    0% {
      left: 45%;
    }

    25% {
      left: 54%;
    }

    50% {
      left: 48%;
    }

    75% {
      left: 52%;
    }

    100% {
      left: 50%;
    }
  }
</style>
