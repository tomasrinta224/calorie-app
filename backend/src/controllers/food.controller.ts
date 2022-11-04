import { Router } from "express";
import { validate } from "class-validator";
import { CreateFoodEntryDto, UpdateFoodEntryDto } from "../dtos/food-entry.dto";
import foodEntryService from "../services/foodEntry.service";
import { adminGuard } from "../auth/guards";
import { FoodFilterDto } from "../dtos/food-filter.dto";

const router = Router();

/**
 * Create a new food entry
 */
router.post("/", async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  const foodName = req.body.foodName;
  const tookAt = req.body.tookAt;
  const calorie = req.body.calorie;
  const price = req.body.price;

  const createFoodEntryDto = new CreateFoodEntryDto();
  createFoodEntryDto.userId = userId;
  createFoodEntryDto.foodName = foodName;
  createFoodEntryDto.calorie = calorie;
  createFoodEntryDto.tookAt = tookAt;
  createFoodEntryDto.price = price || 0;

  const errors = await validate(createFoodEntryDto);
  if (errors.length > 0) {
    console.log(errors);
    return res.status(400).send("invalid request");
  }

  try {
    const newFoodEntry = await foodEntryService.create(createFoodEntryDto);
    return res.json(newFoodEntry);
  } catch (err) {
    return res.status(500).send("Interal server error");
  }
});

/**
 * Get food entries
 */
router.get("/", async (req, res) => {
  const isAdmin = req.user?.isAdmin;
  const userId = req.user?.userId;
  const dateFrom = req.query.startDate as string;
  const dateTo = req.query.endDate as string;
  const filter = new FoodFilterDto();

  filter.dateFrom = dateFrom;
  filter.dateTo = dateTo;

  if (!isAdmin) {
    if (!userId) {
      return res.status(401).send("Unauthorized");
    }
    filter.userId = userId;
  }

  const errors = await validate(filter);
  if (errors.length > 0) {
    console.log(errors);
    return res.status(400).send("invalid request");
  }

  try {
    const foodEntries = await foodEntryService.getAll(filter);
    return res.json(foodEntries);
  } catch (err) {
    return res.status(500).send("Interal server error");
  }
});

router.get("/report", adminGuard, async (req, res) => {
  const report = await foodEntryService.getReport();

  return res.json(report);
});

/**
 * Get warning dates
 */
router.get("/warning-dates", async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const warningDates = await foodEntryService.getWarningDatesForUser(userId);
    return res.json(warningDates);
  } catch (err) {
    return res.status(500).send("Interal server error");
  }
});

/**
 * Get warning months
 */
router.get("/warning-months", async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const warningMonths = await foodEntryService.getWarningMonthsForUser(
      userId
    );
    return res.json(warningMonths);
  } catch (err) {
    return res.status(500).send("Interal server error");
  }
});

/**
 * Get a food entry
 */
router.get("/:entryId", async (req, res) => {
  const isAdmin = req.user?.isAdmin;
  const userId = req.user?.userId;
  const foodEntryId = parseInt(req.params.entryId) as number;

  if (isNaN(foodEntryId)) {
    return res.status(400).send("Invalid request");
  }

  const result = await foodEntryService.findOne(foodEntryId);
  if (!result || (!isAdmin && result.userId !== userId)) {
    return res.status(404).send("Resource not found");
  }

  return res.json(result);
});

/**
 * Remove a food entry
 */
router.delete("/:entryId", async (req, res) => {
  const foodEntryId = parseInt(req.params.entryId);
  const isAdmin = req.user?.isAdmin;
  const userId = req.user?.userId;

  if (isNaN(foodEntryId)) {
    return res.status(400).send("Invalid request");
  }
  const foodEntry = await foodEntryService.findOne(foodEntryId);
  if (!foodEntry || (!isAdmin && foodEntry.userId !== userId)) {
    return res.status(404).send("Resource not found");
  }

  try {
    const result = await foodEntryService.delete(foodEntryId);
    return res.json(result);
  } catch (err) {
    return res.status(500).send("Interal server error");
  }
});

/**
 * Update a food entry
 */
router.put("/:entryId", async (req, res) => {
  const foodEntryId = parseInt(req.params.entryId) as number;
  const userId = req.user?.userId;
  const isAdmin = req.user?.isAdmin;
  const foodName = req.body.foodName;
  const tookAt = req.body.tookAt;
  const calorie = req.body.calorie;
  const price = req.body.price;

  const foodEntry = await foodEntryService.findOne(foodEntryId);
  if (!foodEntry) {
    return res.status(404).send("Resource not found");
  }
  if (!isAdmin && foodEntry.userId !== userId) {
    return res.status(404).send("Resource not found");
  }

  const updateFoodEntryDto = new UpdateFoodEntryDto();
  updateFoodEntryDto.foodEntryId = foodEntryId;
  updateFoodEntryDto.foodName = foodName;
  updateFoodEntryDto.calorie = calorie;
  updateFoodEntryDto.tookAt = tookAt;
  updateFoodEntryDto.price = price;
  const errors = await validate(updateFoodEntryDto);
  if (errors.length > 0) {
    console.log(errors);
    return res.status(400).send("invalid request");
  }

  try {
    const result = await foodEntryService.update(updateFoodEntryDto);
    return res.json(result);
  } catch (err) {
    return res.status(500).send("Interal server error");
  }
});

export default router;
