const { Card } = require("../../db/models");

module.exports = async (req, res, next) => {
    const card = await Card.findByPk(req.params.id);

    if (!card) return res.status(400).json({ message: "No card found" });

    if (card.userId !== res.locals.user?.id) {
        return res.status(403).json({ message: "Not your card!" });
    }

    return next();
};
