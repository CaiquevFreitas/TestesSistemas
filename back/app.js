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
const User = require('./User');
const Project = require('./Project');
const TestCase = require('./TestCase');
const TestPlan = require('./TestPlan');

// Relacionamentos
Project.hasMany(TestCase, { foreignKey: 'projectId' });
TestCase.belongsTo(Project, { foreignKey: 'projectId' });

Project.hasMany(TestPlan, { foreignKey: 'projectId' });
TestPlan.belongsTo(Project, { foreignKey: 'projectId' });

User.hasMany(TestCase, { foreignKey: 'createdBy' });
TestCase.belongsTo(User, { foreignKey: 'createdBy' });

User.hasMany(TestPlan, { foreignKey: 'createdBy' });
TestPlan.belongsTo(User, { foreignKey: 'createdBy' });




app.listen(port, ()=>{
    console.log(`Servidor rodando http://localhost:${port}`)
})