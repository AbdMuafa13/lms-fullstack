const Quiz = require('../models/Quiz');

module.exports = {
  async getAll(req, res) {
    const quizzes = await Quiz.findAll({ where: { lesson_id: req.params.lesson_id } });
    res.json(quizzes);
  },
  async getById(req, res) {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  },
  async create(req, res) {
    const quiz = await Quiz.create({ ...req.body, lesson_id: req.params.lesson_id });
    res.status(201).json(quiz);
  },
  async update(req, res) {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    await quiz.update(req.body);
    res.json(quiz);
  },
  async delete(req, res) {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    await quiz.destroy();
    res.json({ message: 'Quiz deleted' });
  }
};
