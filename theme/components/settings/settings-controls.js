// CubernixHosting Settings Interaction

(function () {
    "use strict";

    function initSettingsControls() {

        document.addEventListener(
            "cubernix:settings",
            function (event) {

                const setting =
                    event.detail &&
                    event.detail.setting;

                if (!setting) {
                    return;
                }

                console.log(
                    "CubernixHosting settings:",
                    setting
                );

                if (setting === "appearance") {

                    alert(
                        "Appearance settings are coming next."
                    );

                }

                if (setting === "account") {

                    alert(
                        "Account settings will be connected to Pterodactyl later."
                    );

                }

                if (setting === "panel") {

                    alert(
                        "Panel settings are coming next."
                    );

                }

            }
        );

    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initSettingsControls
        );

    } else {

        initSettingsControls();

    }

})();
