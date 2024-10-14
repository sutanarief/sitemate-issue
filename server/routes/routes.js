const { Router } = require('express');
const issue = require('../controllers/issueController'); 

const router = Router();

// Example route
router.get('/', issue.getIssue);
router.post('/', issue.createIssue);
router.put('/:id', issue.editIssue);
router.delete('/:id', issue.deleteIssue);


module.exports  = router