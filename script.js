(function () {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  const navLabel = document.querySelector("[data-nav-label]");
  const years = document.querySelectorAll("[data-year]");

  years.forEach(function (year) {
    year.textContent = String(new Date().getFullYear());
  });

  if (!toggle || !nav) {
    return;
  }

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));

    if (navLabel) {
      navLabel.textContent = open ? "Close" : "Menu";
    }
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (
      toggle.getAttribute("aria-expanded") === "true" &&
      !nav.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      setMenu(false);
    }
  });

  window.matchMedia("(min-width: 981px)").addEventListener("change", function (event) {
    if (event.matches) {
      setMenu(false);
    }
  });
})();
