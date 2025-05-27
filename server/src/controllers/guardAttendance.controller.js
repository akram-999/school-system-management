const { PrismaClient } = require('@prisma/client');
const ExcelJS = require('exceljs');
const prisma = new PrismaClient();

const getFullName = (obj) => `${obj.firstName} ${obj.lastName}`;

// ✅ CREATE Attendance
exports.recordAttendance = async (req, res) => {
  const { students, staff, date } = req.body;
  const guardId = req.user.id;

  try {
    for (const s of students) {
      await prisma.attendance.upsert({
        where: {
          studentId_date: {
            studentId: s.studentId,
            date: new Date(date),
          },
        },
        update: {
          status: s.status,
          recordedBy: guardId,
        },
        create: {
          studentId: s.studentId,
          date: new Date(date),
          status: s.status,
          recordedBy: guardId,
        },
      });
    }

    for (const s of staff) {
      await prisma.attendance.upsert({
        where: {
          staffId_date: {
            staffId: s.staffId,
            date: new Date(date),
          },
        },
        update: {
          status: s.status,
          recordedBy: guardId,
        },
        create: {
          staffId: s.staffId,
          date: new Date(date),
          status: s.status,
          recordedBy: guardId,
        },
      });
    }

    res.status(200).json({ message: "Attendance recorded." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to record attendance." });
  }
};

// ✅ READ Attendance
exports.getAttendanceByDate = async (req, res) => {
  const { date } = req.query;

  try {
    const students = await prisma.attendance.findMany({
      where: { date: new Date(date), studentId: { not: null } },
      include: { student: true },
    });

    const staff = await prisma.attendance.findMany({
      where: { date: new Date(date), staffId: { not: null } },
      include: { staff: true },
    });

    res.status(200).json({
      students: students.map(a => ({
        name: getFullName(a.student),
        status: a.status,
        date: a.date,
      })),
      staff: staff.map(a => ({
        name: getFullName(a.staff),
        status: a.status,
        date: a.date,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get attendance." });
  }
};

// ✅ UPDATE
exports.updateAttendance = async (req, res) => {
  const { id, status } = req.body;

  try {
    const updated = await prisma.attendance.update({
      where: { id },
      data: { status },
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update attendance." });
  }
};

// ✅ DELETE
exports.deleteAttendance = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.attendance.delete({ where: { id } });
    res.status(200).json({ message: "Deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete attendance." });
  }
};

// ✅ EXPORT TO EXCEL
exports.exportAttendance = async (req, res) => {
  const { date } = req.params;

  try {
    const students = await prisma.attendance.findMany({
      where: { date: new Date(date), studentId: { not: null } },
      include: { student: true },
    });

    const staff = await prisma.attendance.findMany({
      where: { date: new Date(date), staffId: { not: null } },
      include: { staff: true },
    });

    const workbook = new ExcelJS.Workbook();

    // Sheet 1: Students
    const sheet1 = workbook.addWorksheet("Students Attendance");
    sheet1.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Date", key: "date", width: 15 },
      { header: "Status", key: "status", width: 15 },
    ];

    students.forEach(a =>
      sheet1.addRow({
        name: getFullName(a.student),
        date: new Date(a.date).toLocaleDateString(),
        status: a.status,
      })
    );

    // Sheet 2: Staff
    const sheet2 = workbook.addWorksheet("Staff Attendance");
    sheet2.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Date", key: "date", width: 15 },
      { header: "Status", key: "status", width: 15 },
    ];

    staff.forEach(a =>
      sheet2.addRow({
        name: getFullName(a.staff),
        date: new Date(a.date).toLocaleDateString(),
        status: a.status,
      })
    );

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=attendance-${date}.xlsx`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to export Excel." });
  }
};
