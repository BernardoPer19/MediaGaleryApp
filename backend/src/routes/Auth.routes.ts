import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { verifyUser } from '../middlewares/VerifyRoute';


const AuthRouter = Router();

// Ruta para registro de usuario
AuthRouter.post('/register', AuthController.registerUser);

// Ruta para login de usuario
AuthRouter.post('/login', AuthController.login);

// Ruta para logout de usuario
AuthRouter.post('/logout', AuthController.logoutController);

// Ruta para obtener el usuario actual
AuthRouter.get('/current-user', verifyUser, AuthController.getCurrentUser);

// Ruta para obtener los datos del perfil
AuthRouter.get('/profile', verifyUser, AuthController.getProfileData);

export default AuthRouter;