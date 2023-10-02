
const bancodedados = require('../bancodedados')
const agora = new Date().toLocaleString().split(',').join('')


const listaConta = ( req , res ) => {
   const { senha_banco } = req.query
   if(!senha_banco){
      res.status(400).json({mensagem: 'A senha do banco informada é inválida!'})
   }
   if(senha_banco !== bancodedados.banco.senha){
      res.status(400).json({mensagem: 'A senha do banco informada é inválida!'})
   }

   return res.status(200).json(bancodedados.contas)
}

const cadastrarCliente = ( req, res) => {
     const {nome,cpf,data_nascimento,telefone , email, senha} = req.body

      const verificarCpf= bancodedados.contas.find((ver) => {{
         return ver.usuario.cpf == cpf
      }})
      const verificarEmail= bancodedados.contas.find((ver) => {{
         return ver.usuario.email == email
      }})


     if(!nome || !cpf || !data_nascimento || !telefone || !email || !senha){
        return res.status(400).json({mensagem: 'falta informação'})
     }
     
     if(verificarCpf || verificarEmail){
      return res.status(400).json({mensagem: 'Já existe uma conta com o cpf ou e-mail informado!'})
     }
     
     const conta={
        numero:bancodedados.contas.length+1,
        saldo:0,
        usuario:{
         nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
        }
     }
     bancodedados.contas.push(conta)
     res.status(201).json()


}
const atualizarCliente = ( req, res ) => {
   const {nome, cpf , data_nascimento,telefone , email , senha } = req.body
   const { numeroConta } = req.params
   
   let verificarConta = bancodedados.contas.findIndex((verificar) => {
      return verificar.numero === Number(numeroConta)
   })

   const verificarCpf = bancodedados.contas.find(({usuario})  =>{
      return usuario.cpf == cpf
   })

   const verificarEmail = bancodedados.contas.find(({usuario})=>{
      return usuario.email == email
   })
   if(!nome || !cpf || !data_nascimento || !telefone|| !email ||!senha){
      return res.status(400).json('preencha todos os dados')
   }
   if(verificarConta === -1){
      return res.status(400).json({mensagem: 'não existe conta'})
   }
   if(verificarCpf || verificarEmail){
      return res.status(400).json({mensagem: 'cpf existe ou email existe'})
   }
   
   bancodedados.contas[verificarConta].usuario={
      ...bancodedados.contas[verificarConta].usuario,
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha
   }
   return res.status(204).end()
}
const deletaConta = (req,res) =>{
   const { numeroConta } = req.params

   const deletar = bancodedados.contas.find((conta)=>{
      return conta.numero == numeroConta
   })
   const deletarIndice=bancodedados.contas.findIndex((conta)=>{
      return conta.numero == numeroConta
   })
   if(!deletar){
      return res.status(400).json({mensagem: 'não existe conta'})
   }if(deletar.saldo >0){
      return res.status(400).json({mensagem: 'Não é possivel excluir conta'})
   }
   bancodedados.contas.splice(deletarIndice,1)
   return res.status(203).json(bancodedados.contas)

}

const depositar=(req, res) =>{
   const { numero_conta, valor} = req.body

   let acharConta = bancodedados.contas.find((conta)=>{
      return conta.numero == +numero_conta
   })
    if(!valor){
      return res.status(400).json('é preciso colocar o valor')
   }
   if(valor<=0){
      return res.status(400).json({mensagem: 'só é possivel depositar acima de 0'})
   }
   if(!acharConta){
        return res.status(400).json({mensagem: 'não foi encontrado nenhuma conta'})
   }

   

   
   const registrarDeposito={
      data: agora,
      numero_conta: +numero_conta,
      valor: valor
   }
   
  
   bancodedados.depositos.push(registrarDeposito)
   acharConta.saldo=valor
   return res.status(200).json({mensagem: 'Depósito realizado com sucesso'})

}

const sacar = (req, res)=> {
   const { numero_conta, valor, senha } = req.body
   const acharConta = bancodedados.contas.find((encontrar) => {
      return encontrar.numero == numero_conta
   })
   if(!numero_conta || !valor || !senha){
      return res.status(400).json({mensagem: 'Preencha todos os campo'})
   }
   if(!acharConta){
      return res.status(404).json({mensagem: 'não foi encontrado nenhuma conta'})
   }
   if(acharConta.usuario.senha != senha){
      return res.status(400).json({mensagem: 'Senha incorreta'})
   }if(acharConta.saldo<=0){
      acharConta.saldo=0
      return res.status(400).json({mensagme: 'seu saldo é 0'})
   }
   if(acharConta.saldo < valor){
      return res.status(400).json({mensagem: 'Valor da solda insuficiente'})
   }
   acharConta.saldo-=valor
   const registrarSaque={
      data:agora,
      numero_conta: +numero_conta,
      valor
   }
   bancodedados.saques.push(registrarSaque)
   return  res.json({mensagem: `o valor sacado foi ${valor/100}`})

}

const tranferir = (req, res)=> {
   const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body
   const verificarContaOrigem=bancodedados.contas.find((verificar)=>{
      return verificar.numero == +numero_conta_origem
   })
   
   const verificarContaDestino= bancodedados.contas.find((verificar) => {
       return verificar.numero == +numero_conta_destino
   })

   if(!numero_conta_origem || !numero_conta_destino || !valor || !senha){
      return res.status(400).json({mensagem: 'Preencha todos os campo'})
   }
   if(!verificarContaOrigem){
      return res.status(404).json({mensagem: 'não existe a conta de origem'})
   }if (!verificarContaDestino){
      return res.status(404).json({mensagem: 'não existe a conta de destino'})
   }

   if(verificarContaOrigem.usuario.senha != senha){
      return res.status(400).json({mensagem: 'senha incorreta'})
   }
   

   if(verificarContaOrigem.saldo<valor){
      return res.status(400).json({mensagem: 'saldo insuficiente'})
   }
   const transferenciaAtual={
      data: agora,
      numero_conta_origem: +numero_conta_origem,
      numero_conta_destino:+numero_conta_destino,
      valor
  }
 
   verificarContaOrigem.saldo-=valor
   verificarContaDestino.saldo+=valor

  bancodedados.transferencias.push(transferenciaAtual)
  

   return res.status(200).json()
}
const saldo = ( req , res ) => {
   const { numero_conta , senha } = req.query
   
   const verificarConta= bancodedados.contas.find((verificar) => {
      return verificar.numero == numero_conta
   })
   if(!numero_conta || !senha){
      return res.status(400).json({mensagem: 'Falta informaçao'})
   }
   if(!verificarConta){
      return res.status(400).json({mensagem: 'Conta bancária não encontada!'})
   }

   if(verificarConta.usuario.senha !== senha){
      return res.status(400).json({mensagem: 'senha incorreta'})
   }
   return  res.status(200).json({saldo: verificarConta.saldo})
}
const extrato = ( req , res ) => {
   const { numero_conta , senha } = req.query
   const verificarConta= bancodedados.contas.find((verificar) => {
         return verificar.numero === +numero_conta
   })   
      if(!numero_conta || !senha){
         return res.status(400).json({mensagem: 'preencha todos os campos'})
      }
      if(!verificarConta){
         return res.status(400).json({mensagem: 'não existe conta'})
      }
      if(verificarConta.usuario.senha != senha){
         return res.status(400).json({mensagem: 'senha incorreta'})
      }

     const depositos=bancodedados.depositos.filter((depositoAtual)=>{
         return depositoAtual.numero_conta === +numero_conta
     })
     const saques=bancodedados.saques.filter((saqueAtual)=>{
      return saqueAtual.numero_conta === +numero_conta
   })
   const transferenciasEnviadas=bancodedados.transferencias.filter((transferenciaAtual)=>{
   return transferenciaAtual.numero_conta_origem === +numero_conta
   })
   const transferenciasRecebidas=bancodedados.transferencias.filter((transferenciaAtual)=>{
         return transferenciaAtual.numero_conta_destino === +numero_conta
     })



    return res.status(200).json({
         depositos: depositos,
         saques: saques,
         transferenciasEnviadas: transferenciasEnviadas,
         transferenciasRecebidas: transferenciasRecebidas
      })
}

module.exports= {listaConta, cadastrarCliente, atualizarCliente, deletaConta, depositar, sacar, tranferir, saldo, extrato}

