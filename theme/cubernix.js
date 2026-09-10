// CubernixHosting Pterodactyl Theme

(function () {
    "use strict";

    console.log("CubernixHosting Theme Loaded");

    function initCubernixTheme() {
        document.documentElement.classList.add("cubernix-theme");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCubernixTheme);
    } else {
        initCubernixTheme();
    }
})();
