const userRouter = require("express").Router();
const { createUser, getUsers, updateUser, deleteUser } = require("../controllers/user.controller");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware");

userRouter.use(authenticate);
userRouter.post("/", authorizeRoles("ADMIN"), createUser);
userRouter.get("/", authorizeRoles("ADMIN"), getUsers);
userRouter.put("/:id", authorizeRoles("ADMIN"), updateUser);
userRouter.delete("/:id", authorizeRoles("ADMIN"), deleteUser);

module.exports = userRouter;
