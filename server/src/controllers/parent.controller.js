const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



exports.createParent = async (req, res) => {
    try {
      const { userId, schoolId, studentIds } = req.body;
      const parent = await prisma.parent.create({
        data: {
          id: userId,
          school: { connect: { id: schoolId } },
          students: {
            connect: studentIds.map(id => ({ id }))
          }
        }
      });
      res.json(parent);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getParents = async (req, res) => {
    try {
      const parents = await prisma.parent.findMany({ include: { user: true, students: true, school: true } });
      res.json(parents);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateParent = async (req, res) => {
    try {
      const { id } = req.params;
      const { studentIds } = req.body;
      const parent = await prisma.parent.update({
        where: { id },
        data: {
          students: {
            set: studentIds.map(id => ({ id }))
          }
        }
      });
      res.json(parent);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteParent = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.parent.delete({ where: { id } });
      res.json({ message: "Parent deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  