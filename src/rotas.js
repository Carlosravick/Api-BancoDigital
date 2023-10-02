const { Router } = require('express')
const rotas = Router()
const {listaConta,cadastrarCliente, atualizarCliente, deletaConta, depositar, sacar, tranferir,saldo,extrato}  = require ('./controladores/recurso')
const verificar= require('./intermediador')


rotas.get('/contas', verificar, listaConta);
rotas.post('/contas', cadastrarCliente)
rotas.put('/contas/:numeroConta/usuario', atualizarCliente )
rotas.delete('/contas/:numeroConta', deletaConta )
rotas.post('/transacoes/depositar', depositar)
rotas.post('/transacoes/sacar' , sacar )
rotas.post('/transacoes/transferir', tranferir )
rotas.get('/contas/saldo',saldo)
rotas.get('/contas/extrato', extrato )



module.exports=rotas