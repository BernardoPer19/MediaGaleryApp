import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { verifyUser } from '../middlewares/VerifyRoute';


const AuthRouter = Router();

AuthRouter.post('/register', AuthController.registerUser);
AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/logout', AuthController.logoutController);
AuthRouter.get('/current-user', verifyUser, AuthController.getCurrentUser);
AuthRouter.get('/profile', verifyUser, AuthController.getProfileData);

export default AuthRouter;