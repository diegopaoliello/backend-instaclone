const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//Cria a aplicação
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);


require('dotenv/config');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
});


//Iniciando conexao com banco de dados MongoDB
// mongoose.connect('mongodb://localhost:27017/nodeapi', { useNewUrlParser: true});


app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use( require('./routes'));

server.listen(3333);


