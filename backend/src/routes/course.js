const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { isAdmin, isGuru, isMurid } = require('../middlewares/roles');

router.get('/', courseController.getAll);
router.get('/:id', courseController.getById);
router.post('/', isGuru, courseController.create);
router.put('/:id', isGuru, courseController.update);
router.delete('/:id', isAdmin, courseController.delete);
router.post('/:id/enroll', isMurid, courseController.enroll);

module.exports = router;
