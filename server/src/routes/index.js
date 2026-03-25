const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
//Rotas
const authRouter = require("./Auth/AuthRouter.js");
const userRouter = require("./User/UserRouter.js");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", authMiddleware, userRouter);
router.get("/", (_, res) => res.status(200).json({status: "API FILÉ :)"}))


module.exports = router;