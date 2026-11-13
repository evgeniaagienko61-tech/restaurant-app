let items = [];

const itemInput = document.getElementById('itemInput');
const addItemButton = document.getElementById('addItemButton');
const itemsList = document.getElementById('itemsList');
const messageElement = document.getElementById('message');

function showMessage(text, color) {
    messageElement.textContent = text;
    messageElement.style.color = color;
    setTimeout(() => {
        messageElement.textContent = '';
    }, 3000);
}

function renderItems() {
    itemsList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item-element';

        const span = document.createElement('span');
        span.textContent = item.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Видалити';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = async () => {
            items = items.filter(i => i.id !== item.id);
            await window.restaurantAPI.saveItems(items);
            renderItems();
            showMessage('Позицію видалено.', 'orange');
        };

        li.appendChild(span);
        li.appendChild(deleteButton);
        itemsList.appendChild(li);
    });
}

async function addItem() {
    const text = itemInput.value.trim();
    if (!text) {
        showMessage('Будь ласка, введіть текст позиції.', 'red');
        return;
    }

    const newItem = { id: Date.now(), text };
    items.push(newItem);
    
    const success = await window.restaurantAPI.saveItems(items);
    if (success) {
        itemInput.value = '';
        renderItems();
        showMessage('Позицію успішно збережено!', 'green');
    } else {
        showMessage('Помилка збереження файлу!', 'red');
    }
}

addItemButton.addEventListener('click', addItem);
itemInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

// Завантаження даних при запуску вікна
window.addEventListener('DOMContentLoaded', async () => {
    items = await window.restaurantAPI.loadItems();
    renderItems();
});