const router = require('express').Router();

const projectDB = require('../data/helpers/projectModel');

router.get('/', (req,res) =>{
  projectDB.getList()
    .then(proj => res.status(200).json(proj))
    .catch(err => {console.log(err); res.status(500).json({errorMessage: 'There was an error retrieving a list of projects.', error: err})})
})

router.get('/:id', (req,res)=>{
  projectDB.get(req.params.id)
    .then(proj => res.status(200).json(proj))
    .catch(err => res.status(500).json({errorMessage: "There was an error while retieving project.", error:err}))
})

router.get('/:id/actions', (req,res)=>{
  projectDB.getProjectActions(req.params.id)
    .then(actions => res.status(200).json(actions))
    .catch(err => {console.log(err); res.status(500).json({errorMessage:'There was an error while retrieving project actions.', error:err})})
})

router.post('/', (req,res) =>{
  projectDB.insert(req.body)
    .then(proj => res.status(200).json(proj))
    .catch(err => {console.log(err); res.status(500).json({errorMessage: 'There was an error posting your request.', error:err})})
})

router.put("/:id", (req,res) =>{
  projectDB.update(req.params.id, req.body)
    .then(proj => res.status(200).json(proj))
    .catch(err => {console.log(err); res.status(500).json({errorMessage: 'There was an error updating the project.', error:err})})
})

router.delete('/:id', (req,res)=>{
  projectDB.remove(req.params.id)
  .then(proj => res.status(201).json(proj))
  .catch(err => {console.log(err); res.status(500).json({errorMessage: 'There was an error removing the project.', error:err})})
})

module.exports = router;