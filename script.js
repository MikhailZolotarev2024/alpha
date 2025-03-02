
function toggleMenu() {
            const menuIcon = document.querySelector('.menu-icon');
            const menuDropdown = document.querySelector('.menu-dropdown');
            menuIcon.classList.toggle('active');
            menuDropdown.classList.toggle('active');
			}
        // Переключение expandable секций
        function toggleSection(event) {
            const section = event.target.parentElement;
            section.classList.toggle('active');
        }
    </script>