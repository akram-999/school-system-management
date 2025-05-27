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
