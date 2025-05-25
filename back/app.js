const express = require('express');
const cors = require('cors');
const Usuario = require('./models/Users');
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
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        if (user.senha !== password) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (err) {
        console.error('Erro ao tentar login:', err);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

//Rota para mostrar usuários
app.get('/mockUsers', async (req,res)=>{
    try {
    const users = await User.findAll();
    res.status(200).json(users); 
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Usuários não encontrados' });
  }
})

//Rota para cadastrar usuário
app.post('/createUser', async(req,res)=>{
    const {name, email, role, active, password, createdAt} = req.body;
    console.log(name, email, role, password, createdAt)

    try {
        const verificEmail = await User.findOne({ where: { email } });

        if(verificEmail){
            return res.json({ message: 'Email já cadastrado' });
        }
        const newUser = {
            name,
            email,
            role,
            senha: password,
            createdAt
        }
        await  User.create(newUser);
        res.status(200).json({message: 'Usuário criado'})
    } catch (error) {
        res.status(503).json({erro: error.message})
    }
})

app.listen(port, ()=>{
    console.log(`Servidor rodando http://localhost:${port}`)
})