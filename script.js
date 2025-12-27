const scrollButtons = document.querySelectorAll("[data-scroll]");

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selector = button.getAttribute("data-scroll");
    const target = document.querySelector(selector);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
