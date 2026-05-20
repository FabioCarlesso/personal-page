/* ============================================================
   (fc) site behaviours
   - mobile nav toggle
   - hero terminal typing animation
   - /work filter bar
   - contact + subscribe form handling (client-side only)
   All guarded by element presence so one file serves every page.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* —— Mobile nav toggle ————————————————————————————— */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* —— Hero terminal typing animation ———————————————— */
  var TERMINAL_LINES = [
    { cmd: "whoami",           out: ["fabio.nami.carlesso"] },
    { cmd: "cat role.txt",     out: ["backend software engineer"] },
    { cmd: "cat stack.txt",    out: ["java · spring-boot · aws", "postgres · docker · python"] },
    { cmd: "cat location.txt", out: ["foz do iguaçu, brazil · GMT-3"] },
    { cmd: "uptime",           out: ["15y 4mo · still going"] },
    { cmd: "echo $ANSWER",     out: ["42"], amber: true }
  ];

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function initTerminal() {
    var body = document.querySelector("[data-terminal-body]");
    if (!body) return;

    // Reduced motion / no-JS friendliness: render all lines at once.
    if (reduceMotion) {
      TERMINAL_LINES.forEach(function (l) { renderCompleted(body, l); });
      body.appendChild(promptCursorLine());
      return;
    }

    var step = 0;
    function nextLine() {
      if (step >= TERMINAL_LINES.length) {
        body.appendChild(promptCursorLine());
        return;
      }
      var line = TERMINAL_LINES[step];
      var lineEl = el("div", "term-line");
      lineEl.appendChild(el("span", "prompt", "$"));
      var cmdEl = el("span", "cmd", "");
      lineEl.appendChild(cmdEl);
      var cursor = el("span", "cursor");
      lineEl.appendChild(cursor);
      body.appendChild(lineEl);

      var i = 0;
      var typer = setInterval(function () {
        i++;
        cmdEl.textContent = line.cmd.slice(0, i);
        if (i >= line.cmd.length) {
          clearInterval(typer);
          setTimeout(function () {
            lineEl.removeChild(cursor);
            line.out.forEach(function (o) {
              body.appendChild(el("div", "term-out" + (line.amber ? " amber" : ""), o));
            });
            step++;
            nextLine();
          }, 900);
        }
      }, 45);
    }
    nextLine();
  }

  function renderCompleted(body, line) {
    var lineEl = el("div", "term-line");
    lineEl.appendChild(el("span", "prompt", "$"));
    lineEl.appendChild(el("span", "cmd", line.cmd));
    body.appendChild(lineEl);
    line.out.forEach(function (o) {
      body.appendChild(el("div", "term-out" + (line.amber ? " amber" : ""), o));
    });
  }

  function promptCursorLine() {
    var lineEl = el("div", "term-line");
    lineEl.appendChild(el("span", "prompt", "$"));
    lineEl.appendChild(el("span", "cursor"));
    return lineEl;
  }

  /* —— /work filter bar ——————————————————————————————— */
  function initFilters() {
    var bar = document.querySelector(".work-filters");
    var grid = document.querySelector(".work-grid");
    if (!bar || !grid) return;
    var empty = document.querySelector(".work-grid ~ .empty, .empty");
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".proj"));

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter");
      if (!btn) return;
      var filter = btn.getAttribute("data-filter");
      bar.querySelectorAll(".filter").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      var shown = 0;
      cards.forEach(function (card) {
        var match = filter === "all" ||
          card.getAttribute("data-stack") === filter ||
          card.getAttribute("data-status") === filter;
        card.classList.toggle("is-hidden", !match);
        if (match) shown++;
      });
      if (empty) empty.classList.toggle("show", shown === 0);
    });
  }

  /* —— Contact form (client-side stub) ———————————————— */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    var success = document.getElementById("contact-success");
    if (!form || !success) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // TODO(deploy): wire submissions to a real endpoint.
      // No backend exists yet — POST the FormData below to e.g. a
      // Formspree form ("https://formspree.io/f/<id>") or a serverless
      // function, then show the success state on a 2xx response.
      var name = (form.querySelector("[name=name]") || {}).value || "friend";
      var echo = success.querySelector("[data-echo-name]");
      if (echo) echo.textContent = name;
      form.hidden = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    });
  }

  /* —— Subscribe form (writing) ——————————————————————— */
  function initSubscribe() {
    var form = document.getElementById("subscribe-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // TODO(deploy): wire to a newsletter provider (Buttondown, etc).
      var input = form.querySelector("input");
      form.innerHTML =
        '<span class="mono green">// subscribed — confirm via the email I just sent.</span>';
      if (input && input.value) { /* value captured before reset */ }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initTerminal();
    initFilters();
    initContactForm();
    initSubscribe();
  });
})();
