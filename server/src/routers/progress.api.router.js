const router = require('express').Router();
const { User, Card } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    const entryCards = await User.findOne({
      where: { id },
      include: [
        {
          model: Card,
          attributes: ['id', 'category', 'isLearned'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (res.locals.user.id === entryCards.dataValues.id) {
      const eCards = entryCards.get({ plain: true });
      const { username, Cards } = eCards;
      let quantityOfLearnedCards = 0;
      let quantityOfCards = 0;
      const cardsProgress = {};

      Cards.forEach((card) => {
        const newCard = {
          totalCards: 0,
          isLearnedTrue: 0,
        };
        if (card.category) {
          if (!(card.category in cardsProgress)) {
            cardsProgress[card.category] = newCard;
            cardsProgress[card.category].category = card.category;
          }
          if (card.isLearned) {
            cardsProgress[card.category].isLearnedTrue += 1;
            quantityOfLearnedCards += 1;
          }
          cardsProgress[card.category].totalCards += 1;
          cardsProgress[card.category].id = card.id;
        } else {
          if (!('без темы' in cardsProgress)) {
            cardsProgress['без темы'] = newCard;
            cardsProgress['без темы'].category = 'без_темы';
          }
          if (card.isLearned) {
            cardsProgress['без темы'].isLearnedTrue += 1;
            quantityOfLearnedCards += 1;
          }
          cardsProgress['без темы'].totalCards += 1;
          cardsProgress['без темы'].id = card.id;
        }
        quantityOfCards += 1;
      });

      const progress = Object.values(cardsProgress);
      progress.sort((a, b) => b.totalCards - a.totalCards);
      const progressSliced = progress.slice(0, 5);
      const otherTopics = progress.length - progressSliced.length;
      const cardsByCategory = {
        username,
        quantityOfCards,
        quantityOfLearnedCards,
        otherTopics,
        progress: progressSliced,
      };
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
