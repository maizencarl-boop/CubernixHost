// CubernixHosting Page Switcher

(function () {
    "use strict";

    function initPageSwitcher() {

        const pages = document.querySelectorAll(
            ".cubernix-page"
        );

        if (!pages.length) {
            return;
        }

        function showPage(pageName) {

            pages.forEach(function (page) {

                const pageId =
                    page.dataset.pageContent;

                page.hidden =
                    pageId !== pageName;

            });

        }

        document.addEventListener(
            "cubernix:navigate",
            function (event) {

                const page =
                    event.detail &&
                    event.detail.page;

                if (!page) {
                    return;
                }

                showPage(page);

            }
        );

        showPage("dashboard");
    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initPageSwitcher
        );

    } else {

        initPageSwitcher();

    }

})();
