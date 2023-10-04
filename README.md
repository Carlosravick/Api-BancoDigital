# API do Banco Digital
Este repositório contém uma API para um banco digital que permite realizar operações bancárias, como criar contas, efetuar transferências, verificar saldo e mais. A API foi desenvolvida em JAVASCRIPT e utiliza EXPRESS para simplificar a construção e o gerenciamento.

## Execução da Aplicação  
### Passo a Passo  
1. Clonar o projeto:
```bash
git clone https://github.com/Carlosravick/Api-BancoDigital.git
```  
2. Abrir a pasta do projeto:
```bash
cd 
```  
3. Instalar dependências:  
```bash
npm install
```  
4. Inicializar o servidor:
```bash
npm run dev
```  
### Teste de funcionalidades  
A aplicação estará disponível no endereço local: `http://localhost:3000`. Suas funcionalidades podem ser testadas com as rotas mencionadas abaixo.

![](./img/rotas.png) 

-   Criar conta bancária: esse endpoint cria uma conta bancária, onde será gerado um número único para identificação da conta (número da conta). 
##### `POST` `/contas`  

-   Listar contas bancárias: esse endpoint lista todas as contas bancárias existentes.  
##### `GET` `/contas?senha_banco=Cubos123Bank`  

-   Atualizar os dados do usuário da conta bancária: esse endpoint atualiza apenas os dados do usuário de uma conta bancária.  
##### `PUT` `/contas/:numeroConta/usuario`  
##### Exemplo de Requisição

-   Excluir uma conta bancária: esse endpoint esclui uma conta bancária existente.  
##### `DELETE` `/contas/:numeroConta`  

-   Depósitar em uma conta bancária: esse endpoint soma o valor do depósito ao saldo de uma conta válida e registra essa transação.  
##### `POST` `/transacoes/depositar`  

-   Sacar de uma conta bancária: esse endpoint realiza o saque de um valor em uma determinada conta bancária e registra essa transação.  
##### `POST` `/transacoes/sacar`  

-   Transferir valores entre contas bancárias: esse endpoint deverá permite a transferência de recursos (dinheiro) de uma conta bancária para outra e registra essa transação.  
##### `POST` `/transacoes/transferir`  

-   Consultar saldo da conta bancária: esse endpoint retorna o saldo de uma conta bancária.  
##### `GET` `/contas/saldo?numero_conta=123&senha=123`  

-   Emitir extrato bancário: esse endpoint lista as transações realizadas de uma conta específica.  
##### `GET` `/contas/extrato?numero_conta=123&senha=123`  


Rotas importadas no Insomnia:  
![](./img/insomnia.png)  

A persistência dos dados ocorre em memória, no objeto existente dentro do arquivo `bancodedados.js`.  


