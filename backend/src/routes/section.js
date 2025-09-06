const express = require('express');
const router = express.Router({ mergeParams: true });
const sectionController = require('../controllers/sectionController');
const { isAdmin, isGuru } = require('../middlewares/roles');

router.get('/:course_id', sectionController.getAll);
router.get('/detail/:id', sectionController.getById);
router.post('/:course_id', isGuru, sectionController.create);
router.put('/detail/:id', isGuru, sectionController.update);
router.delete('/detail/:id', isAdmin, sectionController.delete);

module.exports = router;
