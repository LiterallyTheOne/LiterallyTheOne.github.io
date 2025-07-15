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

document.addEventListener("DOMContentLoaded", () => {
    const headings = document.querySelectorAll("h2, h3");
    const tocLinks = document.querySelectorAll("#toc a");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(link => {
            link.classList.remove("toc-active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("toc-active");
            }
            console.log(`#${id}`)
          });
        }
      });
    }, {
      rootMargin: "0px 0px -70% 0px", // triggers when heading is near top
      threshold: 0
    });

    headings.forEach(heading => {
      if (heading.id) observer.observe(heading);
    });
  });

//localStorage.removeItem("theme");
