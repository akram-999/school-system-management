const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Transportation
exports.createTransportation = async (req, res) => {
  try {
    const { name, description, driverId } = req.body;

    const transportation = await prisma.transportation.create({
      data: {
        name,
        description,
        driverId,
      },
    });

    res.status(201).json(transportation);
  } catch (err) {
    console.error("Create Transportation Error:", err);
    res.status(500).json({ error: "Failed to create transportation" });
  }
};

// Get all Transportations
exports.getTransportations = async (req, res) => {
  try {
    const list = await prisma.transportation.findMany({
      include: {
        driver: true,
        accompaniments: true,
      },
    });

    res.status(200).json(list);
  } catch (err) {
    console.error("Fetch Transportations Error:", err);
    res.status(500).json({ error: "Failed to fetch transportation list" });
  }
};

// Update Transportation
exports.updateTransportation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, driverId } = req.body;

    const updated = await prisma.transportation.update({
      where: { id },
      data: {
        name,
        description,
        driverId,
      },
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Transportation Error:", err);
    res.status(500).json({ error: "Failed to update transportation" });
  }
};

// Delete Transportation
exports.deleteTransportation = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.transportation.delete({ where: { id } });

    res.status(200).json({ message: "Transportation deleted" });
  } catch (err) {
    console.error("Delete Transportation Error:", err);
    res.status(500).json({ error: "Failed to delete transportation" });
  }
};
