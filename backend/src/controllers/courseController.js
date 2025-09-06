const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

module.exports = {
  async getAll(req, res) {
    const courses = await Course.findAll();
    res.json(courses);
  },
  async getById(req, res) {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  },
  async create(req, res) {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  },
  async update(req, res) {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    await course.update(req.body);
    res.json(course);
  },
  async delete(req, res) {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    await course.destroy();
    res.json({ message: 'Course deleted' });
  },
  async enroll(req, res) {
    // siswa join course
    const { user_id } = req.body;
    const course_id = req.params.id;
    const enrollment = await Enrollment.create({ user_id, course_id, status: 'active', progress_pct: 0 });
    res.status(201).json(enrollment);
  }
};
