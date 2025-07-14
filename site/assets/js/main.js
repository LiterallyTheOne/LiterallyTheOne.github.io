// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);

//console.log("hooray")

document.addEventListener('DOMContentLoaded', () => {

    theme_switcher = document.getElementById("theme-switcher")

    theme_switcher.addEventListener('click', function() {
        if(localStorage.theme == "dark"){
            localStorage.theme = "light";
        }else{
            localStorage.theme = "dark";
        }
        location.reload();
    });

});

//localStorage.removeItem("theme");
