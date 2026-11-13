export const validateDish = (req, res, next) => {
  const { name, category, price } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      message: 'Поле "name" (назва страви) є обов’язковим і не може бути порожнім',
    });
  }

  if (!category || typeof category !== 'string' || category.trim() === '') {
    return res.status(400).json({
      message: 'Поле "category" (категорія) є обов’язковим і не може бути порожнім',
    });
  }

  if (price === undefined || price === null || typeof price !== 'number' || price < 0) {
    return res.status(400).json({
      message: 'Поле "price" (ціна) є обов’язковим і має бути додатним числом',
    });
  }

  next();
};