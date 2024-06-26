const router = require('express').Router();
const { User, Card, Stat } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await User.findOne({
      where: { id },
      include: { model: Resume },
      include: { model: Stat },
    });
    if (res.locals.user.id === entry.dataValues.id) {
      const { username, Cards, Stats } = entry.dataValues;
      const points = Stats.points
      safestEntry = { username, Cards, points };

      res.json(safestEntry);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.error(error);
    res.json(400);
  }
});

module.exports = router;
