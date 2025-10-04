// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);

//console.log("hooray")

document.addEventListener('DOMContentLoaded', () => {

    light_mode = document.getElementById("light-mode");
    dark_mode = document.getElementById("dark-mode");
    system_mode = document.getElementById("system-mode");

    light_mode.addEventListener('click', function() {
        localStorage.theme = "light";
        location.reload();
    });

    dark_mode.addEventListener('click', function() {
        localStorage.theme = "dark";
        location.reload();
    });


    system_mode.addEventListener('click', function() {
        localStorage.removeItem("theme");
        location.reload();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const headings = document.querySelectorAll("article h2, article h3");
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
//            console.log(`#${id}`)
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

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById('menuButton');
  const menuDropdown = document.getElementById('menuDropdown');

  menuButton.addEventListener('click', () => {
    menuDropdown.classList.toggle('hidden');
  });

  // Optional: close menu if clicking outside
  document.addEventListener('click', (event) => {
    if (!menuButton.contains(event.target) && !menuDropdown.contains(event.target)) {
      menuDropdown.classList.add('hidden');
    }
  });
});
//localStorage.removeItem("theme");
