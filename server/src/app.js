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


module.exports = app;
