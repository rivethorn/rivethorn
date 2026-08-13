(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  var fav = document.querySelector("link#favicon");
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  function systemDark() {
    return mq.matches;
  }

  function currentDark() {
    var t = root.getAttribute("data-theme");
    if (t === "light") return false;
    if (t === "dark") return true;
    return systemDark();
  }

  function faviconFor(dark) {
    return (
      (window.SITE_ROOT || "") +
      (dark ? "img/favicon-dark.ico" : "img/favicon-light.ico")
    );
  }

  function render() {
    var dark = currentDark();
    if (btn) {
      btn.innerHTML = dark ? "&#9728;" : "&#9790;";
      var label = dark ? "Switch to light mode" : "Switch to dark mode";
      btn.setAttribute("aria-label", label);
      btn.title = label;
    }
    if (fav) fav.href = faviconFor(dark);
  }

  function setTheme(dark) {
    root.setAttribute("data-theme", dark ? "dark" : "light");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {}
    render();
  }

  if (btn) {
    btn.addEventListener("click", function () {
      setTheme(!currentDark());
    });
  }

  var onSystemChange = function () {
    if (!root.getAttribute("data-theme")) render();
  };
  if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
  else if (mq.addListener) mq.addListener(onSystemChange);

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  render();
})();
