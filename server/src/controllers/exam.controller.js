const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ExcelJS = require('exceljs');
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

exports.exportExamResultsByClass = async (req, res) => {
    const classId = req.params.classId;
    const teacherId = req.user.id;
  
    try {
      // Get exams for the class, validated by the teacher's ownership
      const exams = await prisma.exam.findMany({
        where: {
          classId,
          teacherId
        },
        include: {
          examResults: {
            include: {
              student: true
            }
          },
          subject: true
        }
      });
  
      if (exams.length === 0) {
        return res.status(404).json({ message: "No exams found for this class." });
      }
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Exam Results");
  
      // Header Row
      worksheet.columns = [
        { header: 'Exam Title', key: 'examTitle', width: 30 },
        { header: 'Subject', key: 'subject', width: 20 },
        { header: 'Student Name', key: 'studentName', width: 25 },
        { header: 'Grade', key: 'grade', width: 10 }
      ];
  
      exams.forEach(exam => {
        exam.examResults.forEach(result => {
          worksheet.addRow({
            examTitle: exam.title,
            subject: exam.subject.name,
            studentName: result.student.name,
            grade: result.grade
          });
        });
      });
  
      // Prepare file stream
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=class-${classId}-exam-results.xlsx`);
  
      await workbook.xlsx.write(res);
      res.end();
    } catch (err) {
      console.error("Excel Export Error:", err);
      res.status(500).json({ error: "Failed to export exam results." });
    }
  };