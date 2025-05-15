const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET || 'votre_secret_jwt_super_securise', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token invalide' });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Token manquant' });
    }
};

const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).json({ message: 'Accès non autorisé' });
        }
    };
};

module.exports = {
    authenticateJWT,
    checkRole
}; 