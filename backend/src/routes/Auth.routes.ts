import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';


const AuthRouter = Router();

// Ruta para registro de usuario
AuthRouter.post('/register', AuthController.registerUser);

// Ruta para login de usuario
AuthRouter.post('/login', AuthController.login);

// Ruta para logout de usuario
AuthRouter.post('/logout', AuthController.logoutController);

export default AuthRouter;