const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



exports.createSchedule = async (req, res) => {
    try {
      const { classId, teacherId, subjectId, dayOfWeek, startTime, endTime } = req.body;
      const schedule = await prisma.schedule.create({
        data: {
          classId,
          teacherId,
          subjectId,
          dayOfWeek,
          startTime,
          endTime,
        },
      });
      res.json(schedule);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getSchedules = async (req, res) => {
    try {
      const schedules = await prisma.schedule.findMany({
        include: {
          class: true,
          teacher: true,
          subject: true,
        },
      });
      res.json(schedules);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateSchedule = async (req, res) => {
    try {
      const { id } = req.params;
      const { dayOfWeek, startTime, endTime } = req.body;
      const schedule = await prisma.schedule.update({
        where: { id },
        data: { dayOfWeek, startTime, endTime },
      });
      res.json(schedule);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteSchedule = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.schedule.delete({ where: { id } });
      res.json({ message: "Schedule deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  