
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

document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("https://9a7d-185-244-159-19.ngrok-free.app/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();
        alert(result.success || result.error);
    } catch (error) {
        console.error("Ошибка при отправке формы:", error);
        alert("Ошибка при отправке. Проверьте соединение с сервером.");
    }
}
    </script>