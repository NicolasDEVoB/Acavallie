const status = document.querySelector(".share-status");
let statusTimer;

function showStatus(message) {
  status.textContent = message;
  status.classList.add("is-visible");
  window.clearTimeout(statusTimer);
  statusTimer = window.setTimeout(() => {
    status.classList.remove("is-visible");
  }, 2600);
}

document.querySelectorAll(".link-card__share").forEach((button) => {
  button.addEventListener("click", async () => {
    const link = button.parentElement.querySelector(".link-card");

    try {
      if (navigator.share) {
        await navigator.share({ title: link.textContent.trim(), url: link.href });
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(link.href);
        showStatus("Link copiado para compartilhar.");
        return;
      }

      showStatus("Seu navegador não permite compartilhar este link.");
    } catch (error) {
      if (!(error instanceof Error && error.name === "AbortError")) {
        showStatus("Não foi possível compartilhar o link.");
      }
    }
  });
});
