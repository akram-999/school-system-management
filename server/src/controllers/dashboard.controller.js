const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getDashboardAnalytics = async (req, res) => {
  const { role, id } = req.user;

  try {
    if (role === "ADMIN") {
      const [totalSchools, totalStudents, totalUsers] = await Promise.all([
        prisma.school.count(),
        prisma.student.count(),
        prisma.user.groupBy({
          by: ["role"],
          _count: true
        })
      ]);

      return res.json({
        totalSchools,
        totalStudents,
        totalUsers: totalUsers.map(u => ({ role: u.role, count: u._count }))
      });
    }

    if (role === "SCHOOL_ADMIN") {
      const schoolAdmin = await prisma.schoolAdmin.findUnique({
        where: { userId: id },
        include: { school: true }
      });

      const [students, teachers, guards, attendance] = await Promise.all([
        prisma.student.count({ where: { schoolId: schoolAdmin.schoolId } }),
        prisma.teacher.count({ where: { schoolId: schoolAdmin.schoolId } }),
        prisma.guard.count({ where: { schoolId: schoolAdmin.schoolId } }),
        prisma.attendance.findMany({
          where: { schoolId: schoolAdmin.schoolId },
          select: { status: true }
        })
      ]);

      return res.json({
        school: schoolAdmin.school.name,
        studentCount: students,
        teacherCount: teachers,
        guardCount: guards,
        attendanceSummary: {
          present: attendance.filter(a => a.status === "PRESENT").length,
          absent: attendance.filter(a => a.status === "ABSENT").length
        }
      });
    }

    if (role === "TEACHER") {
      const teacher = await prisma.teacher.findUnique({
        where: { userId: id }
      });

      const [classes, attendance, exams] = await Promise.all([
        prisma.class.findMany({ where: { teacherId: teacher.id } }),
        prisma.attendance.findMany({ where: { teacherId: teacher.id } }),
        prisma.examResult.findMany({ where: { teacherId: teacher.id } })
      ]);

      return res.json({
        classCount: classes.length,
        attendanceSummary: {
          present: attendance.filter(a => a.status === "PRESENT").length,
          absent: attendance.filter(a => a.status === "ABSENT").length
        },
        examsGraded: exams.length
      });
    }

    if (role === "STUDENT") {
      const student = await prisma.student.findUnique({
        where: { userId: id }
      });

      const [attendance, exams, homework] = await Promise.all([
        prisma.attendance.findMany({ where: { studentId: student.id } }),
        prisma.examResult.findMany({ where: { studentId: student.id } }),
        prisma.homework.findMany({ where: { classId: student.classId } })
      ]);

      return res.json({
        attendance: {
          present: attendance.filter(a => a.status === "PRESENT").length,
          absent: attendance.filter(a => a.status === "ABSENT").length
        },
        examsTaken: exams.length,
        upcomingHomework: homework.filter(h => new Date(h.dueDate) > new Date())
      });
    }

    if (role === "PARENT") {
      const parent = await prisma.parent.findUnique({
        where: { userId: id },
        include: { children: true }
      });

      const childIds = parent.children.map(c => c.id);

      const [attendance, exams, homework] = await Promise.all([
        prisma.attendance.findMany({ where: { studentId: { in: childIds } } }),
        prisma.examResult.findMany({ where: { studentId: { in: childIds } } }),
        prisma.homework.findMany({ where: { studentId: { in: childIds } } })
      ]);

      return res.json({
        childrenCount: parent.children.length,
        attendanceSummary: {
          present: attendance.filter(a => a.status === "PRESENT").length,
          absent: attendance.filter(a => a.status === "ABSENT").length
        },
        totalExams: exams.length,
        upcomingHomework: homework.filter(h => new Date(h.dueDate) > new Date())
      });
    }

    res.status(403).json({ message: "Invalid role for dashboard" });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ error: "Failed to load dashboard analytics" });
  }
};
