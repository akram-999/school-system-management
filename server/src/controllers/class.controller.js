const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



exports.createClass = async (req, res) => {
    try {
      const { name, level, schoolId, cycleId } = req.body;
      const classItem = await prisma.class.create({
        data: {
          name,
          level,
          school: { connect: { id: schoolId } },
          cycle: { connect: { id: cycleId } }
        }
      });
      res.json(classItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getClasses = async (req, res) => {
    try {
      const classes = await prisma.class.findMany({ include: { school: true, cycle: true } });
      res.json(classes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateClass = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, level } = req.body;
      const classItem = await prisma.class.update({
        where: { id },
        data: { name, level }
      });
      res.json(classItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteClass = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.class.delete({ where: { id } });
      res.json({ message: "Class deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  