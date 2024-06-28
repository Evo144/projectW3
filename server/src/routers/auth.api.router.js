const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db/models");
const generateToken = require("../utils/generateToken");
const cookiesConfig = require("../configs/cookiesConfig");
const { where } = require("sequelize");

router
    .post("/signup", async (req, res) => {
        console.log("req.body: ", req.body);
        const { username, email, password } = req.body;

        if (!(username && email && password)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                username,
                email,
                password: await bcrypt.hash(password, 10),
            },
        });
        if (!created)
            return res.status(403).json({ message: "User already exists" });
        const plainUser = user.get();
        delete plainUser.password;
        //console.log("Попадаем сюда");
        //if (!created) res.status(403).json({ message: "User already exists" });
        //! Генерируем access и refresh
        const { accessToken, refreshToken } = generateToken({
            user: plainUser,
        });

        //! Устанавливаем cookie с access токеном
        return res
            .cookie("refreshToken", refreshToken, cookiesConfig.refresh)
            .json({
                user: plainUser,
                accessToken,
            });
    })
    .post("/signin", async (req, res) => {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res
                .status(401)
                .json({ message: "Incorrect user or password" });
        }

        const correctPass = await bcrypt.compare(password, user.password);
        if (!correctPass) {
            return res
                .status(401)
                .json({ message: "Incorrect user or password" });
        }

        const plainUser = user.get();
        delete plainUser.password;

        const { accessToken, refreshToken } = generateToken({
            user: plainUser,
        });

        return res
            .cookie("refreshToken", refreshToken, cookiesConfig.refresh)
            .json({
                user: plainUser,
                accessToken,
            });
    })
    .get("/logout", (req, res) => {
        res.clearCookie("refreshToken").sendStatus(200);
    });

module.exports = router;
