const prisma = require("../configuration/prisma_db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {

    login: async (req, res) => {

        const { email, password } = req.body;

        try {

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if(!user) {
                return res.status(404).send("User does not exist")
            }

            const passMatch = await bcrypt.compare(password, user.hashedPassword);
            
            if(!passMatch) {
                return res.status(400).send("Wrong password")
            }

            //create payload that will be stored in the token
            const payload = {
                sub: {
                    userId: user.id,
                    email: user.email
                },
                iss: "web3Bioscoop"
            }

            //create the token itself
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "5m" });

            //create server cookie which contains our token
            res.cookie("bio_token", token, {
                httpOnly: true,
                secure: false,
                expires: new Date(Date.now() + 5 * 60 * 1000)
            })

            res.status(200).send("login was successfull");

        } catch(err) {
            res.status(500).send("Something went wrong")
        }

    },

    logout: async (req, res) => {

        res.clearCookie("bio_token", {
            httpOnly: true,
            secure: false
        })
        res.status(204).send("Logout successfull")
    },

    verify: async (req, res) => {

        const userId = req.userId;

        try {

            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    email: true
                }
            });
   
            if(!user) {
                return res.sendStatus(404);
            }

            res.status(200).json(user);

        } catch(err) {
            res.status(500).send("Something went wrong verifying user")
        } 
    }


}

module.exports = authController;