(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  if (stored === "light") root.classList.remove("dark");
  else if (stored === "dark") root.classList.add("dark");
  else if (!root.classList.contains("dark")) root.classList.add("dark");

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const isDark = root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
})();
