const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



exports.createStudent = async (req, res) => {
    try {
      const { userId, schoolId } = req.body;
      const student = await prisma.student.create({
        data: {
          id: userId,
          school: { connect: { id: schoolId } }
        }
      });
      res.json(student);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getStudents = async (req, res) => {
    try {
      const students = await prisma.student.findMany({ include: { user: true, school: true } });
      res.json(students);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateStudent = async (req, res) => {
    try {
      const { id } = req.params;
      const { schoolId } = req.body;
      const student = await prisma.student.update({
        where: { id },
        data: { school: { connect: { id: schoolId } } },
      });
      res.json(student);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteStudent = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.student.delete({ where: { id } });
      res.json({ message: "Student deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  