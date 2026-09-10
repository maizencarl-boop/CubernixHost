// CubernixHosting Appearance Controls

(function () {
    "use strict";

    const STORAGE_KEY = "cubernix-appearance";

    function applyAppearance(appearance) {

        if (appearance === "light") {

            document.documentElement.dataset.cubernixAppearance =
                "light";

            return;
        }

        document.documentElement.dataset.cubernixAppearance =
            "dark";
    }


    function loadAppearance() {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (saved === "light") {

            applyAppearance("light");

        } else {

            applyAppearance("dark");

        }
    }


    function showAppearancePanel() {

        if (
            document.getElementById(
                "cubernix-appearance-panel"
            )
        ) {
            return;
        }


        const panel =
            document.createElement("div");

        panel.id =
            "cubernix-appearance-panel";

        panel.className =
            "cubernix-settings-modal";


        panel.innerHTML = `

            <div class="cubernix-settings-modal-content">

                <div class="cubernix-settings-modal-header">

                    <div>

                        <h3>
                            Appearance
                        </h3>

                        <p>
                            Choose how CubernixHosting looks.
                        </p>

                    </div>

                    <button
                        type="button"
                        class="cubernix-settings-modal-close"
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                <div class="cubernix-appearance-options">

                    <button
                        type="button"
                        class="cubernix-appearance-option"
                        data-appearance="dark"
                    >

                        <span>
                            🌙
                        </span>

                        <span>

                            <strong>
                                Dark
                            </strong>

                            <small>
                                Dark CubernixHosting interface
                            </small>

                        </span>

                    </button>


                    <button
                        type="button"
                        class="cubernix-appearance-option"
                        data-appearance="light"
                    >

                        <span>
                            ☀️
                        </span>

                        <span>

                            <strong>
                                Light
                            </strong>

                            <small>
                                Light CubernixHosting interface
                            </small>

                        </span>

                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(panel);


        const closeButton =
            panel.querySelector(
                ".cubernix-settings-modal-close"
            );


        function closePanel() {

            panel.remove();

        }


        closeButton.addEventListener(
            "click",
            closePanel
        );


        panel.addEventListener(
            "click",
            function (event) {

                if (event.target === panel) {

                    closePanel();

                }

            }
        );


        const options =
            panel.querySelectorAll(
                ".cubernix-appearance-option"
            );


        options.forEach(
            function (option) {

                option.addEventListener(
                    "click",
                    function () {

                        const appearance =
                            option.dataset.appearance;

                        if (!appearance) {
                            return;
                        }


                        localStorage.setItem(
                            STORAGE_KEY,
                            appearance
                        );


                        applyAppearance(
                            appearance
                        );


                        closePanel();

                    }
                );

            }
        );

    }


    function initSettingsControls() {

        loadAppearance();


        document.addEventListener(
            "cubernix:settings",
            function (event) {

                const setting =
                    event.detail &&
                    event.detail.setting;


                if (!setting) {
                    return;
                }


                if (
                    setting ===
                    "appearance"
                ) {

                    showAppearancePanel();

                }


                if (
                    setting ===
                    "account"
                ) {

                    alert(
                        "Account settings will be connected to Pterodactyl later."
                    );

                }


                if (
                    setting ===
                    "panel"
                ) {

                    alert(
                        "Panel settings are coming next."
                    );

                }

            }
        );

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initSettingsControls
        );

    } else {

        initSettingsControls();

    }

})();
