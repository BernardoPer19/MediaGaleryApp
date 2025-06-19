import { prisma } from '../libs/prisma.js';
import { PhotoService } from './PhotoService.js';
import { GenericPhotoController } from '../controllers/PhotoController.js';
// Instancias de servicio para cada tabla
export const savedPhotoService = new PhotoService(prisma.savedPhoto);
export const favoriteService = new PhotoService(prisma.favorite);
// Controladores para cada servicio
export const savedPhotoController = new GenericPhotoController(savedPhotoService);
export const favoriteController = new GenericPhotoController(favoriteService);
