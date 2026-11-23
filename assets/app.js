(function () {
  "use strict";

  const grid = document.getElementById("grid");
  const empty = document.getElementById("empty");
  const resultCount = document.getElementById("result-count");
  const statCount = document.getElementById("stat-count");
  const search = document.getElementById("q");
  const chips = Array.from(document.querySelectorAll(".chip"));

  const data = window.RESOURCES || [];
  let activeStage = "all";

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function haystack(item) {
    return (item.name + " " + item.org + " " + item.desc + " " +
      item.tags.join(" ") + " " + item.stage.join(" ")).toLowerCase();
  }

  function cardHtml(item) {
    const badge = item.badge
      ? '<span class="badge' + (item.badge === "总入口" ? " badge--jade" : "") + '">' + escapeHtml(item.badge) + "</span>"
      : "";
    const tags = item.tags.slice(0, 3).map(function (t) {
      return "<li>" + escapeHtml(t) + "</li>";
    }).join("");
    const stages = item.stage.map(function (s) {
      return '<li class="stage-tag">' + escapeHtml(s) + "</li>";
    }).join("");

    return (
      '<article class="card">' +
        '<div class="card-head">' +
          "<h3><a href=\"" + escapeHtml(item.url) + "\" target=\"_blank\" rel=\"noopener\">" + escapeHtml(item.name) + "</a></h3>" +
          badge +
        "</div>" +
        '<p class="org">' + escapeHtml(item.org) + "</p>" +
        '<p class="desc">' + escapeHtml(item.desc) + "</p>" +
        '<ul class="tags">' + stages + tags + "</ul>" +
        '<a class="card-go" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener">打开平台</a>' +
      "</article>"
    );
  }

  function render() {
    const q = (search && search.value ? search.value : "").trim().toLowerCase();
    const list = data.filter(function (item) {
      const stageOk = activeStage === "all" || item.stage.indexOf(activeStage) !== -1;
      const queryOk = !q || haystack(item).indexOf(q) !== -1;
      return stageOk && queryOk;
    });

    grid.innerHTML = list.map(cardHtml).join("");
    resultCount.textContent = String(list.length);
    empty.hidden = list.length > 0;
    grid.hidden = list.length === 0;
  }

  if (statCount) statCount.textContent = String(data.length);

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      activeStage = chip.dataset.filter || "all";
      render();
    });
  });

  if (search) {
    search.addEventListener("input", render);
  }

  document.addEventListener("keydown", function (e) {
    const isTyping = /^(input|textarea|select)$/i.test((e.target && e.target.tagName) || "");
    if (e.key === "/" && !isTyping) {
      e.preventDefault();
      if (search) search.focus();
    }
    if (e.key === "Escape" && document.activeElement === search) {
      search.value = "";
      render();
      search.blur();
    }
  });

  render();
})();
