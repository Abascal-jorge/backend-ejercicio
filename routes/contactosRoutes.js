import { Router } from "express";
import { obternerContactos, obtenerContactoId, crearContacto, defaultRespuesta } from "../controllers/contactosController.js";
import { check } from "express-validator";
import validarCampos from "../middleware/validarCampos.js"
import detectarHost from "../middleware/detectarHost.js";

const router = Router();

router.get("/", obternerContactos);

router.get("/:contactid", obtenerContactoId);

router.post("/", 
    [
        check("id", "El ID del usuario es requerido").not().notEmpty(),
        check("name", "El nombre del contacto es requerido").not().notEmpty(),
        check("phone", "El telefono del usuario es requerido").isLength({min: 10}),
        check("addressLines", "Agrega una direccion de contacto").not().notEmpty(),
        validarCampos,
        detectarHost
    ],
    crearContacto);
// router.delete("/:contactid", eliminarContacto);

router.route("/:id")
    .delete(defaultRespuesta)
    .put(defaultRespuesta)



export default router;