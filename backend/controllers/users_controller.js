const prisma = require("../configuration/prisma_db")
const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")

//USER CRUD OPERATIONS
const usersController = {
    
    create: async (req, res) => {
        
        //check if there are any errors in validation
        const validationErrors = validationResult(req);

        if(!validationErrors.isEmpty()) {
            return res.status(500).json(validationErrors.array());
        }

        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        try {

            const user = await prisma.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    hashedPassword: hashedPassword
                }
            });

            res.status(201).json(user);

        } catch(err) {
            res.status(500).send("Something went wrong adding user");
        }

    },
    
}

module.exports = usersController;