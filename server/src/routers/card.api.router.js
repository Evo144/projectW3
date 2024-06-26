const router = require('express').Router();
const { User, Card, Userscard } = require('../../db/models');
const { verifyAccessToken, verifyRefreshToken } = require('../middlewares/verifyToken');

router

  .get('/', verifyAccessToken, async (req, res) => {
    try {
      const cards = await Card.findAll();
      return res.status(200).json(cards);
    } catch (error) {
      return res.status(500).json({ message: 'Произошла ошибка при получении карточек', error: error.message });
    }
  })

  .get('/categories', verifyAccessToken, async (req, res) => {
    try {
      const categories = await Card.findAll({
        attributes: ['category'],
        group: ['category']
      });
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: 'Произошла ошибка при получении категорий', error: error.message });
    }
})
  

  .post('/:id', verifyAccessToken, async (req, res) => {
    const {
      category, word, translate, difficulty, isLearned,
    } = req.body;

    try {
      const newCard = await Card.create({
        category,
        word,
        translate,
        difficulty, 
        isLearned
      });
  
      const data = await Userscard.create({
        userId: req.params.id,
        cardId: newCard.id,
      });

      
      return res.status(201).json({ message: 'Карточка успешно создана', data: { newCard, data } });
    } catch (error) {
      console.log('Ошибка', error);
      return res.status(500).json({ message: 'Произошла ошибка при создании карточки', error: error.message });
    }
  })

module.exports = router;