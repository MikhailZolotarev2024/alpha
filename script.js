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


document.addEventListener("DOMContentLoaded", () => {
    loadReviews();
    loadMarkdownReviews();
});

function addReview() {
    const name = document.getElementById("reviewName").value.trim();
    const text = document.getElementById("reviewText").value.trim();
    if (!name || !text) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    const date = new Date().toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    const review = { name, text, date };
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    document.getElementById("reviewName").value = "";
    document.getElementById("reviewText").value = "";

    displayReview(review);
}

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.forEach(displayReview);
}

function displayReview(review) {
    const reviewList = document.querySelector(".review-list");
    const div = document.createElement("div");
    div.classList.add("review");
    div.innerHTML = `<strong>${review.name}</strong><p>${review.text}</p><small>${review.date}</small>`;
    reviewList.prepend(div);
}

// 🔥 Загружаем отзывы из `reviews.md`
function loadMarkdownReviews() {
    fetch("reviews.md")
        .then(response => response.text())
        .then(text => {
            const converter = new showdown.Converter();
            const html = converter.makeHtml(text);
            document.querySelector(".review-list").innerHTML += html;
        })
        .catch(error => console.error("Ошибка загрузки отзывов:", error));
});