import bcrypt from 'bcryptjs';
import { users, dishes, getNextUserId, getNextDishId } from './data.js';
import { createToken } from './auth.js';

export const resolvers = {
  Query: {
    users: () => users,

    me: (parent, args, context) => {
      return context.user || null;
    },

    dishes: (parent, { category }) => {
      if (category) {
        return dishes.filter(
          (dish) => dish.category.toLowerCase() === category.toLowerCase()
        );
      }
      return dishes;
    },

    dish: (parent, { id }) => {
      return dishes.find((dish) => dish.id === id) || null;
    },
  },

  Dish: {
    owner: (parent) => {
      const foundUser = users.find((u) => u.id === parent.ownerId);
      // Резервний системний адміністратор для початкових тестових страв
      return (
        foundUser || {
          id: '0',
          name: 'Шеф-кухар ресторану',
          email: 'chef@restaurant.ua',
        }
      );
    },
  },

  Mutation: {
    register: async (parent, { name, email, password }) => {
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        throw new Error('Користувач із таким email уже зареєстрований.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: getNextUserId(),
        name,
        email,
        password: hashedPassword,
      };

      users.push(newUser);
      const token = createToken(newUser);

      return { token, user: newUser };
    },

    login: async (parent, { email, password }) => {
      const user = users.find((u) => u.email === email);
      if (!user) {
        throw new Error('Невірний email або пароль.');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Невірний email або пароль.');
      }

      const token = createToken(user);
      return { token, user };
    },

    createDish: (parent, { name, category, price, isAvailable }, context) => {
      if (!context.user) {
        throw new Error('Потрібна авторизація.');
      }

      const newDish = {
        id: getNextDishId(),
        name,
        category,
        price,
        isAvailable: isAvailable ?? true,
        ownerId: context.user.id,
      };

      dishes.push(newDish);
      return newDish;
    },

    deleteDish: (parent, { id }, context) => {
      if (!context.user) {
        throw new Error('Потрібна авторизація.');
      }

      const index = dishes.findIndex((dish) => dish.id === id);
      if (index === -1) {
        return false;
      }

      dishes.splice(index, 1);
      return true;
    },
  },
};