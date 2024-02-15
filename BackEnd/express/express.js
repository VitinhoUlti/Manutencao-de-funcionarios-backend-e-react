const express = require('express');
const app = express();
const porta = 3001;

app.get('/', (req, res) => {
    res.send("vitor é legal")
});

app.get('/1', (req, res) => {
    res.send("Elson é legal")
});

app.listen(porta, () => {
    console.log(`Servidor Rodando em http://localhost:${porta}`);
});

app.use(express.json());
app.post('/filmes', (req, res) => {
    const {titulo, genero} = req.body;
    res.send(`Filme: ${titulo} - ${genero}`);
})

const amigos = require('./amigos');
app.use('/amigos', amigos);