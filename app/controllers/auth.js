let bcrypt = require('bcrypt');
let Usuario = require('../models/usuario');
let jwt = require('jsonwebtoken');


module.exports.logar=function(req, res){
    let promise = Usuario.findOne({'email': req.body.email});
    promise.then(
        function(usuario){
            if(bcrypt.compareSync(req.body.senha, usuario.senha)){
                let token = jwt.sign({id: usuario._id}, 'secreto');
                console.log(token);
                res.status(200).json({
                    id: usuario._id,
                    token: token,
                    message: "Usuário logado!"
                });
            }else{
                res.status(401).send("Login inválido")
            }
        }
    ).catch(
        function(erro){
            res.status(401).send(" Login Inválido")
        }
    );
}
      
module.exports.checar = function(req, res, next){
    jwt.verify(req.query.token, 'secreto', function(err, decoded){
        if(err){
            res.status(401).json({
                message: 'não autorizado'
            })

        }
        next();
    })

};