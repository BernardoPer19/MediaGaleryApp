import type { UnsplashTypes } from "../types/ImgTypes";
import { useNavigate } from "react-router-dom";

interface Props {
  img: UnsplashTypes;
}

function PhotoCard({ img }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/photo/${img.id}`); 
  };

  return (
    <div
      className="break-inside-avoid mb-3 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={img.urls.small}
        alt={img.alt_description || "Imagen de Unsplash"}
        className="w-full h-auto rounded-lg shadow-md"
      />
      <div className="mt-2 text-sm text-gray-700">
        <p className="font-semibold">📸 {img.user.name}</p>
        <p className="italic">{img.alt_description || "Sin descripción"}</p>
      </div>
    </div>
  );
}

export default PhotoCard;
