/*
  Лабораторна робота 1.2: Основи кросплатформності (Варіант №3: Застосунок для ресторану)

  Цей JavaScript-файл відповідає за логіку ресторанного застосунку:
  - перегляд меню та додавання страв у кошик;
  - додавання та видалення замовлень;
  - бронювання столиків з перевіркою зайнятості часу;
  - скасування бронювань.
*/

// Елементи кошика / замовлень
const noteInput = document.getElementById("noteInput");
const addNoteButton = document.getElementById("addNoteButton");
const notesList = document.getElementById("notesList");
const message = document.getElementById("message");

// Елементи бронювання
const clientName = document.getElementById("clientName");
const bookingDate = document.getElementById("bookingDate");
const bookingTime = document.getElementById("bookingTime");
const bookTableButton = document.getElementById("bookTableButton");
const bookingMessage = document.getElementById("bookingMessage");
const bookingList = document.getElementById("bookingList");

// Масив для збереження заброньованих годин (щоб інший користувач не забронював той самий час)
const reservedSlots = [];

function showMessage(el, text, color) {
    el.textContent = text;
    el.style.color = color;
}

/*
  Функція створення елемента замовлення (або страви в кошику)
*/
function createNoteElement(noteText) {
    const noteItem = document.createElement("li");
    noteItem.className = "note-item";

    const textSpan = document.createElement("span");
    textSpan.className = "note-text";
    textSpan.textContent = noteText;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Видалити";

    deleteButton.addEventListener("click", function () {
        noteItem.remove();
        showMessage(message, "Страву видалено з замовлень.", "#ef4444");
    });

    noteItem.appendChild(textSpan);
    noteItem.appendChild(deleteButton);
    return noteItem;
}

/*
  Додавання замовлення через текстове поле
*/
function addNote() {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        showMessage(message, "Будь ласка, введіть назву страви або побажання.", "#ef4444");
        return;
    }

    const noteElement = createNoteElement(noteText);
    notesList.appendChild(noteElement);

    noteInput.value = "";
    noteInput.focus();
    showMessage(message, "Замовлення успішно додано.", "#16a34a");
}

addNoteButton.addEventListener("click", addNote);

noteInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addNote();
    }
});

/*
  Додавання страв у кошик прямо з карточок меню
*/
const addMenuButtons = document.querySelectorAll(".add-menu-btn");
addMenuButtons.forEach(button => {
    button.addEventListener("click", function () {
        const card = this.closest(".menu-item-card");
        const name = card.getAttribute("data-name");
        const price = card.getAttribute("data-price");

        const orderText = `${name} — ${price} грн`;
        const noteElement = createNoteElement(orderText);
        notesList.appendChild(noteElement);

        showMessage(message, `Страву "${name}" додано до кошика!`, "#16a34a");
    });
});

/*
  Логіка бронювання столика з перевіркою зайнятості
*/
bookTableButton.addEventListener("click", function () {
    const name = clientName.value.trim();
    const date = bookingDate.value;
    const time = bookingTime.value;

    if (!name || !date || !time) {
        showMessage(bookingMessage, "Будь ласка, заповніть усі поля для бронювання.", "#ef4444");
        return;
    }

    // Перевірка, чи цей час вже зайнятий
    const isBooked = reservedSlots.some(slot => slot.date === date && slot.time === time);
    if (isBooked) {
        showMessage(bookingMessage, `Вибачте, на ${date} о ${time} столик вже заброньований! Оберіть інший час.`, "#ef4444");
        return;
    }

    // Додаємо до пам'яті заброньованих слот
    const bookingObj = { name, date, time };
    reservedSlots.push(bookingObj);

    // Створюємо елемент у списку бронювань з кнопкою скасування
    const bookingItem = document.createElement("li");
    bookingItem.className = "note-item";

    const textSpan = document.createElement("span");
    textSpan.className = "note-text";
    textSpan.textContent = `Гість: ${name} | Дата: ${date} | Час: ${time}`;

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "delete-button";
    cancelBtn.textContent = "Скасувати";

    cancelBtn.addEventListener("click", function () {
        // Видаляємо з масиву зайнятих слотів
        const index = reservedSlots.findIndex(s => s.date === date && s.time === time);
        if (index !== -1) {
            reservedSlots.splice(index, 1);
        }
        bookingItem.remove();
        showMessage(bookingMessage, "Бронювання столика скасовано.", "#ef4444");
    });

    bookingItem.appendChild(textSpan);
    bookingItem.appendChild(cancelBtn);
    bookingList.appendChild(bookingItem);

    showMessage(bookingMessage, `Дякуємо, ${name}! Столик успішно заброньовано на ${date} о ${time}.`, "#16a34a");

    clientName.value = "";
    bookingDate.value = "";
    bookingTime.value = "";
});