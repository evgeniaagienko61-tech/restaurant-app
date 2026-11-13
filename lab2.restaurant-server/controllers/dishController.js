import Dish from '../models/Dish.js';

// 1. Отримати всі страви
export const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().sort({ createdAt: -1 });
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера при отриманні меню', error: error.message });
  }
};

// 2. Отримати одну страву за ID
export const getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: 'Страву не знайдено' });
    }
    res.status(200).json(dish);
  } catch (error) {
    res.status(400).json({ message: 'Некоректний ID страви', error: error.message });
  }
};

// 3. Створити нову страву
export const createDish = async (req, res) => {
  try {
    const { name, category, price, description, isAvailable } = req.body;
    const newDish = await Dish.create({
      name,
      category,
      price,
      description,
      isAvailable,
    });
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ message: 'Помилка при створенні страви', error: error.message });
  }
};

// 4. Оновити страву за ID
export const updateDish = async (req, res) => {
  try {
    const { name, category, price, description, isAvailable } = req.body;
    const updatedDish = await Dish.findByIdAndUpdate(
      req.params.id,
      { name, category, price, description, isAvailable },
      { new: true, runValidators: true }
    );

    if (!updatedDish) {
      return res.status(404).json({ message: 'Страву не знайдено' });
    }

    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(400).json({ message: 'Помилка при оновленні страви', error: error.message });
  }
};

// 5. Видалити страву за ID
export const deleteDish = async (req, res) => {
  try {
    const deletedDish = await Dish.findByIdAndDelete(req.params.id);
    if (!deletedDish) {
      return res.status(404).json({ message: 'Страву не знайдено' });
    }
    res.status(200).json({ message: 'Страву успішно видалено', id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: 'Помилка при видаленні страви', error: error.message });
  }
};