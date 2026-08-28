(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const wantsLight = stored === "light";
  root.classList.toggle("dark", !wantsLight);

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const isDark = root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  document.querySelectorAll("#locale-picker a[data-locale]").forEach((link) => {
    link.addEventListener("click", () => {
      localStorage.setItem("locale", link.dataset.locale);
    });
  });

  const modal = document.getElementById("search-modal");
  const input = document.getElementById("search-input");
  const resultsEl = document.getElementById("search-results");
  let pagefind = null;

  async function openSearch() {
    if (!modal || modal.open) return;
    modal.showModal();
    input?.focus();
    if (!pagefind) {
      try {
        pagefind = await import("/pagefind/pagefind.js");
        pagefind.init();
      } catch {
        if (resultsEl) {
          resultsEl.innerHTML =
            `<p class="search-msg">${resultsEl.dataset.msgNobuild || "Search index not built yet."}</p>`;
        }
      }
    }
  }

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      modal?.open ? modal.close() : openSearch();
    }
  });
  document.getElementById("search-open")?.addEventListener("click", openSearch);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });

  input?.addEventListener("input", async () => {
    if (!pagefind || !resultsEl) return;
    const query = input.value.trim();
    if (!query) {
      resultsEl.innerHTML = "";
      return;
    }
    const search = await pagefind.debouncedSearch(query);
    if (!search) return;
    const items = await Promise.all(search.results.slice(0, 8).map((r) => r.data()));
    resultsEl.innerHTML = items.length
      ? items
          .map(
            (item) => `
        <a href="${item.url}" class="search-hit">
          <span class="t">${item.meta.title ?? item.url}</span>
          ${item.meta.kind ? `<span class="k">${item.meta.kind}</span>` : ""}
          <p>${item.excerpt}</p>
        </a>`
          )
          .join("")
      : `<p class="search-msg">${resultsEl.dataset.msgEmpty || "No matches."}</p>`;
  });
})();
