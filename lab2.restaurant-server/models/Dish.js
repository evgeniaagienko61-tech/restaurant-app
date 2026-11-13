import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Назва страви є обов’язковою'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Категорія страви є обов’язковою'],
      trim: true, // Наприклад: "Перші страви", "Основні страви", "Десерти", "Напої"
    },
    price: {
      type: Number,
      required: [true, 'Ціна страви є обов’язковою'],
      min: [0, 'Ціна не може бути від’ємною'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;