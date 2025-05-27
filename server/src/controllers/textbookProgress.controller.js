const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create progress record
exports.createProgress = async (req, res) => {
  try {
    const { classId, subjectId, teacherId, topic, date, notes } = req.body;

    const progress = await prisma.textbookProgress.create({
      data: {
        classId,
        subjectId,
        teacherId,
        topic,
        date: date ? new Date(date) : new Date(),
        notes,
      },
    });

    res.status(201).json(progress);
  } catch (err) {
    console.error("Create Progress Error:", err);
    res.status(500).json({ error: "Failed to record progress" });
  }
};

// Get all progress logs
exports.getAllProgress = async (req, res) => {
  try {
    const progressList = await prisma.textbookProgress.findMany({
      include: {
        class: true,
        subject: true,
        teacher: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    res.status(200).json(progressList);
  } catch (err) {
    console.error("Get Progress Error:", err);
    res.status(500).json({ error: "Failed to fetch progress logs" });
  }
};

// Update progress log
exports.updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, notes, date } = req.body;

    const updated = await prisma.textbookProgress.update({
      where: { id },
      data: {
        topic,
        notes,
        date: date ? new Date(date) : undefined,
      },
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Progress Error:", err);
    res.status(500).json({ error: "Failed to update progress" });
  }
};

// Delete progress log
exports.deleteProgress = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.textbookProgress.delete({ where: { id } });

    res.status(200).json({ message: "Progress log deleted" });
  } catch (err) {
    console.error("Delete Progress Error:", err);
    res.status(500).json({ error: "Failed to delete progress log" });
  }
};
