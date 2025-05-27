const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/schools", require("./routes/school.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/admins", require("./routes/admin.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/school-admins", require("./routes/schoolAdmin.routes"));
app.use("/api/teachers", require("./routes/teacher.routes"));
app.use("/api/guards", require("./routes/guard.routes"));
app.use("/api/students", require("./routes/student.routes"));
app.use("/api/parents", require("./routes/parent.routes"));
app.use("/api/drivers", require("./routes/driver.routes"));
app.use("/api/cycles", require("./routes/cycle.routes"));
app.use("/api/classes", require("./routes/class.routes"));
app.use("/api/subjects", require("./routes/subject.routes"));
app.use("/api/schedules", require("./routes/schedule.routes"));
app.use("/api/attendance",require("./routes/attendance.routes"));
app.use("/api/exams", require("./routes/exam.routes"));
app.use("/api/exam-results", require("./routes/examResult.routes"));
app.use("/api/homework", require("./routes/homework.routes"));
app.use("/api/transportations", require("./routes/transportation.routes"));
app.use("/api/transportations/assignments", require("./routes/transportationAssign.routes"));
app.use("/api/textbook-progress", require("./routes/textbookProgress.routes"));
app.use("/api/activities", require("./routes/activity.routes"));

module.exports = app;
