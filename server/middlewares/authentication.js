// JWT
const jwt = require('jsonwebtoken');

// ======================
//   VERIFICAR TOKEN
// ======================
let verifyToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.user;
        next();
    });
};

let verifyAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if(usuario.role === 'ADMIN_ROLE'){
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: "El usuario no es administrador"
            }
        });
    }
}

module.exports = {
    verifyToken,
    verifyAdmin_Role
};
