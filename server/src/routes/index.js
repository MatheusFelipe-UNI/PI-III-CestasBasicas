const { Router } = require("express");

//Rotas
const userRouter = require("./User/UserRouter.js");

const router = Router();

router.use("/users", userRouter);
router.get("/", (_, res) => res.status(200).json({status: "API FILÉ :)"}))


module.exports = router;