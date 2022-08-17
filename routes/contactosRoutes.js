import { Router } from "express";
import { obternerContactos, obtenerContactoId, eliminarContacto } from "../controllers/contactosController.js";

const router = Router();

router.get("/", obternerContactos);

router.get("/:contactid", obtenerContactoId);

router.delete("/:contactid", eliminarContacto);

export default router;