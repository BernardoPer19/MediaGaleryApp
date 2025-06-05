import { useState } from "react";

export function useShareDownload(originalUrl: string ) {
    const [copied, setCopied] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const share = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "Imagen de FreeLanceGram",
                    url: window.location.href,
                })
                .catch(() => { });
        } else {
            copyLink();
            alert("Enlace copiado para compartir");
        }
    };

    const download = async () => {
        setDownloading(true);
        try {
            const response = await fetch(originalUrl);
            const blob = await response.blob();
            const urlBlob = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = urlBlob;
            a.download = `image_${Date.now()}.jpg`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(urlBlob);
        } catch {
            alert("Error al descargar la imagen.");
        } finally {
            setDownloading(false);
        }
    };

    return {
        copied,
        downloading,
        copyLink,
        share,
        download,
    };
}
