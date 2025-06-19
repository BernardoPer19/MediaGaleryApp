"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoService = void 0;
class PhotoService {
    constructor(model) {
        this.model = model;
    }
    // Guardar con validación que no exista ya para el mismo usuario e imagen
    async saveData(data) {
        const exists = await this.model.findFirst({
            where: {
                userId: data.userId,
                imageId: data.imageId,
            },
        });
        if (exists) {
            throw new Error('La foto ya fue guardada');
        }
        const created = await this.model.create({
            data: {
                ...data,
                createdAt: new Date(),
                title: data.title ?? null,
            },
        });
        return {
            ...created,
            title: created.title ?? undefined,
        };
    }
    // Obtener todas las fotos guardadas del usuario
    async findAllByUser(userId) {
        const records = await this.model.findMany({
            where: { userId },
        });
        return records.map((r) => ({
            ...r,
            title: r.title ?? undefined,
        }));
    }
    // Eliminar una foto por userId e imageId con validación
    async deleteOne(userId, imageId) {
        const exists = await this.model.findFirst({
            where: {
                userId,
                imageId,
            },
        });
        if (!exists) {
            throw new Error('La foto ya fue eliminada o no existe');
        }
        return this.model.deleteMany({
            where: {
                userId,
                imageId,
            },
        });
    }
    // Verificar si ya está guardada
    async isSaved(userId, imageId) {
        const existing = await this.model.findUnique({
            where: {
                userId_imageId: {
                    userId,
                    imageId,
                },
            },
        });
        return Boolean(existing);
    }
}
exports.PhotoService = PhotoService;
