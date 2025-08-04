// Sidebar functionality
document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('openBtn');
    const mainContent = document.getElementById('main-content');
    const backdrop = document.getElementById('backdrop');
    const geminiData = document.querySelector('.gemini-data');
    const settingHelp = document.getElementById('setting-help');
    const dropdownMenu = document.getElementById('dropdownMenu');

    // Sidebar toggle
    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (window.innerWidth < 768) {
                mainContent.classList.toggle('sidebar-open');
                mainContent.classList.toggle('pinned');
                backdrop.classList.toggle('active');

                if (mainContent.classList.contains('sidebar-open')) {
                    mainContent.classList.remove('pinned');
                }
            } else {
                mainContent.classList.toggle('pinned');
            }
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', () => {
            mainContent.classList.remove('sidebar-open');
            backdrop.classList.remove('active');
            mainContent.classList.remove('pinned');
            closeSettingsMenu();
        });
    }

    // Single resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            mainContent.classList.remove('sidebar-open');
            backdrop.classList.remove('active');
        } else {
            mainContent.classList.remove('pinned');
            mainContent.classList.remove('sidebar-open');
            backdrop.classList.remove('active');
            closeSettingsMenu();
        }

        if (!mainContent.classList.contains('pinned')) {
            closeSettingsMenu();
        }
    });

    // Sidebar hover logic (if needed)
    if (mainContent && geminiData) {
        mainContent.addEventListener('mouseenter', () => {
            if (window.innerWidth >= 768) {}
        });
        mainContent.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 768 && !mainContent.classList.contains("pinned")) {}
        });
    }

    // Header model dropdown
    const modelToggle = document.getElementById('model-toggle');
    const modelDropdown = document.getElementById('model-dropdown');
    if (modelToggle && modelDropdown) {
        modelToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            modelDropdown.classList.toggle('show');
        });

        document.addEventListener('click', function (e) {
            if (!modelDropdown.contains(e.target) && !modelToggle.contains(e.target)) {
                modelDropdown.classList.remove('show');
            }
        });

        modelDropdown.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // Profile dropdown
    const profileButton = document.getElementById('profile-button');
    const profileDropdown = document.getElementById('profile-dropdown');
    if (profileButton && profileDropdown) {
        profileButton.addEventListener('click', function (e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
        });

        document.addEventListener('click', function (e) {
            if (!profileDropdown.contains(e.target) && e.target !== profileButton) {
                profileDropdown.classList.remove('show');
            }
        });

        profileDropdown.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // Profile image upload
    const profileInput = document.getElementById("profile-img-upload");
    const profileCircle = document.getElementById("profile-circle");
    if (profileCircle && profileInput) {
        profileCircle.addEventListener("click", () => {
            profileInput.click();
        });

        profileInput.addEventListener("change", function () {
            const file = this.files[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageUrl = e.target.result;
                    profileCircle.innerHTML = "";
                    profileCircle.style.backgroundImage = `url(${imageUrl})`;
                    profileCircle.style.backgroundSize = "cover";
                    profileCircle.style.backgroundPosition = "center";

                    profileButton.innerHTML = "";
                    profileButton.style.backgroundImage = `url(${imageUrl})`;
                    profileButton.style.backgroundSize = "cover";
                    profileButton.style.backgroundPosition = "center";
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Theme switcher
    function toggleTheme(theme) {
        const body = document.body;
        body.classList.remove('light', 'dark');

        if (theme === 'light') {
            body.classList.add('light');
            localStorage.setItem('theme', 'light');
            document.querySelectorAll('.gemini-header button.bg-\\[\\#3d3f42\\] img').forEach(img => {
                img.style.filter = 'none';
            });
        } else if (theme === 'dark') {
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            document.querySelectorAll('.gemini-header button.bg-\\[\\#3d3f42\\] img').forEach(img => {
                img.style.filter = 'grayscale(100%) brightness(0) invert(1) saturate(10) hue-rotate(170deg)';
            });
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                body.classList.add('dark');
                document.querySelectorAll('.gemini-header button.bg-\\[\\#3d3f42\\] img').forEach(img => {
                    img.style.filter = 'grayscale(100%) brightness(0) invert(1) saturate(10) hue-rotate(170deg)';
                });
            } else {
                body.classList.add('light');
                document.querySelectorAll('.gemini-header button.bg-\\[\\#3d3f42\\] img').forEach(img => {
                    img.style.filter = 'none';
                });
            }
            localStorage.setItem('theme', 'system');
        }
    }

    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const effectiveTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        toggleTheme(effectiveTheme);

        document.querySelectorAll('.theme-options li').forEach(li => {
            li.textContent = li.textContent.replace(' ✔', '').trim();
            if (li.textContent.toLowerCase() === effectiveTheme) {
                li.textContent += ' ✔';
            }
        });
    }

    initializeTheme();

    document.querySelectorAll('.theme-options li').forEach(option => {
        option.addEventListener('click', function () {
            const theme = this.textContent.trim().toLowerCase().replace('✔', '').trim();
            toggleTheme(theme);
            document.querySelectorAll('.theme-options li').forEach(li => {
                li.textContent = li.textContent.replace(' ✔', '').trim();
            });
            this.textContent += ' ✔';
        });
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('theme') === 'system') {
            toggleTheme('system');
        }
    });

    // MutationObserver to detect pinned removal
    if (mainContent) {
        const observer = new MutationObserver(() => {
            if (!mainContent.classList.contains('pinned')) {
                closeSettingsMenu();
            }
        });
        observer.observe(mainContent, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
});

// Toggle settings dropdown only when pinned
function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    const settingHelp = document.getElementById('setting-help');
    const mainContent = document.getElementById('main-content');

    if (menu && settingHelp && mainContent) {
        // ✅ Force add pinned class if not present
        if (!mainContent.classList.contains('pinned')) {
            mainContent.classList.add('pinned');
        }

        // ✅ Toggle menu display
        const isVisible = menu.style.display === 'block';
        menu.style.display = isVisible ? 'none' : 'block';
        settingHelp.classList.toggle('setingbackgroundChange', !isVisible);
    }
}


// Auto-close settings on document click
document.addEventListener('click', function (e) {
    const dropdown = document.getElementById('dropdownMenu');
    const button = document.querySelector('.dropdown-toggle');
    const mainContent = document.getElementById('main-content');
    const settingHelp = document.getElementById('setting-help');

    if (dropdown && button && mainContent && settingHelp) {
        if (!dropdown.contains(e.target) && !button.contains(e.target)) {
            dropdown.style.display = 'none';
            settingHelp.classList.remove('setingbackgroundChange');
        }

        if (!mainContent.classList.contains('pinned')) {
            dropdown.style.display = 'none';
            settingHelp.classList.remove('setingbackgroundChange');
        }
    }
});

// Close settings menu utility
function closeSettingsMenu() {
    const menu = document.getElementById('dropdownMenu');
    const settingHelp = document.getElementById('setting-help');

    if (menu && settingHelp) {
        menu.style.display = 'none';
        settingHelp.classList.remove('setingbackgroundChange');
    }
}

// Mobile menu toggle
document.getElementById('mobileMenuBtn').addEventListener('click', function () {
    const mainContent = document.getElementById('main-content');
    const backdrop = document.getElementById('backdrop');

    mainContent.classList.toggle('sidebar-open');
    mainContent.classList.toggle('pinned');
    backdrop.classList.toggle('active');
});

// Option selector with check icon
function selectOption(clickedElement) {
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
        const checkIcon = option.querySelector('.fa-circle-check');
        if (checkIcon) checkIcon.classList.add('hidden');
    });

    clickedElement.classList.add('selected');
    const clickedCheckIcon = clickedElement.querySelector('.fa-circle-check');
    if (clickedCheckIcon) clickedCheckIcon.classList.remove('hidden');
}
