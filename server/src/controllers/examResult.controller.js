const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Exam Result
exports.createExamResult = async (req, res) => {
  try {
    const { examId, studentId, grade } = req.body;

    const result = await prisma.examResult.create({
      data: {
        examId,
        studentId,
        grade,
      },
    });

    res.status(201).json(result);
  } catch (err) {
    console.error("Create Exam Result Error:", err);
    res.status(500).json({ error: "Failed to create exam result" });
  }
};

// Get all Exam Results
exports.getExamResults = async (req, res) => {
  try {
    const results = await prisma.examResult.findMany({
      include: {
        student: true,
        exam: {
          include: {
            subject: true,
          },
        },
      },
    });

    res.status(200).json(results);
  } catch (err) {
    console.error("Fetch Exam Results Error:", err);
    res.status(500).json({ error: "Failed to fetch exam results" });
  }
};

// Update Exam Result
exports.updateExamResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade } = req.body;

    const updated = await prisma.examResult.update({
      where: { id },
      data: { grade },
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Exam Result Error:", err);
    res.status(500).json({ error: "Failed to update exam result" });
  }
};

// Delete Exam Result
exports.deleteExamResult = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.examResult.delete({ where: { id } });
    res.status(200).json({ message: "Exam result deleted" });
  } catch (err) {
    console.error("Delete Exam Result Error:", err);
    res.status(500).json({ error: "Failed to delete exam result" });
  }
};
