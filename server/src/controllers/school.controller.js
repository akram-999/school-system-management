const prisma = new PrismaClient();

exports.createSchool = async (req, res) => {
  try {
    const { name, address } = req.body;
    const school = await prisma.school.create({
      data: { name, address },
    });
    res.json(school);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSchools = async (req, res) => {
  try {
    const schools = await prisma.school.findMany();
    res.json(schools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;
    const school = await prisma.school.update({
      where: { id },
      data: { name, address },
    });
    res.json(school);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.school.delete({ where: { id } });
    res.json({ message: "School deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

