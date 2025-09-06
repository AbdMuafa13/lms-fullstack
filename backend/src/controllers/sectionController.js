const Section = require('../models/Section');

module.exports = {
  async getAll(req, res) {
    const sections = await Section.findAll({ where: { course_id: req.params.course_id } });
    res.json(sections);
  },
  async getById(req, res) {
    const section = await Section.findByPk(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });
    res.json(section);
  },
  async create(req, res) {
    const section = await Section.create({ ...req.body, course_id: req.params.course_id });
    res.status(201).json(section);
  },
  async update(req, res) {
    const section = await Section.findByPk(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });
    await section.update(req.body);
    res.json(section);
  },
  async delete(req, res) {
    const section = await Section.findByPk(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });
    await section.destroy();
    res.json({ message: 'Section deleted' });
  }
};
