import { Router } from "express";
import { favoriteController, savedPhotoController } from "../service/photoInstances";

const router = Router();

// Rutas para SavedPhoto
router.post("/saved", savedPhotoController.save);
router.get("/saved", savedPhotoController.getAll);
router.delete("/saved/:imageId", savedPhotoController.deleteOne);
router.get("/saved/:imageId/isSaved", savedPhotoController.isSaved);

// Rutas para Favorite
router.post("/favorite", favoriteController.save);
router.get("/favorite", favoriteController.getAll);
router.delete("/favorite/:imageId", favoriteController.deleteOne);
router.get("/favorite/:imageId/isSaved", favoriteController.isSaved);

export default router;
