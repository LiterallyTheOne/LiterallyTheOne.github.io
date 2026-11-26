document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy-button]");

    if (!button) return;

    const code = button.parentElement.querySelector("pre code");

    if (!code) return;

    try {
        await navigator.clipboard.writeText(code.textContent);

        button.textContent = "Copied!";

        setTimeout(() => {
            button.textContent = "Copy";
        }, 2000);
    } catch (error) {
        console.error("Failed to copy code:", error);
        button.textContent = "Failed!";
    }
});
