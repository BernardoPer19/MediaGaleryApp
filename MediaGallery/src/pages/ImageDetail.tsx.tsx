import { useParams } from "react-router-dom";
import { useImage } from "../hooks/useUniqueImg";
import { useState } from "react";
import { Heart, Bookmark } from "lucide-react"; // Usa íconos modernos

function ImageDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useImage(id!);

  // Estados temporales hasta que conectes con backend
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCollection, setInCollection] = useState(false);

  if (isLoading) return <p className="p-4">Cargando imagen...</p>;
  if (isError || !data)
    return <p className="p-4 text-red-500">Error al cargar la imagen</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl shadow-lg max-w-[1200px] m-auto">
      {/* Imagen */}
      <img
        src={data.urls.regular}
        alt={data.alt_description || "Imagen de Unsplash"}
        className="w-full md:w-[700px] h-[800px] rounded-lg object-cover"
      />

      {/* Detalles */}
      <div className="flex-1 flex flex-col gap-3 justify-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {data.description || data.alt_description || "Sin descripción"}
        </h1>

        <p className="text-sm text-gray-600">
          <span className="font-semibold">Dimensiones:</span> {data.width}x
          {data.height}px
        </p>

        <p className="text-sm text-gray-600">
          <span className="font-semibold">Color dominante:</span>{" "}
          <span
            className="inline-block w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: data.color }}
          ></span>{" "}
          {data.color}
        </p>

        <p className="text-sm text-gray-600">
          <span className="font-semibold">Likes:</span> ❤️ {data.likes}
        </p>

        <p className="text-sm text-gray-600">
          <span className="font-semibold">Fecha de publicación:</span>{" "}
          {new Date(data.created_at).toLocaleDateString("es-ES")}
        </p>

        {/* Botones */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white transition ${
              isFavorite ? "bg-red-600" : "bg-gray-700 hover:bg-red-500"
            }`}
          >
            <Heart size={18} />
            {isFavorite ? "Favorito" : "Añadir a Favoritos"}
          </button>

          <button
            onClick={() => setInCollection(!inCollection)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white transition ${
              inCollection ? "bg-blue-600" : "bg-gray-700 hover:bg-blue-500"
            }`}
          >
            <Bookmark size={18} />
            {inCollection ? "Guardado" : "Guardar en Colección"}
          </button>
        </div>

        {/* Usuario */}
        <div className="mt-6 flex items-center gap-3">
          <img
            src={data.user.profile_image.medium}
            alt={data.user.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-800">{data.user.name}</p>
            <a
              href={data.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm hover:underline"
            >
              Ver perfil en Unsplash
            </a>
            {data.user.instagram_username && (
              <p className="text-sm text-gray-500">
                @{data.user.instagram_username}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageDetail;
