const express = require('express');
const router = express.Router({ mergeParams: true });
const quizController = require('../controllers/quizController');
const { isAdmin, isGuru } = require('../middlewares/roles');

router.get('/:lesson_id', quizController.getAll);
router.get('/detail/:id', quizController.getById);
router.post('/:lesson_id', isGuru, quizController.create);
router.put('/detail/:id', isGuru, quizController.update);
router.delete('/detail/:id', isAdmin, quizController.delete);

module.exports = router;
