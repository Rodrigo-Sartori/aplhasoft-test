import { Router } from "express";
import { ContactController } from "../controller/contact.controller";
import { AuthController } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import multer from "multer";


const routes = Router()
const upload = multer()

const contactController = new ContactController();
const authController = new AuthController();

routes.post('/contacts',authMiddleware,upload.single('picture') ,(req, res) => contactController.createContact(req, res))
routes.get('/contacts/:id',authMiddleware, (req, res) => contactController.getDetailed(req, res))
routes.put('/contacts/:id',authMiddleware, (req, res) => contactController.editContact(req, res))
routes.delete('/contacts/:id',authMiddleware, (req, res) => contactController.deleteContact(req, res))

routes.get('/contacts', (req, res) => contactController.getAll(req, res))


routes.post('/auth/login', (req, res) => authController.login(req, res))
routes.post('/auth/register', (req, res) => authController.register(req, res))


export default routes