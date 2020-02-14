const express = require('express');

const actionRouter = require('./actions/actionRouter')
const projectRouter = require('./project/projectRouter')

const server = express();

server.use(express.json())

server.get('/', (req,res)=>{
  res.send('<h1>*** Let\'s get started! ***</h1>')
})

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

module.exports = server;