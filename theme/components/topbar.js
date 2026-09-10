// CubernixHosting Topbar

(function () {
    "use strict";


    const STORAGE_KEY =
        "cubernix-notifications";


    const DEFAULT_NOTIFICATIONS = [
        {
            id: "welcome",
            title: "Welcome to CubernixHosting",
            message: "Your hosting panel is ready.",
            read: false
        },
        {
            id: "theme",
            title: "CubernixPtero",
            message: "Custom panel features are being developed.",
            read: false
        }
    ];


    function loadNotifications() {

        try {

            const saved =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (saved) {

                const parsed =
                    JSON.parse(saved);


                if (Array.isArray(parsed)) {
                    return parsed;
                }

            }

        } catch (error) {

            console.warn(
                "CubernixHosting: Could not load notifications.",
                error
            );

        }


        return DEFAULT_NOTIFICATIONS.map(
            function (notification) {
                return { ...notification };
            }
        );

    }


    function saveNotifications(
        notifications
    ) {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    notifications
                )
            );

        } catch (error) {

            console.warn(
                "CubernixHosting: Could not save notifications.",
                error
            );

        }

    }


    function navigateTo(
        page
    ) {

        if (!page) {
            return;
        }


        document.dispatchEvent(
            new CustomEvent(
                "cubernix:navigate",
                {
                    detail: {
                        page: page
                    }
                }
            )
        );

    }


    function openBackgroundSettings() {

        navigateTo(
            "dashboard"
        );


        setTimeout(
            function () {

                const backgroundInput =
                    document.getElementById(
                        "cubernix-background-input"
                    );


                if (backgroundInput) {

                    backgroundInput.click();

                }

            },
            50
        );

    }


    function createNotificationPanel() {

        if (
            document.getElementById(
                "cubernix-notification-panel"
            )
        ) {
            return;
        }


        const notifications =
            loadNotifications();


        const panel =
            document.createElement(
                "div"
            );


        panel.id =
            "cubernix-notification-panel";


        panel.className =
            "cubernix-notification-panel";


        panel.innerHTML = `

            <div
                class="cubernix-notification-header"
            >

                <div>

                    <h3>
                        Notifications
                    </h3>

                    <span
                        class="cubernix-notification-count"
                    >
                        ${notifications.length}
                    </span>

                </div>


                <button
                    type="button"
                    class="cubernix-notification-clear"
                >
                    Clear all
                </button>

            </div>


            <div
                class="cubernix-notification-list"
                id="cubernix-notification-list"
            ></div>

        `;


        document.body.appendChild(
            panel
        );


        renderNotifications(
            panel,
            notifications
        );


        const clearButton =
            panel.querySelector(
                ".cubernix-notification-clear"
            );


        clearButton.addEventListener(
            "click",
            function () {

                saveNotifications(
                    []
                );


                renderNotifications(
                    panel,
                    []
                );

            }
        );


        document.addEventListener(
            "click",
            function closeNotificationPanel(
                event
            ) {

                const notificationButton =
                    document.getElementById(
                        "cubernix-notifications-button"
                    );


                if (
                    panel.contains(
                        event.target
                    ) ||
                    event.target ===
                    notificationButton
                ) {
                    return;
                }


                panel.remove();


                document.removeEventListener(
                    "click",
                    closeNotificationPanel
                );

            }
        );

    }


    function renderNotifications(
        panel,
        notifications
    ) {

        const list =
            panel.querySelector(
                "#cubernix-notification-list"
            );


        const count =
            panel.querySelector(
                ".cubernix-notification-count"
            );


        if (count) {

            count.textContent =
                notifications.length;

        }


        if (!notifications.length) {

            list.innerHTML = `

                <div
                    class="cubernix-notification-empty"
                >

                    <span>
                        🔔
                    </span>


                    <strong>
                        No notifications
                    </strong>


                    <small>
                        You're all caught up.
                    </small>

                </div>

            `;


            updateNotificationBadge(
                0
            );


            return;

        }


        list.innerHTML =
            "";


        notifications.forEach(
            function (notification) {

                const item =
                    document.createElement(
                        "button"
                    );


                item.type =
                    "button";


                item.className =
                    "cubernix-notification-item" +
                    (
                        notification.read
                            ? " read"
                            : ""
                    );


                item.innerHTML = `

                    <span
                        class="cubernix-notification-icon"
                    >
                        🔔
                    </span>


                    <span
                        class="cubernix-notification-content"
                    >

                        <strong>
                            ${escapeHTML(
                                notification.title
                            )}
                        </strong>


                        <small>
                            ${escapeHTML(
                                notification.message
                            )}
                        </small>

                    </span>

                `;


                item.addEventListener(
                    "click",
                    function () {

                        notification.read =
                            true;


                        saveNotifications(
                            notifications
                        );


                        item.classList.add(
                            "read"
                        );


                        updateNotificationBadge(
                            getUnreadCount(
                                notifications
                            )
                        );

                    }
                );


                list.appendChild(
                    item
                );

            }
        );


        updateNotificationBadge(
            getUnreadCount(
                notifications
            )
        );

    }


    function getUnreadCount(
        notifications
    ) {

        return notifications.filter(
            function (notification) {

                return !notification.read;

            }
        ).length;

    }


    function updateNotificationBadge(
        count
    ) {

        const button =
            document.getElementById(
                "cubernix-notifications-button"
            );


        if (!button) {
            return;
        }


        button.classList.toggle(
            "has-notifications",
            count > 0
        );


        button.setAttribute(
            "data-notification-count",
            String(count)
        );

    }


    function escapeHTML(
        value
    ) {

        return String(
            value
        )
            .replaceAll(
                "&",
                "&amp;"
            )
            .replaceAll(
                "<",
                "&lt;"
            )
            .replaceAll(
                ">",
                "&gt;"
            )
            .replaceAll(
                '"',
                "&quot;"
            )
            .replaceAll(
                "'",
                "&#039;"
            );

    }


    function syncSidebar(
        page
    ) {

        if (!page) {
            return;
        }


        document.dispatchEvent(
            new CustomEvent(
                "cubernix:topbar-navigation",
                {
                    detail: {
                        page: page
                    }
                }
            )
        );

    }


    function handleMenuAction(
        action
    ) {

        if (!action) {
            return;
        }


        if (
            action ===
            "settings"
        ) {

            navigateTo(
                "settings"
            );


            syncSidebar(
                "settings"
            );


            return;

        }


        if (
            action ===
            "background"
        ) {

            openBackgroundSettings();


            syncSidebar(
                "dashboard"
            );


            return;

        }


        if (
            action ===
            "plugins"
        ) {

            navigateTo(
                "plugins"
            );


            syncSidebar(
                "plugins"
            );


            return;

        }


        if (
            action ===
            "versions"
        ) {

            navigateTo(
                "versions"
            );


            syncSidebar(
                "versions"
            );


            return;

        }


        if (
            action ===
            "logout"
        ) {

            const confirmed =
                window.confirm(
                    "Are you sure you want to log out?"
                );


            if (confirmed) {

                console.log(
                    "CubernixHosting logout requested."
                );


                alert(
                    "Logout will be connected to Pterodactyl authentication later."
                );

            }


            return;

        }

    }


    function initTopbar() {

        const moreButton =
            document.getElementById(
                "cubernix-more-button"
            );


        const moreMenu =
            document.getElementById(
                "cubernix-more-menu"
            );


        const notificationsButton =
            document.getElementById(
                "cubernix-notifications-button"
            );


        if (
            !moreButton ||
            !moreMenu
        ) {
            return;
        }


        function openMenu() {

            moreMenu.hidden =
                false;


            moreButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        function closeMenu() {

            moreMenu.hidden =
                true;


            moreButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        function toggleMenu() {

            if (
                moreMenu.hidden
            ) {

                openMenu();

            } else {

                closeMenu();

            }

        }


        moreButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                toggleMenu();

            }
        );


        moreMenu.addEventListener(
            "click",
            function (event) {

                const item =
                    event.target.closest(
                        ".cubernix-more-item"
                    );


                if (!item) {
                    return;
                }


                const action =
                    item.dataset.action;


                closeMenu();


                handleMenuAction(
                    action
                );

            }
        );


        document.addEventListener(
            "click",
            function () {

                closeMenu();

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeMenu();

                }

            }
        );


        if (
            notificationsButton
        ) {

            const notifications =
                loadNotifications();


            updateNotificationBadge(
                getUnreadCount(
                    notifications
                )
            );


            notificationsButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    const existingPanel =
                        document.getElementById(
                            "cubernix-notification-panel"
                        );


                    if (existingPanel) {

                        existingPanel.remove();


                        return;

                    }


                    createNotificationPanel();

                }
            );

        }

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initTopbar
        );

    } else {

        initTopbar();

    }

})();
