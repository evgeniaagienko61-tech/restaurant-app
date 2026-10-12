/*
  Лабораторна робота: Варіант №3 (Розробка застосунку для ресторану)
  Логіка меню, кошика замовлень, бронювання столиків та відміни бронювання.
*/

const noteInput = document.getElementById("noteInput");
const addNoteButton = document.getElementById("addNoteButton");
const notesList = document.getElementById("notesList");
const message = document.getElementById("message");

const clientName = document.getElementById("clientName");
const bookingDate = document.getElementById("bookingDate");
const bookingTime = document.getElementById("bookingTime");
const bookTableBtn = document.getElementById("bookTableBtn");
const bookingMessage = document.getElementById("bookingMessage");
const bookingList = document.getElementById("bookingList");

// Масив для збереження активних бронювань у пам'яті
const reservedSlots = [];

function showMessage(element, text, color) {
    element.textContent = text;
    element.style.color = color;
}

// Створення елемента замовлення в кошику
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
        showMessage(message, "Страву видалено з кошика.", "#ef4444");
    });

    noteItem.appendChild(textSpan);
    noteItem.appendChild(deleteButton);
    return noteItem;
}

// Додавання замовлення з поля
function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText === "") {
        showMessage(message, "Будь ласка, введіть деталі замовлення.", "#ef4444");
        return;
    }

    const noteElement = createNoteElement(noteText);
    notesList.appendChild(noteElement);

    noteInput.value = "";
    noteInput.focus();
    showMessage(message, "Замовлення успішно додано до кошика!", "#16a34a");
}

addNoteButton.addEventListener("click", addNote);
noteInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addNote();
    }
});

// Додавання страв з меню
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
        const menuItem = this.closest(".menu-item");
        const dishName = menuItem.getAttribute("data-name");
        const dishPrice = menuItem.getAttribute("data-price");

        const orderText = `${dishName} — ${dishPrice} грн`;
        const noteElement = createNoteElement(orderText);
        notesList.appendChild(noteElement);

        showMessage(message, `Страву "${dishName}" додано до кошика!`, "#16a34a");
    });
});

// Додавання елемента бронювання у список із кнопкою скасування
function addBookingToUI(bookingObj) {
    const bookingItem = document.createElement("li");
    bookingItem.className = "note-item";

    const textSpan = document.createElement("span");
    textSpan.className = "note-text";
    textSpan.textContent = `Гість: ${bookingObj.name} | Дата: ${bookingObj.date} | Час: ${bookingObj.time}`;

    const cancelButton = document.createElement("button");
    cancelButton.className = "delete-button";
    cancelButton.textContent = "Скасувати бронювання";

    cancelButton.addEventListener("click", function () {
        // Видаляємо слот із масиву заброньованих
        const index = reservedSlots.findIndex(
            slot => slot.date === bookingObj.date && slot.time === bookingObj.time
        );
        if (index !== -1) {
            reservedSlots.splice(index, 1);
        }

        // Видаляємо з DOM
        bookingItem.remove();
        showMessage(bookingMessage, "Бронювання столика успішно скасовано.", "#ef4444");
    });

    bookingItem.appendChild(textSpan);
    bookingItem.appendChild(cancelButton);
    bookingList.appendChild(bookingItem);
}

// Бронювання столика з перевіркою зайнятості
bookTableBtn.addEventListener("click", function () {
    const name = clientName.value.trim();
    const date = bookingDate.value;
    const time = bookingTime.value;

    if (!name || !date || !time) {
        showMessage(bookingMessage, "Будь ласка, заповніть усі поля для бронювання.", "#ef4444");
        return;
    }

    // Перевіряємо, чи цей час уже заброньований
    const isAlreadyBooked = reservedSlots.some(
        slot => slot.date === date && slot.time === time
    );

    if (isAlreadyBooked) {
        showMessage(
            bookingMessage,
            `Вибачте, столик на ${date} о ${time} вже заброньований іншим гостем. Оберіть інший час!`,
            "#ef4444"
        );
        return;
    }

    // Якщо час вільний — додаємо бронювання
    const newBooking = { name, date, time };
    reservedSlots.push(newBooking);
    addBookingToUI(newBooking);

    showMessage(bookingMessage, `Дякуємо, ${name}! Столик заброньовано на ${date} о ${time}.`, "#16a34a");

    clientName.value = "";
    bookingDate.value = "";
    bookingTime.value = "";
});