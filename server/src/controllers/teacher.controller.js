const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.createTeacher = async (req, res) => {
    try {
      const { userId, schoolId } = req.body;
      const teacher = await prisma.teacher.create({
        data: {
          id: userId,
          school: { connect: { id: schoolId } }
        }
      });
      res.json(teacher);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getTeachers = async (req, res) => {
    try {
      const teachers = await prisma.teacher.findMany({ include: { user: true, school: true } });
      res.json(teachers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateTeacher = async (req, res) => {
    try {
      const { id } = req.params;
      const { schoolId } = req.body;
      const teacher = await prisma.teacher.update({
        where: { id },
        data: { school: { connect: { id: schoolId } } },
      });
      res.json(teacher);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteTeacher = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.teacher.delete({ where: { id } });
      res.json({ message: "Teacher deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };