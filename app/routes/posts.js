let controller = require('../controllers/posts');
let auth = require('../controllers/auth');

module.exports = function(app){  
    app.use('/api/posts', auth.checar);
    app.get('/api/posts', controller.getPosts);
    app.get('/api/posts/:id', controller.getPostsId);
    app.delete('/api/posts/:id', controller.deletarPost);
    app.put('/api/posts/:id', controller.modificarPost);
    app.get('/api/posts/:id/usuario', controller.Usuario_Post);
    app.post('/api/posts', controller.insertPost);
   
}