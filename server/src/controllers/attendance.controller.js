const ExcelJS = require('exceljs');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create attendance
exports.createAttendance = async (req, res) => {
  try {
    const { date, status, studentId, teacherId, guardId } = req.body;

    const attendance = await prisma.attendance.create({
      data: {
        date: new Date(date),
        status,
        studentId,
        teacherId,
        guardId,
      },
    });

    res.status(201).json(attendance);
  } catch (err) {
    console.error("Error creating attendance:", err);
    res.status(500).json({ error: "Failed to create attendance" });
  }
};

// Get all attendance records
exports.getAttendances = async (req, res) => {
  try {
    const attendances = await prisma.attendance.findMany({
      include: {
        student: true,
        teacher: true,
        guard: true,
      },
    });

    res.status(200).json(attendances);
  } catch (err) {
    console.error("Error fetching attendances:", err);
    res.status(500).json({ error: "Failed to fetch attendances" });
  }
};

// Update attendance
exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, status } = req.body;

    const updated = await prisma.attendance.update({
      where: { id },
      data: {
        date: new Date(date),
        status,
      },
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating attendance:", err);
    res.status(500).json({ error: "Failed to update attendance" });
  }
};

// Delete attendance
exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.attendance.delete({
      where: { id },
    });

    res.status(200).json({ message: "Attendance deleted" });
  } catch (err) {
    console.error("Error deleting attendance:", err);
    res.status(500).json({ error: "Failed to delete attendance" });
  }
};



exports.exportAttendanceByClass = async (req, res) => {
    const classId = req.params.classId;
  
    try {
      const classInfo = await prisma.class.findUnique({
        where: { id: classId },
        include: {
          students: {
            include: {
              attendances: true
            }
          }
        }
      });
  
      if (!classInfo || classInfo.students.length === 0) {
        return res.status(404).json({ message: "No attendance data found." });
      }
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Attendance");
  
      worksheet.columns = [
        { header: "Student Name", key: "studentName", width: 25 },
        { header: "Date", key: "date", width: 20 },
        { header: "Status", key: "status", width: 15 }
      ];
  
      classInfo.students.forEach(student => {
        student.attendances.forEach(att => {
          worksheet.addRow({
            studentName: student.name,
            date: new Date(att.date).toLocaleDateString(),
            status: att.status
          });
        });
      });
  
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename=attendance-class-${classId}.xlsx`);
  
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error("Attendance export failed:", error);
      res.status(500).json({ error: "Failed to export attendance data." });
    }
  };