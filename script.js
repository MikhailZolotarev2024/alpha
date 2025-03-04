// Глобальные функции
function toggleMenu() {
    const menuIcon = document.querySelector(".menu-icon");
    const menuDropdown = document.querySelector(".menu-dropdown");
    if (menuIcon && menuDropdown) {
        menuIcon.classList.toggle("active");
        menuDropdown.classList.toggle("active");
    }
}

function toggleSection(event) {
    const section = event.target.parentElement;
    if (section) {
        section.classList.toggle("active");
    }
}

// Основной скрипт выполняется после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.addEventListener("click", async function (event) {
            event.preventDefault(); // Предотвращаем стандартную отправку формы

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            if (!name || !email || !message) {
                alert("Все поля обязательны!");
                return;
            }

            try {
                const response = await fetch("https://6a17-185-244-159-19.ngrok-free.app/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, message }),
                });

                const result = await response.json();
                alert(result.success || result.error);
            } catch (error) {
                console.error("Ошибка при отправке формы:", error);
                alert("Ошибка при отправке. Проверьте соединение с сервером.");
            }
        });
    } else {
        console.error("Кнопка отправки не найдена. Проверьте ID 'submitBtn'.");
    }
});


