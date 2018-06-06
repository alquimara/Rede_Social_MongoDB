let controller = require('../controllers/usuarios')
let auth = require('../controllers/auth');

module.exports = function(app){
    app.post('/api/usuarios/singin', auth.logar); 
    app.post('/api/usuarios', controller.insertUsuario);  
    app.use('/api/usuarios/',auth.checar);
    app.get('/api/usuarios', controller.getUsuario);
    app.get('/api/usuarios/:id', controller.getUsuarioId);
    app.delete('/api/usuarios', controller.deletarUsuario);
    app.put('/api/usuarios', controller.modificarUsuario);
    app.get('/api/usuarios/:id/posts', controller.Post_Usuario);

}