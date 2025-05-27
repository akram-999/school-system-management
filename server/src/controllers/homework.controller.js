const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Homework
exports.createHomework = async (req, res) => {
  try {
    const { title, description, dueDate, subjectId, classId } = req.body;

    const homework = await prisma.homework.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        subjectId,
        classId,
      },
    });

    res.status(201).json(homework);
  } catch (err) {
    console.error("Create Homework Error:", err);
    res.status(500).json({ error: "Failed to create homework" });
  }
};

// Get all Homework
exports.getHomework = async (req, res) => {
  try {
    const homeworkList = await prisma.homework.findMany({
      include: {
        subject: true,
        class: true,
        completions: {
          include: {
            student: true,
          },
        },
      },
    });

    res.status(200).json(homeworkList);
  } catch (err) {
    console.error("Get Homework Error:", err);
    res.status(500).json({ error: "Failed to fetch homework" });
  }
};

// Update Homework
exports.updateHomework = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;

    const updated = await prisma.homework.update({
      where: { id },
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
      },
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Homework Error:", err);
    res.status(500).json({ error: "Failed to update homework" });
  }
};

// Delete Homework
exports.deleteHomework = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.homework.delete({ where: { id } });
    res.status(200).json({ message: "Homework deleted" });
  } catch (err) {
    console.error("Delete Homework Error:", err);
    res.status(500).json({ error: "Failed to delete homework" });
  }
};
