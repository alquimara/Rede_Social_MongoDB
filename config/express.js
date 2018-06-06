let express = require('express');
let body_parser = require('body-parser')
let path = require('path');

let routa_Usuario = require('../app/routes/usuarios');
let routa_Post = require('../app/routes/posts');


module.exports = function(){
    let app = express();
    app.set('port', 3000);
    app.use(express.static('./public'));
    app.use(body_parser.json());
    app.use(body_parser.urlencoded({extended: false}));
  
    routa_Usuario(app);
    routa_Post(app);

   

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    return app;
}

