document.addEventListener("DOMContentLoaded", () => {
    loadReviews();
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

    // Получаем существующие отзывы из localStorage или создаём новый массив
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    // Очищаем поля формы
    document.getElementById("reviewName").value = "";
    document.getElementById("reviewText").value = "";

    // Выводим новый отзыв на страницу
    displayReview(review);
};

function loadReviews() {
    fetch("reviews.json")
        .then(response => response.json())
        .then(jsonData => {
            // Сначала показываем отзывы из JSON
            const localReviews = JSON.parse(localStorage.getItem("reviews")) || [];
            localReviews.forEach(displayReview);
            jsonData.forEach(displayReview);
        })
        .catch(error => {
            console.error("Ошибка загрузки JSON отзывов:", error);
            // Если не получилось загрузить JSON, хотя бы покажем localStorage
            const localReviews = JSON.parse(localStorage.getItem("reviews")) || [];
            localReviews.forEach(displayReview);
        });
};

function displayReview(review) {
    const reviewList = document.querySelector(".review-list");
    const div = document.createElement("div");
    div.classList.add("review");
    div.innerHTML = `<strong>${review.name}</strong><p>${review.text}</p><small>${review.date}</small>`;
    reviewList.prepend(div);
};