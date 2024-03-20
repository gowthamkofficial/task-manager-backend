const jwt = require('jsonwebtoken');
const { Failure } = require('../response.model');


function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json(new Failure('Token not found'));
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decoded.id;
        next();
    } catch (error) {
        res.status(401).json(new Failure('Session exxpired or Invalid token', error));
    }
}


module.exports = verifyToken