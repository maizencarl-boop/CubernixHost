// CubernixHosting Background Manager

(function () {
    "use strict";

    const STORAGE_KEY = "cubernix-background";

    function applyBackground(imageData) {
        if (imageData) {
            document.documentElement.style.setProperty(
                "--cubernix-background-image",
                `url("${imageData}")`
            );
        } else {
            document.documentElement.style.setProperty(
                "--cubernix-background-image",
                "none"
            );
        }
    }

    function loadSavedBackground() {
        const savedBackground = localStorage.getItem(STORAGE_KEY);

        if (savedBackground) {
            applyBackground(savedBackground);
        }
    }

    function setupBackgroundControls() {
        const input = document.getElementById(
            "cubernix-background-input"
        );

        const resetButton = document.getElementById(
            "cubernix-background-reset"
        );

        if (!input || !resetButton) {
            return;
        }

        input.addEventListener("change", function () {
            const file = input.files && input.files[0];

            if (!file) {
                return;
            }

            if (!file.type.startsWith("image/")) {
                input.value = "";
                return;
            }

            const reader = new FileReader();

            reader.onload = function (event) {
                const imageData = event.target.result;

                if (!imageData) {
                    return;
                }

                try {
                    localStorage.setItem(
                        STORAGE_KEY,
                        imageData
                    );
                } catch (error) {
                    console.warn(
                        "CubernixHosting: Could not save background.",
                        error
                    );
                }

                applyBackground(imageData);
            };

            reader.readAsDataURL(file);
        });

        resetButton.addEventListener("click", function () {
            localStorage.removeItem(STORAGE_KEY);
            applyBackground(null);
            input.value = "";
        });
    }

    function initBackgroundManager() {
        loadSavedBackground();
        setupBackgroundControls();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initBackgroundManager
        );
    } else {
        initBackgroundManager();
    }
})();
