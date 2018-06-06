let Usuario = require('../models/usuario');
let Post = require('../models/post');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');



module.exports.getUsuario = function(req,res){
    let promise = Usuario.find({},{'senha':0}).exec();
    promise.then(
        function(usuario) {
            res.json(usuario);
        }
    ).catch(
        function(){
            res.status(404).send('Nao existe');
        }
    )
}

module.exports.insertUsuario = function(req, res){
    let usuario = new Usuario({
        nome:req.body.nome,
        email:req.body.email,
        senha:bcrypt.hashSync(req.body.senha, 10)
    })
    let promise = Usuario.create(usuario);
    promise.then(
        function(usuario){
            res.status(201).json({
                id: usuario._id,
                nome:usuario.nome,
                email:usuario.email
            });
        }
    ).catch(
        function(error){
            res.status(404).send('Nao existe');
        }
    )
}
module.exports.getUsuarioId= function(req, res){
    let id = req.params.id;
    let promise = Usuario.findById(id).exec();
    promise.then(
        function(usuario){
            res.status(201).json({
                id:usuario._id,
                nome:usuario.nome,
                email:usuario.email
            });

        }
    ).catch(
        function(error){
            res.status(404).send("nao deu certo")
        }
    )
}
module.exports.deletarUsuario = function(req, res){
    let payload = jwt.decode(req.query.token);
    let promise = Usuario.remove({'_id':payload.id});
    promise.then(
        function(usuario){
            res.status(201).json('usuario removido');
        }
    ).catch(
        function(error){
            res.status(404).send("usuario não removido")
        }
    )
    

}

module.exports.modificarUsuario = function(req, res){
    let payload = jwt.decode(req.query.token);
    let usuario = new Usuario({
        _id:payload.id,
        nome:req.body.nome,
        email:req.body.email,
        senha:req.body.senha

    });
    let promise = Usuario.findByIdAndUpdate(payload.id, usuario).exec();
    promise.then(
        function(usuario){
            res.status(201).json({
                id:usuario._id,
                nome:usuario.nome,
                email: usuario.email


            });
        }
    ).catch(
        function(erro){
            res.status(404).send(erro);
        }
    )
    

}
module.exports.Post_Usuario = function(req, res) {
    let id = req.params.id;
    let promise = Post.find({"uid": id}).exec();
    promise.then(
        function(posts){
            res.status(201).json(posts);
        }
    ).catch(
        function(erro){
            res.status(404).send("Posts não encontrado");
        }
    )
}


