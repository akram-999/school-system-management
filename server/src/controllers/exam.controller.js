const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Exam
exports.createExam = async (req, res) => {
  try {
    const { title, subjectId, classId, examDate } = req.body;

    const exam = await prisma.exam.create({
      data: {
        title,
        subjectId,
        classId,
        examDate: new Date(examDate),
      },
    });

    res.status(201).json(exam);
  } catch (err) {
    console.error("Create Exam Error:", err);
    res.status(500).json({ error: "Failed to create exam" });
  }
};

// Get all Exams
exports.getExams = async (req, res) => {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        subject: true,
        class: true,
        examResults: {
          include: {
            student: true,
          },
        },
      },
    });

    res.status(200).json(exams);
  } catch (err) {
    console.error("Fetch Exams Error:", err);
    res.status(500).json({ error: "Failed to fetch exams" });
  }
};

// Update Exam
exports.updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subjectId, classId, examDate } = req.body;

    const updatedExam = await prisma.exam.update({
      where: { id },
      data: {
        title,
        subjectId,
        classId,
        examDate: new Date(examDate),
      },
    });

    res.status(200).json(updatedExam);
  } catch (err) {
    console.error("Update Exam Error:", err);
    res.status(500).json({ error: "Failed to update exam" });
  }
};

// Delete Exam
exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.exam.delete({ where: { id } });
    res.status(200).json({ message: "Exam deleted" });
  } catch (err) {
    console.error("Delete Exam Error:", err);
    res.status(500).json({ error: "Failed to delete exam" });
  }
};
