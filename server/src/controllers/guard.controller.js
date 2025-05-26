const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.createGuard = async (req, res) => {
    try {
      const { userId, schoolId } = req.body;
      const guard = await prisma.guard.create({
        data: {
          id: userId,
          school: { connect: { id: schoolId } }
        }
      });
      res.json(guard);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getGuards = async (req, res) => {
    try {
      const guards = await prisma.guard.findMany({ include: { user: true, school: true } });
      res.json(guards);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateGuard = async (req, res) => {
    try {
      const { id } = req.params;
      const { schoolId } = req.body;
      const guard = await prisma.guard.update({
        where: { id },
        data: { school: { connect: { id: schoolId } } },
      });
      res.json(guard);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteGuard = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.guard.delete({ where: { id } });
      res.json({ message: "Guard deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  