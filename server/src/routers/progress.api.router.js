const router = require('express').Router();
const { User, Card, Stat } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    const entryStat = await User.findOne({
      where: { id },
      include: { model: Stat },
    });
    const entryCards = await User.findOne({
      where: { id },
      include: [
        {
          model: Card,
          attributes: [ 'id', 'category', 'isLearned'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (res.locals.user.id === entryCards.dataValues.id) {
      const eCards = entryCards.get({ plain: true });
      const { username, Cards } = eCards;
      const points = entryStat.Stat.points;
      let quantityOfCards = 0;
      const cardsProgress = {};
      
      Cards.forEach((card) => {
        const newCard = {
          totalCards: 0,
          isLearnedTrue: 0,
        };
        if (!(card.category in cardsProgress)) {
          cardsProgress[card.category] = newCard;
          cardsProgress[card.category].category = card.category;
        }
        if (card.isLearned) {
          cardsProgress[card.category].isLearnedTrue += 1;
        }
        cardsProgress[card.category].totalCards += 1;
        cardsProgress[card.category].id = card.id;
        quantityOfCards += 1;
      });
      const progress = Object.values(cardsProgress)
      const cardsByCategory = { username, quantityOfCards, points, progress };
      console.log(progress);
      res.json(cardsByCategory);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.error(error);
    res.json(400);
  }
});

module.exports = router;
