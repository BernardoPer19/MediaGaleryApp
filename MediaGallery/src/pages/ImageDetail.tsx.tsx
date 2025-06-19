import { useParams } from "react-router-dom";
import { useImage } from "../hooks/useUniqueImg";
import { useState } from "react";
import {
  Bookmark,
  Link as LinkIcon,
  Share2,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { UserProfile } from "../components/UI/UserProfile";
import { useShareDownload } from "../hooks/useShareDownload";
import { useSave } from "../hooks/useSave";
import { Toaster } from "sonner";

function ImageDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useImage(id!);
  const { isSaved, toggleSave, isPending } = useSave(data); 

  const [shareOpen, setShareOpen] = useState(false);

  const originalUrl = data?.urls.full;
  const { copied, downloading, copyLink, share, download } = useShareDownload(
    originalUrl ?? ""
  );

  if (isLoading) return <p className="p-4">Cargando imagen...</p>;
  if (isError || !data)
    return <p className="p-4 text-red-500">Error al cargar la imagen</p>;

  const imageUrl = data.urls.regular;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl shadow-lg max-w-[1200px] m-auto">
       <Toaster
        theme="dark"
        closeButton
        position="top-right"
      />
      <img
        src={imageUrl}
        alt={data.alt_description || "Imagen de Unsplash"}
        className="w-full md:w-[700px] h-[800px] rounded-lg object-cover"
      />

      <div className="flex-1 flex flex-col gap-5 justify-center">
        <UserProfile user={data} />

        <h1 className="text-2xl font-bold text-gray-800">
          {data.description || data.alt_description || "Sin descripción"}
        </h1>

        <p className="text-sm text-gray-600">
          <span className="font-semibold">Dimensiones:</span> {data.width}x
          {data.height}px
        </p>

        <p className="text-sm text-gray-600 flex items-center gap-2">
          <span className="font-semibold">Color dominante:</span>
          <span
            className="inline-block w-5 h-5 rounded-full border border-gray-300"
            style={{ backgroundColor: data.color }}
          />
          {data.color}
        </p>

        <p className="text-sm text-gray-600">
          <span className="font-semibold">Likes:</span> ❤️ {data.likes}
        </p>

        <p className="text-sm text-gray-600">
          <span className="font-semibold">Fecha de publicación:</span>{" "}
          {new Date(data.created_at).toLocaleDateString("es-ES")}
        </p>

        {/* Botones de acciones */}
        <div className="flex gap-4">
          <button
            onClick={toggleSave}
            disabled={isPending}
            className={`flex items-center gap-2 px-5 py-2 rounded-md text-white transition ${
              isSaved ? "bg-blue-600" : "bg-gray-700 hover:bg-blue-500"
            }`}
          >
            <Bookmark size={20} />
            {isSaved ? "Guardado" : "Guardar"}
          </button>
        </div>

        {/* Compartir */}
        <div className="relative inline-block text-left mt-4">
          <div className="flex gap-5">
            <button
              onClick={() => setShareOpen(!shareOpen)}
              className="inline-flex justify-center items-center gap-2 px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            >
              <Share2 size={20} />
              Compartir
              <ChevronDown size={16} />
            </button>

            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-800 transition"
            >
              <ExternalLink size={20} />
              Abrir original
            </a>
          </div>

          {shareOpen && (
            <div
              id="share-menu"
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
            >
              <div className="py-1">
                <button
                  onClick={copyLink}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <LinkIcon size={16} />
                    {copied ? "¡Copiado!" : "Copiar enlace"}
                  </div>
                </button>

                <button
                  onClick={share}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <Share2 size={16} />
                    Compartir con dispositivo
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={download}
          disabled={downloading}
          className="w-full py-4 rounded-lg bg-green-400 hover:bg-green-500 text-white font-semibold text-lg shadow-md transition disabled:opacity-60 mt-6"
        >
          {downloading ? "Descargando..." : "Descargar imagen"}
        </button>
      </div>
    </div>
  );
}

export default ImageDetail;
