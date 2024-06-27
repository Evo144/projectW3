const router = require('express').Router();
const { User, Card, Userscard } = require('../../db/models');
const { verifyAccessToken, verifyRefreshToken } = require('../middlewares/verifyToken');

router

  .get('/', verifyAccessToken, async (req, res) => {
    try {
      const userCards = await User.findOne({
        where: { id: res.locals.user.id },
        include: {
          model: Card,
        },
      });

      res.json(userCards.Cards);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  .get('/categories', verifyAccessToken, async (req, res) => {
    try {
      const categories = await Card.findAll({
        attributes: ['category'],
        group: ['category'],
      });
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ message: 'Произошла ошибка при получении категорий', error: error.message });
    }
  })

  .delete('/:id', async (req, res) => {
    console.log('Зашёл в ручку')  
    const { id } = req.params;
    console.log('ID', id);
    try {
      const card = await Card.findOne({
        where: {
          id,
        },
      });
      console.log('Карточка', card)  
      await card.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
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
        isLearned,
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

  .put('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    const {
      category, word, translate, difficulty, isLearned,
    } = req.body;
  
    try {
      const updatedCard = await Card.findOne({
        where: {
          id,
        },
      });
  
      if (updatedCard) {
        updatedCard.category = category;
        updatedCard.word = word;
        updatedCard.translate = translate;
        updatedCard.difficulty = difficulty;
        updatedCard.isLearned = isLearned;
  
        await updatedCard.save();
  
        return res.status(200).json({ message: 'Карточка успешно обновлена', updatedCard });
      } 
    } catch (error) {
      console.log('Ошибка при обновлении карточки', error);
      return res.status(500).json({ message: 'Произошла ошибка при обновлении карточки', error: error.message });
    }
  });


module.exports = router;
