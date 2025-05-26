const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



exports.createDriver = async (req, res) => {
    try {
      const { userId, schoolId, transportationIds } = req.body;
      const driver = await prisma.driver.create({
        data: {
          id: userId,
          school: { connect: { id: schoolId } },
          transportations: {
            connect: transportationIds.map(id => ({ id }))
          }
        }
      });
      res.json(driver);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getDrivers = async (req, res) => {
    try {
      const drivers = await prisma.driver.findMany({ include: { user: true, school: true, transportations: true } });
      res.json(drivers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateDriver = async (req, res) => {
    try {
      const { id } = req.params;
      const { transportationIds } = req.body;
      const driver = await prisma.driver.update({
        where: { id },
        data: {
          transportations: {
            set: transportationIds.map(id => ({ id }))
          }
        }
      });
      res.json(driver);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteDriver = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.driver.delete({ where: { id } });
      res.json({ message: "Driver deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };