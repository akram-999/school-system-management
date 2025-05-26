const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createSchoolAdmin = async (req, res) => {
    try {
      const { userId, schoolId } = req.body;
      const schoolAdmin = await prisma.schoolAdmin.create({
        data: {
          id: userId,
          school: { connect: { id: schoolId } }
        }
      });
      res.json(schoolAdmin);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getSchoolAdmins = async (req, res) => {
    try {
      const schoolAdmins = await prisma.schoolAdmin.findMany({ include: { user: true, school: true } });
      res.json(schoolAdmins);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteSchoolAdmin = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.schoolAdmin.delete({ where: { id } });
      res.json({ message: "School admin deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  