// CubernixHosting Settings Controls

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

                    if (setting === "background") {

                        const backgroundInput =
                            document.getElementById(
                                "cubernix-background-input"
                            );

                        if (backgroundInput) {
                            backgroundInput.click();
                        }

                        return;
                    }

                    if (setting === "appearance") {

                        document.dispatchEvent(
                            new CustomEvent(
                                "cubernix:settings",
                                {
                                    detail: {
                                        setting: "appearance"
                                    }
                                }
                            )
                        );

                        return;
                    }

                    if (setting === "account") {

                        document.dispatchEvent(
                            new CustomEvent(
                                "cubernix:settings",
                                {
                                    detail: {
                                        setting: "account"
                                    }
                                }
                            )
                        );

                        return;
                    }

                    if (setting === "panel") {

                        document.dispatchEvent(
                            new CustomEvent(
                                "cubernix:settings",
                                {
                                    detail: {
                                        setting: "panel"
                                    }
                                }
                            )
                        );

                        return;
                    }

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
