import { Router } from "express";
import { favoriteController, savedPhotoController } from "../service/photoInstances";
import { verifyUser } from "../middlewares/VerifyRoute";

const ActionPhoto = Router();

// Rutas para SavedPhoto
ActionPhoto.post("/saved", verifyUser, savedPhotoController.save);
ActionPhoto.get("/saved", verifyUser, savedPhotoController.getAll);
ActionPhoto.delete("/saved/:imageId", verifyUser, savedPhotoController.deleteOne);
ActionPhoto.get("/saved/:imageId/isSaved", verifyUser, savedPhotoController.isSaved);

// Rutas para Favorite
ActionPhoto.post("/favorite", verifyUser, favoriteController.save);
ActionPhoto.get("/favorite", verifyUser, favoriteController.getAll);
ActionPhoto.delete("/favorite/:imageId", verifyUser, favoriteController.deleteOne);
ActionPhoto.get("/favorite/:imageId/isSaved", verifyUser, favoriteController.isSaved);

export default ActionPhoto;
