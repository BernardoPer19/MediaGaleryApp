export class GenericPhotoController {
    constructor(service) {
        this.save = async (req, res) => {
            try {
                const { imageId, imageUrl, title } = req.body;
                const userId = req.user?.user_id;
                if (!userId || !imageId || !imageUrl) {
                    res.status(400).json({ message: "Faltan datos requeridos" });
                    return;
                }
                const saved = await this.service.saveData({
                    userId,
                    imageId,
                    imageUrl,
                    title,
                });
                res.status(201).json(saved);
            }
            catch (error) {
                const msg = error instanceof Error ? error.message : "Error interno del servidor";
                res.status(500).json({ message: msg });
            }
        };
        this.getAll = async (req, res) => {
            try {
                const userId = req.user?.user_id;
                if (!userId) {
                    res.status(401).json({ message: "Usuario no autenticado" });
                    return;
                }
                const allSaved = await this.service.findAllByUser(userId);
                res.json(allSaved);
            }
            catch (error) {
                console.error("Error al obtener imágenes guardadas:", error);
                res.status(500).json({ message: "Error interno del servidor" });
            }
        };
        this.deleteOne = async (req, res) => {
            try {
                const userId = req.user?.user_id;
                const { imageId } = req.params;
                if (!userId || !imageId) {
                    res.status(400).json({ message: "Faltan datos para eliminar" });
                    return;
                }
                await this.service.deleteOne(userId, imageId);
                res.json({ message: "Imagen eliminada correctamente" });
            }
            catch (error) {
                const msg = error instanceof Error ? error.message : "Error interno del servidor";
                res.status(500).json({ message: msg });
            }
        };
        this.isSaved = async (req, res) => {
            try {
                const userId = req.user?.user_id;
                const { imageId } = req.params;
                if (!userId || !imageId) {
                    res.status(400).json({ message: "Faltan datos para verificar" });
                    return;
                }
                const exists = await this.service.isSaved(userId, imageId);
                res.json({ isSaved: exists });
            }
            catch (error) {
                console.error("Error al verificar imagen guardada:", error);
                res.status(500).json({ message: "Error interno del servidor" });
            }
        };
        this.service = service;
    }
}
