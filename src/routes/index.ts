import { Router } from "express";
// Este solo es un ejemplo de como meter las rutas
import companiesRoutes from "../modules/companies/companies.routes";

const router = Router();

router.use("/companies", companiesRoutes);

export default router;
