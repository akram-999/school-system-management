const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



exports.createSubject = async (req, res) => {
    try {
      const { name, code, schoolId } = req.body;
      const subject = await prisma.subject.create({
        data: {
          name,
          code,
          school: { connect: { id: schoolId } }
        }
      });
      res.json(subject);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getSubjects = async (req, res) => {
    try {
      const subjects = await prisma.subject.findMany({ include: { school: true } });
      res.json(subjects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateSubject = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, code } = req.body;
      const subject = await prisma.subject.update({
        where: { id },
        data: { name, code }
      });
      res.json(subject);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteSubject = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.subject.delete({ where: { id } });
      res.json({ message: "Subject deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };