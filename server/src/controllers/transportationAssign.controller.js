const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Assign a student to transportation
exports.assignStudentToTransportation = async (req, res) => {
  try {
    const { studentId, transportationId } = req.body;

    await prisma.studentTransportation.create({
      data: {
        studentId,
        transportationId,
      },
    });

    res.status(200).json({ message: "Student assigned to transportation" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Assignment failed" });
  }
};

// Remove a student from transportation
exports.removeStudentFromTransportation = async (req, res) => {
  try {
    const { studentId, transportationId } = req.body;

    await prisma.studentTransportation.delete({
      where: {
        studentId_transportationId: {
          studentId,
          transportationId,
        },
      },
    });

    res.status(200).json({ message: "Student removed from transportation" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Removal failed" });
  }
};

// Assign accompaniment to transportation
exports.assignAccompaniment = async (req, res) => {
  try {
    const { accompanimentId, transportationId } = req.body;

    const updated = await prisma.accompaniment.update({
      where: { id: accompanimentId },
      data: { transportationId },
    });

    res.status(200).json({ message: "Accompaniment assigned", updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to assign accompaniment" });
  }
};

// Remove accompaniment from transportation
exports.removeAccompaniment = async (req, res) => {
  try {
    const { accompanimentId } = req.body;

    const updated = await prisma.accompaniment.update({
      where: { id: accompanimentId },
      data: { transportationId: null },
    });

    res.status(200).json({ message: "Accompaniment unassigned", updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove accompaniment" });
  }
};
