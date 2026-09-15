import { Router } from "express";
import {
  getCompaniesController,
  createCompanyController,
  getCompanyByIdController,
  updateCompanyController,
  deleteCompanyController,
} from "./companies.controller";

const router = Router();

router.get("/", getCompaniesController);
router.post("/", createCompanyController);
router.get("/:id", getCompanyByIdController);
router.patch("/:id", updateCompanyController);
router.delete("/:id", deleteCompanyController);

export default router;
