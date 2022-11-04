import { Router } from "express";

const router = Router();

/**
 * Get user info
 */
router.get("/", async (req, res) => {
  const userId = req.user?.userId;
  const isAdmin = req.user?.isAdmin ? true : false;

  return res.json({
    userId,
    isAdmin,
    firstName: req.user?.firstName,
    lastName: req.user?.lastName,
  });
});

export default router;
