const express = require('express');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE','PUT'], 
    allowedHeaders: ['Content-Type'], 
  }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Importação das rotas User
const loginUsuario = require('./routes/loginUsuario');
const mockUsers = require('./routes/mockUsers');
const createUser = require('./routes/createUser');
const editUser = require('./routes/editUser');
const deleteUser = require('./routes/deleteUser');
//Importação das rotas Project
const createProject = require('./routes/createProject');
const editProject = require('./routes/editProject');
const deleteProject = require('./routes/deleteProject');
const mockProjects = require('./routes/mockProjects');
//Importação das rotas TestCase
const mockTestCases =  require('./routes/mockTestCases');
const createTestCase = require('./routes/createTestCase');
const editTestCase = require('./routes/editTestCase');

//Rota de Login de Usuários
app.use('/', loginUsuario);

//Rota para Mostrar usuários
app.use('/', mockUsers);

//Rota para Cadastrar usuário
app.use('/', createUser);

//Rota para Editar usuário
app.use('/', editUser);

//Rota para Deletar usuário
app.use('/', deleteUser);

//Rota para Mostrar projetos
app.use('/', mockProjects);

//Rota para Cadastrar projetos
app.use('/', createProject);

//Rota para Editar projetos
app.use('/', editProject);

//Rota para Deletar projetos
app.use('/', deleteProject);

//Rota para Mostrar casos de teste
app.use('/', mockTestCases);

//Rota para Criar casos de teste
app.use('/', createTestCase);

//Rota para Editar casos de teste
app.use('/', editTestCase)

app.listen(port, ()=>{
    console.log(`Servidor rodando http://localhost:${port}`)
})