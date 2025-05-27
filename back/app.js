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

//Models
const User = require('./models/Users');
const Project = require('./models/Projects');
const TestCase = require('./models/TestCase');
const TestPlan = require('./models/TestPlan');

//Importação das rotas
const loginUsuario = require('./routes/loginUsuario');
const mockUsers = require('./routes/mockUsers');
const createUser = require('./routes/createUser');
const editUser = require('./routes/editUser');
const deleteUser = require('./routes/deleteUser');
const createProject = require('./routes/createProject');
const editProject = require('./routes/editProject');
const deleteProject = require('./routes/deleteProject');
const mockProjects = require('./routes/mockProjects');
const mockTestCases =  require('./routes/mockTestCases')

// Relacionamentos
Project.hasMany(TestCase, { foreignKey: 'projectId' });
TestCase.belongsTo(Project, { foreignKey: 'projectId' });

Project.hasMany(TestPlan, { foreignKey: 'projectId' });
TestPlan.belongsTo(Project, { foreignKey: 'projectId' });

User.hasMany(TestCase, { foreignKey: 'createdBy' });
TestCase.belongsTo(User, { foreignKey: 'createdBy' });

User.hasMany(TestPlan, { foreignKey: 'createdBy' });
TestPlan.belongsTo(User, { foreignKey: 'createdBy' });

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

//Rota para mostrar Casos de teste
app.use('/', mockTestCases);

app.listen(port, ()=>{
    console.log(`Servidor rodando http://localhost:${port}`)
})