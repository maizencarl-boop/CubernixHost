// CubernixHosting Theme Loader

(function () {
    "use strict";

    const themeRoot = "theme/";

    const stylesheets = [
        "cubernix.css",
        "components/sidebar.css",
        "components/mobile-menu.css"
    ];

    const scripts = [
        "components/mobile-menu.js",
        "cubernix.js"
    ];

    function loadStylesheet(path) {
        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.href = themeRoot + path;

        document.head.appendChild(link);
    }

    function loadScript(path) {
        const script = document.createElement("script");

        script.src = themeRoot + path;
        script.defer = true;

        document.body.appendChild(script);
    }

    function loadTheme() {
        stylesheets.forEach(loadStylesheet);
        scripts.forEach(loadScript);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", loadTheme);
    } else {
        loadTheme();
    }
})();
