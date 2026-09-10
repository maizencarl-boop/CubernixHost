// CubernixHosting Appearance Controls

(function () {
    "use strict";

    const APPEARANCE_KEY = "cubernix-appearance";
    const COLOR_KEY = "cubernix-accent-color";

    const DEFAULT_COLOR = "#5865f2";

    function applyAppearance(appearance) {

        if (appearance === "light") {

            document.documentElement.dataset.cubernixAppearance =
                "light";

        } else {

            document.documentElement.dataset.cubernixAppearance =
                "dark";

        }
    }


    function applyAccentColor(color) {

        if (!color) {
            color = DEFAULT_COLOR;
        }

        document.documentElement.style.setProperty(
            "--cubernix-primary",
            color
        );

        const hoverColor =
            adjustColor(color, -15);

        document.documentElement.style.setProperty(
            "--cubernix-primary-hover",
            hoverColor
        );
    }


    function adjustColor(hex, amount) {

        let color = hex.replace("#", "");

        if (color.length !== 6) {
            return DEFAULT_COLOR;
        }

        let r = parseInt(
            color.substring(0, 2),
            16
        );

        let g = parseInt(
            color.substring(2, 4),
            16
        );

        let b = parseInt(
            color.substring(4, 6),
            16
        );

        r = Math.max(
            0,
            Math.min(255, r + amount)
        );

        g = Math.max(
            0,
            Math.min(255, g + amount)
        );

        b = Math.max(
            0,
            Math.min(255, b + amount)
        );

        return "#" +
            r.toString(16).padStart(2, "0") +
            g.toString(16).padStart(2, "0") +
            b.toString(16).padStart(2, "0");
    }


    function loadPreferences() {

        const savedAppearance =
            localStorage.getItem(
                APPEARANCE_KEY
            );

        const savedColor =
            localStorage.getItem(
                COLOR_KEY
            );


        applyAppearance(
            savedAppearance === "light"
                ? "light"
                : "dark"
        );


        applyAccentColor(
            savedColor || DEFAULT_COLOR
        );
    }


    function showAppearancePanel() {

        if (
            document.getElementById(
                "cubernix-appearance-panel"
            )
        ) {
            return;
        }


        const currentAppearance =
            document.documentElement
                .dataset
                .cubernixAppearance ||
            "dark";


        const currentColor =
            localStorage.getItem(
                COLOR_KEY
            ) ||
            DEFAULT_COLOR;


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
                            Customize your CubernixHosting interface.
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


                <div class="cubernix-color-section">

                    <h4>
                        Accent Color
                    </h4>

                    <p>
                        Choose the main color used throughout the panel.
                    </p>


                    <div class="cubernix-color-picker-row">

                        <input
                            type="color"
                            id="cubernix-accent-color"
                            value="${currentColor}"
                            aria-label="Accent color"
                        >

                        <span
                            id="cubernix-accent-color-value"
                        >
                            ${currentColor}
                        </span>

                    </div>


                    <div class="cubernix-color-presets">

                        <button
                            type="button"
                            class="cubernix-color-preset"
                            data-color="#5865f2"
                            style="--preset-color: #5865f2"
                            aria-label="Cubernix Blue"
                        ></button>

                        <button
                            type="button"
                            class="cubernix-color-preset"
                            data-color="#8b5cf6"
                            style="--preset-color: #8b5cf6"
                            aria-label="Purple"
                        ></button>

                        <button
                            type="button"
                            class="cubernix-color-preset"
                            data-color="#22c55e"
                            style="--preset-color: #22c55e"
                            aria-label="Green"
                        ></button>

                        <button
                            type="button"
                            class="cubernix-color-preset"
                            data-color="#f59e0b"
                            style="--preset-color: #f59e0b"
                            aria-label="Orange"
                        ></button>

                        <button
                            type="button"
                            class="cubernix-color-preset"
                            data-color="#ef4444"
                            style="--preset-color: #ef4444"
                            aria-label="Red"
                        ></button>

                        <button
                            type="button"
                            class="cubernix-color-preset"
                            data-color="#06b6d4"
                            style="--preset-color: #06b6d4"
                            aria-label="Cyan"
                        ></button>

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(panel);


        const closeButton =
            panel.querySelector(
                ".cubernix-settings-modal-close"
            );


        const colorInput =
            panel.querySelector(
                "#cubernix-accent-color"
            );


        const colorValue =
            panel.querySelector(
                "#cubernix-accent-color-value"
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


        panel.querySelectorAll(
            ".cubernix-appearance-option"
        ).forEach(
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
                            APPEARANCE_KEY,
                            appearance
                        );


                        applyAppearance(
                            appearance
                        );

                    }
                );

            }
        );


        colorInput.addEventListener(
            "input",
            function () {

                const color =
                    colorInput.value;


                colorValue.textContent =
                    color;


                localStorage.setItem(
                    COLOR_KEY,
                    color
                );


                applyAccentColor(
                    color
                );

            }
        );


        panel.querySelectorAll(
            ".cubernix-color-preset"
        ).forEach(
            function (preset) {

                preset.addEventListener(
                    "click",
                    function () {

                        const color =
                            preset.dataset.color;

                        if (!color) {
                            return;
                        }


                        colorInput.value =
                            color;


                        colorValue.textContent =
                            color;


                        localStorage.setItem(
                            COLOR_KEY,
                            color
                        );


                        applyAccentColor(
                            color
                        );

                    }
                );

            }
        );

    }


    function initSettingsControls() {

        loadPreferences();


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
