"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteController = exports.savedPhotoController = exports.favoriteService = exports.savedPhotoService = void 0;
const prisma_1 = require("../libs/prisma");
const PhotoService_1 = require("./PhotoService");
const PhotoController_1 = require("../controllers/PhotoController");
// Instancias de servicio para cada tabla
exports.savedPhotoService = new PhotoService_1.PhotoService(prisma_1.prisma.savedPhoto);
exports.favoriteService = new PhotoService_1.PhotoService(prisma_1.prisma.favorite);
// Controladores para cada servicio
exports.savedPhotoController = new PhotoController_1.GenericPhotoController(exports.savedPhotoService);
exports.favoriteController = new PhotoController_1.GenericPhotoController(exports.favoriteService);
