export const errorHandler = (err, _req, res, _next) => {
    res.status(400).json({
        success: false,
        message: err.message || "Ocurrió un error inesperado",
    });
};
