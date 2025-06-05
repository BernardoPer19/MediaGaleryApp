import { Router } from "express";
import { favoriteController, savedPhotoController } from "../service/photoInstances";
import { verifyUser } from "../middlewares/VerifyRoute";

const ActionPhoto = Router();

ActionPhoto.post(
    "/saved",
    verifyUser,
    savedPhotoController.save
);

ActionPhoto.get(
    "/saved",
    verifyUser,
    savedPhotoController.getAll
);

ActionPhoto.delete(
    "/saved/:imageId",
    verifyUser,
    savedPhotoController.deleteOne
);

ActionPhoto.get(
    "/saved/:imageId/isSaved",
    verifyUser,
    savedPhotoController.isSaved
);







ActionPhoto.post(
    "/favorite",
    verifyUser,
    favoriteController.save
);

ActionPhoto.get(
    "/favorite",
    verifyUser,
    favoriteController.getAll
);

ActionPhoto.delete(
    "/favorite/:imageId",
    verifyUser,
    favoriteController.deleteOne
);

ActionPhoto.get(
    "/favorite/:imageId/isSaved",
    verifyUser,
    favoriteController.isSaved
);


export default ActionPhoto;
