
/* ==========================================================
   MOTOFIX GARAGE - GLOBAL JAVASCRIPT
   Theme, Direction, Navigation & Animations
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================================
       1. ELEMENTS
    ====================================================== */

    const html = document.documentElement;

    const themeBtn = document.getElementById("themeBtn");
    const directionBtn = document.getElementById("directionBtn");

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    const navDropdowns = document.querySelectorAll(".nav-dropdown");

    /* ======================================================
       2. LOAD SAVED THEME
    ====================================================== */

    function applyTheme(theme) {

        if (theme === "dark") {
            html.classList.add("dark-mode");
        } else {
            html.classList.remove("dark-mode");
        }

        localStorage.setItem("motofix-theme", theme);

        updateThemeButton();
    }

    function updateThemeButton() {

        if (!themeBtn) return;

        const isDark = html.classList.contains("dark-mode");

        themeBtn.innerHTML = isDark
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';

        themeBtn.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        themeBtn.setAttribute(
            "title",
            isDark ? "Light Mode" : "Dark Mode"
        );
    }

    const savedTheme = localStorage.getItem("motofix-theme");

    applyTheme(savedTheme || "light");

    if (themeBtn) {

        themeBtn.addEventListener("click", function () {

            const currentTheme =
                html.classList.contains("dark-mode") ? "dark" : "light";

            const newTheme =
                currentTheme === "dark" ? "light" : "dark";

            applyTheme(newTheme);

        });

    }

    /* ======================================================
       3. LOAD SAVED DIRECTION
    ====================================================== */

    function applyDirection(direction) {

        html.setAttribute("dir", direction);

        html.setAttribute("lang", direction === "rtl" ? "ar" : "en");

        localStorage.setItem("motofix-direction", direction);

        updateDirectionButton();
    }

    function updateDirectionButton() {

        if (!directionBtn) return;

        const isRTL = html.getAttribute("dir") === "rtl";

        directionBtn.innerHTML = isRTL
            ? '<i class="fas fa-arrow-left"></i> LTR'
            : '<i class="fas fa-arrow-right"></i> RTL';

        directionBtn.setAttribute(
            "aria-label",
            isRTL ? "Switch to left-to-right direction" :
                    "Switch to right-to-left direction"
        );

        directionBtn.setAttribute(
            "title",
            isRTL ? "Switch to LTR" : "Switch to RTL"
        );
    }

    const savedDirection =
        localStorage.getItem("motofix-direction") || "ltr";

    applyDirection(savedDirection);

    if (directionBtn) {

        directionBtn.addEventListener("click", function () {

            const currentDirection = html.getAttribute("dir");

            const newDirection =
                currentDirection === "rtl" ? "ltr" : "rtl";

            applyDirection(newDirection);

        });

    }

    /* ======================================================
       4. MOBILE NAVIGATION
    ====================================================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            const isOpen = mainNav.classList.toggle("active");

            menuToggle.innerHTML = isOpen
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

    }

    /* ======================================================
       5. HOME DROPDOWN
    ====================================================== */

    navDropdowns.forEach(function (dropdown) {

        const toggle = dropdown.querySelector(".dropdown-toggle");

        if (!toggle) return;

        toggle.addEventListener("click", function (event) {

            event.preventDefault();

            const isOpen = dropdown.classList.contains("open");

            // Close other dropdowns
            navDropdowns.forEach(function (item) {
                item.classList.remove("open");

                const button = item.querySelector(".dropdown-toggle");

                if (button) {
                    button.setAttribute("aria-expanded", "false");
                }
            });

            if (!isOpen) {
                dropdown.classList.add("open");
                toggle.setAttribute("aria-expanded", "true");
            }

        });

    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {

        if (!event.target.closest(".nav-dropdown")) {

            navDropdowns.forEach(function (dropdown) {

                dropdown.classList.remove("open");

                const toggle =
                    dropdown.querySelector(".dropdown-toggle");

                if (toggle) {
                    toggle.setAttribute("aria-expanded", "false");
                }

            });

        }

    });

    /* ======================================================
       6. CLOSE MOBILE MENU AFTER CLICKING A LINK
    ====================================================== */

    if (mainNav) {

        mainNav.querySelectorAll("a:not(.dropdown-toggle)")
            .forEach(function (link) {

                link.addEventListener("click", function () {

                    if (window.innerWidth <= 850) {

                        mainNav.classList.remove("active");

                        if (menuToggle) {
                            menuToggle.innerHTML =
                                '<i class="fas fa-bars"></i>';

                            menuToggle.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                        }

                    }

                });

            });

    }

    /* ======================================================
       7. ACTIVE NAVIGATION LINK
    ====================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".main-nav a[href]").forEach(function (link) {

        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {

            link.classList.add("active");

            const parentDropdown = link.closest(".nav-dropdown");

            if (parentDropdown) {
                parentDropdown.querySelector(".dropdown-toggle")
                    ?.classList.add("active");
            }

        }

    });

    /* ======================================================
       8. DYNAMIC COPYRIGHT YEAR
    ====================================================== */

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    /* ======================================================
       9. SCROLL REVEAL ANIMATIONS
    ====================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }

});


























/* ==========================================
   MOTOFIX - ACTIVE NAVIGATION LINK
========================================== */

(function () {

    function setActiveNavigation() {

        const mainNav = document.getElementById("mainNav");

        if (!mainNav) return;

        let currentPage = window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

        if (!currentPage) {
            currentPage = "index.html";
        }

        const navLinks = mainNav.querySelectorAll(".nav-link");
        const dropdownLinks = mainNav.querySelectorAll(".dropdown-menu a");

        // Remove all previous active classes
        navLinks.forEach(link => {
            link.classList.remove("active");
        });

        dropdownLinks.forEach(link => {
            link.classList.remove("active");
        });

        // Check Home pages
        if (
            currentPage === "index.html" ||
            currentPage === "home-2.html"
        ) {

            const homeButton = mainNav.querySelector(".dropdown-toggle");

            if (homeButton) {
                homeButton.classList.add("active");
            }

            // Highlight the selected Home dropdown item
            dropdownLinks.forEach(link => {

                const linkPage = link.getAttribute("href")
                    .split("/")
                    .pop()
                    .toLowerCase();

                if (linkPage === currentPage) {
                    link.classList.add("active");
                }

            });

            return;
        }

        // Check other navigation pages
        navLinks.forEach(link => {

            if (link.classList.contains("dropdown-toggle")) {
                return;
            }

            const href = link.getAttribute("href");

            if (!href) return;

            const linkPage = href.split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();

            if (linkPage === currentPage) {
                link.classList.add("active");
            }

        });

    }

    // Works whether this script loads before or after DOM ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setActiveNavigation);
    } else {
        setActiveNavigation();
    }

})();























