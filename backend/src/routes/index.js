const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/userController');
const roleController = require('../controllers/roleController');
const permissionController = require('../controllers/permissionController');
const authController = require('../controllers/authController');

// Middlewares
const auth = require('../middlewares/auth');
const rbac = require('../middlewares/rbac');
const isAdmin = require('../middlewares/isAdmin');

// LMS Routes
const courseRoutes = require('./course');
const sectionRoutes = require('./section');
const quizRoutes = require('./quiz');

router.use('/courses', courseRoutes);
router.use('/sections', sectionRoutes);
router.use('/quizzes', quizRoutes);

// User & Auth
router.post('/login', authController.login);
router.post('/register', userController.register);
router.get('/users', auth, isAdmin, userController.getAll);
router.post('/users/assign-role', auth, isAdmin, userController.assignRole);

// Role & Permission
router.post('/roles', auth, isAdmin, roleController.create);
router.get('/roles', auth, isAdmin, roleController.getAll);
router.post('/roles/assign-permission', auth, isAdmin, roleController.assignPermission);
router.post('/permissions', auth, isAdmin, permissionController.create);
router.get('/permissions', auth, isAdmin, permissionController.getAll);

// Example protected route
router.get('/protected', auth, rbac('view_protected'), (req, res) => {
  res.json({ message: 'You have access to protected route!' });
});


module.exports = router;
