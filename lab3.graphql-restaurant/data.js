export const users = [];

export const dishes = [
  {
    id: '1',
    name: 'Борщ український з пампушками',
    category: 'Перші страви',
    price: 165.0,
    isAvailable: true,
    ownerId: '0',
  },
  {
    id: '2',
    name: 'Стейк Рібай',
    category: 'Основні страви',
    price: 540.0,
    isAvailable: true,
    ownerId: '0',
  },
];

let nextUserId = 1;
let nextDishId = 3;

export function getNextUserId() {
  return String(nextUserId++);
}

export function getNextDishId() {
  return String(nextDishId++);
}