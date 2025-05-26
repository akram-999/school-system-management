const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



exports.createCycle = async (req, res) => {
    try {
      const { name, startDate, endDate, schoolId } = req.body;
      const cycle = await prisma.cycle.create({
        data: {
          name,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          school: { connect: { id: schoolId } }
        }
      });
      res.json(cycle);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getCycles = async (req, res) => {
    try {
      const cycles = await prisma.cycle.findMany({ include: { school: true } });
      res.json(cycles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateCycle = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, startDate, endDate } = req.body;
      const cycle = await prisma.cycle.update({
        where: { id },
        data: {
          name,
          startDate: new Date(startDate),
          endDate: new Date(endDate)
        }
      });
      res.json(cycle);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteCycle = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.cycle.delete({ where: { id } });
      res.json({ message: "Cycle deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };