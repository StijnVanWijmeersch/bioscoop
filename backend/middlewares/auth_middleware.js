const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const cookies = req.cookies;
    const bioToken = cookies?.bio_token;

    if(!bioToken) {
        return res.sendStatus(401);
    }

    jwt.verify(bioToken, process.env.TOKEN_SECRET, (err, payload) => {
        if(err) {
            return res.sendStatus(400).send("This token has expired, login if you want to continue.");
        }

        req.userId = payload.sub.userId;
        next();
    });
}

module.exports = authMiddleware;