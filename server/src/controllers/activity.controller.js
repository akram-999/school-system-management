const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create activity
exports.createActivity = async (req, res) => {
  try {
    const { title, description, date, classId } = req.body;

    const activity = await prisma.activity.create({
      data: {
        title,
        description,
        date: new Date(date),
        classId,
      },
    });

    res.status(201).json(activity);
  } catch (err) {
    console.error("Create Activity Error:", err);
    res.status(500).json({ error: "Failed to create activity" });
  }
};

// Get all activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        class: true,
        participants: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    res.status(200).json(activities);
  } catch (err) {
    console.error("Fetch Activities Error:", err);
    res.status(500).json({ error: "Failed to get activities" });
  }
};

// Assign student to activity
exports.assignStudentToActivity = async (req, res) => {
  try {
    const { studentId, activityId } = req.body;

    await prisma.activityParticipant.create({
      data: {
        studentId,
        activityId,
      },
    });

    res.status(200).json({ message: "Student assigned to activity" });
  } catch (err) {
    console.error("Assign Error:", err);
    res.status(500).json({ error: "Failed to assign student" });
  }
};

// Remove student from activity
exports.removeStudentFromActivity = async (req, res) => {
  try {
    const { studentId, activityId } = req.body;

    await prisma.activityParticipant.delete({
      where: {
        activityId_studentId: {
          activityId,
          studentId,
        },
      },
    });

    res.status(200).json({ message: "Student removed from activity" });
  } catch (err) {
    console.error("Remove Error:", err);
    res.status(500).json({ error: "Failed to remove student" });
  }
};

// Delete activity
exports.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.activity.delete({ where: { id } });

    res.status(200).json({ message: "Activity deleted" });
  } catch (err) {
    console.error("Delete Activity Error:", err);
    res.status(500).json({ error: "Failed to delete activity" });
  }
};
