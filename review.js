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
            const reviews = text.split("\n\n"); // Разделяем по пустым строкам
            reviews.forEach(block => {
                const lines = block.split("\n").map(line => line.trim());
                if (lines.length < 3) return; // Если отзыв неполный, пропускаем

                let name = lines[0]; // Первая строка — имя
                let date = lines[1]; // Вторая строка — дата
                let text = lines.slice(2).join(" "); // Всё остальное — сам отзыв

                displayReview({ name, date, text });
            });
        })
        .catch(error => console.error("Ошибка загрузки отзывов:", error));
};
