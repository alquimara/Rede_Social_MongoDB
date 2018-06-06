let Post = require('../models/post');
let Usuario = require('../models/usuario');
let jwt = require('jsonwebtoken');

module.exports.getPosts = function(req,res){
    let promise = Post.find().exec();

    promise.then(
        function(posts) {
            res.status(201).json(posts);
        }
    ).catch(
        function(erro){
            res.status(404).send(erro);
        }
    )
}

module.exports.insertPost = function(req, res){
    let payload = jwt.decode(req.query.token);
    let post = new Post({
        texto:req.body.texto,
        likes:req.body.likes,
        uid:payload.id
    });
    let promise = Post.create(post);
    promise.then(
        function(post){
            res.status(201).json(post);
        }
    ).catch(
        function(erro){
            res.status(404).send(erro);
        }
    )
}
module.exports.getPostsId= function(req, res){
    let id = req.params.id;
    console.log(req.body);
    
    let promise = Post.findById(id).exec();
    promise.then(
        function(post){
            res.status(201).json(post);

        }
    ).catch(
        function(error){
            res.status(404).send("post não encontrado")
        }
    )
}
module.exports.deletarPost = function(req, res){
    let id = req.params.id;
    let payload = jwt.decode(req.query.token);
    let promise =Post.findById(id).exec();
    promise.then(
        function(post){
            let uid=post.uid;
            console.log(post.uid);
            console.log(payload.id);
            (function(){
                if(payload.id == uid){
                    let promise1 = Post.findByIdAndRemove(id);
                    promise1.then(
                        function(post){
                            res.status(200).json(post);
                        },
                        function(erro){
                            res.status(500).json(erro);
                        }
                    )
                }else{
                    res.status(401).send("usuario invalido")
                }
            })();
        },
        function(erro){
            res.status(404).send("post nao encotrado");
        }
    )
    
   

};
module.exports.modificarPost = function(req, res){
    let payload = jwt.decode(req.query.token);
    let id = req.params.id;
    let post = new Post({
        texto: req.body.texto,
        likes: req.body.likes,
        uid: payload.id,
        _id: id
    });
    let promise = Post.findById(id);
    promise.then(
        function(post){
            uid = post.uid;
            (function(){
                if(uid == payload.id){
                    let promise1 = Post.update(Post.findById(id),req.body);
                    promise1.then(
                        function(pos){
                            res.json(post)
                        },
                        function(erro){
                            res.status(404).send("post não encontrado");
                        }
                    )

                }else{
                    res.status(401).send("usuario invalido")
                }
            })()
           
        },
        function(erro){
            res.status(404).json("não encontrado")
        }
    )
    
    

}
module.exports.Usuario_Post = function(req, res) {
    let id = req.params.id;
    let promise = Post.findById(id).populate("uid", "-senha").exec();
    promise.then(
        function(post){
            res.json(post.uid);
        }
    ).catch(
        function(erro){
            res.status(404).send("Usuário não tem posts.");
        }
    )
}