// Tracks if a student completed a homework
exports.markHomeworkCompletion = async (req, res) => {
    try {
      const { homeworkId, studentId } = req.body;
  
      const completion = await prisma.homeworkCompletion.create({
        data: {
          homeworkId,
          studentId,
          completedAt: new Date(),
        },
      });
  
      res.status(201).json(completion);
    } catch (err) {
      console.error("Mark Completion Error:", err);
      res.status(500).json({ error: "Failed to mark completion" });
    }
  };
  
  // Get all completions
  exports.getHomeworkCompletions = async (req, res) => {
    try {
      const completions = await prisma.homeworkCompletion.findMany({
        include: {
          student: true,
          homework: true,
        },
      });
  
      res.status(200).json(completions);
    } catch (err) {
      console.error("Fetch Completions Error:", err);
      res.status(500).json({ error: "Failed to fetch completions" });
    }
  };
  