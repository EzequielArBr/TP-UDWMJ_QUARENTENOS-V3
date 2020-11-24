const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Lembrete = require('./models/lembrete')
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://quarentenos:quarentenos1234@cluster0.0t6ty.mongodb.net/Cliente?retryWrites=true&w=majority').then(() => {
    console.log("Conexão OK")
}).catch(() => {
    console.log("Conexão NOK")
});

app.use(express.json());

const lembretes = [{
        id: '1',
        titulo: 'Comprar Folhas A4',
        dataCadastro: '',
        dataPrevista: '',
        atividade: 'Ir na libraria e comprar folhas A4'
    },
    {
        id: '2',
        titulo: 'Fechar conta Itau',
        dataCadastro: '',
        dataPrevista: '',
        atividade: 'Ir no banco Itau de Butantâ e fechar a conta 342 31 515151'
    },
    {
        id: '3',
        titulo: 'encaminhar e-mail',
        dataCadastro: '',
        dataPrevista: '',
        atividade: 'Encaminhar e-mail de cortesia para cliente do supermercado'
    }
];

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next()
});


//http://localhost:3000/api/lembretes
app.get('/api/lembretes', (req, res, next) => {
    Lembrete.find().then(documents => {
            console.log (documents)
            res.status(200).json({
                mensagem: "Tudo ok",
                lembretes: documents
            });
        })
})

app.post('/api/lembretes', (req, res, next) => {
    const lembrete = new Lembrete({
        titulo: req.body.titulo,
        dataCadastro: req.body.dataCadastro,
        dataPrevista: req.body.dataPrevista,
        atividade: req.body.atividade
    })
    lembrete.save();
    then (lembreteInserido => {
        res.status(201).json({
        mensagem: 'Lembrete inserido',
        id: lembreteInserido._id
        })
    })        
})

app.delete ('/api/lembretes/:id', (req, res, next) => {
    Lembrete.deleteOne ({_id: req.params.id}).then((resultado) => {
    console.log (req.params);
    res.status(200).json({mensagem: "Lembrete removido"})
    });
  });

module.exports = app