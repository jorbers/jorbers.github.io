const body = document.body;
const toggleButtons = document.querySelectorAll(".sidebar-toggle");
const lineRail = document.querySelector(".line-rail");
const contentArea = document.querySelector(".content-area");
const savedSidebarState = window.localStorage.getItem("navigator");

if (savedSidebarState === "closed" || window.matchMedia("(max-width: 779px)").matches) {
  body.classList.add("navigator-closed");
}

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    body.classList.toggle("navigator-closed");
    window.localStorage.setItem(
      "navigator",
      body.classList.contains("navigator-closed") ? "closed" : "open"
    );
  });
});

function updateLineRail() {
  if (!lineRail || !contentArea) return;

  const documentStyles = window.getComputedStyle(document.querySelector(".document"));
  const lineHeight = Number.parseFloat(documentStyles.lineHeight) || 24;
  const lines = Math.max(80, Math.ceil(contentArea.scrollHeight / lineHeight) + 8);

  lineRail.textContent = Array.from({ length: lines }, (_, index) => index + 1).join("\n");
  lineRail.style.height = `${contentArea.scrollHeight + lineHeight * 8}px`;
}

window.addEventListener("load", updateLineRail);
window.addEventListener("resize", updateLineRail);
updateLineRail();
