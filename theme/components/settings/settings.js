// CubernixHosting Settings

(function () {
    "use strict";

    function initSettings() {

        const buttons = document.querySelectorAll(
            ".cubernix-settings-card-button"
        );

        if (!buttons.length) {
            return;
        }

        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const setting =
                        button.dataset.setting;

                    if (!setting) {
                        return;
                    }

                    console.log(
                        "CubernixHosting setting selected:",
                        setting
                    );

                }
            );

        });
    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initSettings
        );

    } else {

        initSettings();

    }

})();
