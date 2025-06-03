import { prisma } from '../libs/prisma';
import { PhotoService } from './PhotoService';
import { PhotoBase } from '../types/AuthTypes';
import { GenericPhotoController } from '../controllers/PhotoController';

// Instancias de servicio para cada tabla
export const savedPhotoService = new PhotoService<PhotoBase>(prisma.savedPhoto);
export const favoriteService = new PhotoService<PhotoBase>(prisma.favorite);

// Controladores para cada servicio
export const savedPhotoController = new GenericPhotoController<PhotoBase>(savedPhotoService);
export const favoriteController = new GenericPhotoController<PhotoBase>(favoriteService);
