// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);

//console.log("hooray")

document.addEventListener('DOMContentLoaded', () => {

    dark_button = document.getElementById("theme-switcher-dark")
    light_button = document.getElementById("theme-switcher-light")

    dark_button.addEventListener('click', function() {
        localStorage.theme = "dark";
        location.reload();
    });

    light_button.addEventListener('click', function() {
        localStorage.theme = "light";
        location.reload();
    });

});

//localStorage.removeItem("theme");
