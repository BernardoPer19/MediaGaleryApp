import { PhotoBase } from '../types/AuthTypes';

export class PhotoService<T extends PhotoBase> {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  // Guardar con validación que no exista ya para el mismo usuario e imagen
  async saveData(data: Omit<T, 'id' | 'createdAt'>): Promise<T> {
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
  async findAllByUser(userId: string): Promise<T[]> {
    const records = await this.model.findMany({
      where: { userId },
    });

    return records.map((r: T) => ({
      ...r,
      title: r.title ?? undefined,
    }));
  }

  // Eliminar una foto por userId e imageId con validación
  async deleteOne(userId: string, imageId: string) {
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
  async isSaved(userId: string, imageId: string): Promise<boolean> {
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
