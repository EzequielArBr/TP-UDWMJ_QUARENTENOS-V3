const mongoose = require('mongoose');

const lembreteSchema = mongoose.Schema({
    titulo: { type: String, required: true },
    dataCadastro: { type: Date, required: true },
    dataPrevista: { type: Date, required: true},
    atividade: { type: String, required: true }
});

module.exports = mongoose.model('Lembrete', lembreteSchema);