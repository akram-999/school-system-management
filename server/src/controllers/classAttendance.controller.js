const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ CREATE attendance records for a class
exports.createAttendance = async (req, res) => {
  const { classId, date, attendance } = req.body;
  const teacherId = req.user.id;

  try {
    for (const record of attendance) {
      await prisma.attendance.upsert({
        where: {
          studentId_date: {
            studentId: record.studentId,
            date: new Date(date),
          },
        },
        update: {
          status: record.status,
          recordedBy: teacherId,
        },
        create: {
          studentId: record.studentId,
          status: record.status,
          date: new Date(date),
          recordedBy: teacherId,
        },
      });
    }

    res.status(201).json({ message: "Attendance created or updated successfully." });
  } catch (error) {
    console.error("Create Attendance Error:", error);
    res.status(500).json({ error: "Failed to create attendance." });
  }
};

// ✅ READ attendance records for a class
exports.getAttendanceByClass = async (req, res) => {
  const { classId, date } = req.query;

  try {
    const students = await prisma.student.findMany({
      where: { classId },
      include: {
        attendances: {
          where: { date: new Date(date) },
        },
      },
    });

    const result = students.map(student => ({
      studentId: student.id,
      name: `${student.firstName} ${student.lastName}`,
      status: student.attendances[0]?.status || "Unmarked",
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Get Attendance Error:", error);
    res.status(500).json({ error: "Failed to get attendance." });
  }
};

// ✅ UPDATE single student's attendance
exports.updateAttendance = async (req, res) => {
  const { studentId, date, status } = req.body;
  const teacherId = req.user.id;

  try {
    const updated = await prisma.attendance.update({
      where: {
        studentId_date: {
          studentId,
          date: new Date(date),
        },
      },
      data: {
        status,
        recordedBy: teacherId,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Attendance Error:", error);
    res.status(500).json({ error: "Failed to update attendance." });
  }
};

// ✅ DELETE single student's attendance
exports.deleteAttendance = async (req, res) => {
  const { studentId, date } = req.query;

  try {
    await prisma.attendance.delete({
      where: {
        studentId_date: {
          studentId,
          date: new Date(date),
        },
      },
    });

    res.status(200).json({ message: "Attendance record deleted." });
  } catch (error) {
    console.error("Delete Attendance Error:", error);
    res.status(500).json({ error: "Failed to delete attendance." });
  }
};
