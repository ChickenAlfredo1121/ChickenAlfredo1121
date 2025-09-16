// java that makes the button change font
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("font-toggle");
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem("font-theme");
  if (savedTheme) body.className = savedTheme;

  button.addEventListener("click", () => {
    body.classList.toggle("font-theme-one");
    body.classList.toggle("font-theme-two");

    localStorage.setItem("font-theme", body.className);
    console.log("Font toggled:", body.className);
  });
});
