import { Router } from "express";
import foodRouter from "./controllers/food.controller";
import profileRouter from "./controllers/profile.controller";
import passport from "./auth/passport";

const router: Router = Router();

router.use(passport.authenticate("bearer", { session: false }));

router.use("/food", foodRouter);
router.use("/profile", profileRouter);

export default router;
