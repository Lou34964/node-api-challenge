const router = require('express').Router();

const actionDB = require('../data/helpers/actionModel');
const projectDB = require('../data/helpers/projectModel');

router.get('/:id', (req,res)=>{
  actionDB.get(req.params.id)
    .then(act => res.status(200).json(act))
    .catch(err => {console.log(err); res.status(500).json({errorMessage: 'There was an error retrieving action', error: err});
    })
})

router.post('/', (req, res) => {  
  projectDB.get(req.body.project_id)
    .then(project => {
      if(!project){
        res.status(500).json({ error: 'Sorry, can\'t find that project. Try again.'})
      }
      actionDB.insert(req.body)
        .then(action => res.status(200).json(action))
        .catch(err => {console.log(err); res.status(500).json({error: 'Error adding action.' })})
    })
    .catch(err => {console.log(err); res.status(500).json({error: 'Error adding action.' })})
})

router.put('/:id', (req, res) => {
  actionDB.update(req.params.id, req.body)
    .then(action => res.status(200).json(action))
    .catch(err => {console.log(err); res.status(500).json({ error: 'There was an error updating the action' })})
})

router.delete('/:id', (req, res) => {
  actionDB.remove(req.params.id)
    .then(action => res.status(201).json(action))
    .catch(err => {console.log(err); res.status(500).json({ error: 'There was an error removing the action' })})
})

module.exports = router;