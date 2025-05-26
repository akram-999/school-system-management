const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createAdmin = async (req, res) => {
    try {
      const { userId } = req.body;
      const admin = await prisma.admin.create({
        data: { id: userId },
      });
      res.json(admin);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getAdmins = async (req, res) => {
    try {
      const admins = await prisma.admin.findMany({ include: { user: true } });
      res.json(admins);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };