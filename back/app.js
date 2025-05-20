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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        // Autenticação simples: compara senha em texto puro
        if (user.senha !== password) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        // Retorna apenas os campos necessários
        const { id, nome, email: userEmail, cargo } = user;

        return res.json({
            id,
            name: nome,
            email: userEmail,
            role: cargo
        });

    } catch (err) {
        console.error('Erro ao tentar login:', err);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
});



app.listen(port, ()=>{
    console.log(`Servidor rodando http://localhost:${port}`)
})