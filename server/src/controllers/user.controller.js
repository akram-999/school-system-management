exports.createUser = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const user = await prisma.user.create({
        data: { email, password, role },
      });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password, role } = req.body;
      const user = await prisma.user.update({
        where: { id },
        data: { email, password, role },
      });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.user.delete({ where: { id } });
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };