import axios from "axios";
import type { UnsplashTypes } from "../types/ImgTypes";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashTypes[];
}

// Buscar imágenes por texto
export const getImagesFull = async (
  query: string,
  page = 1
): Promise<UnsplashSearchResponse> => {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
    params: {
      query,
      page,
      per_page: 10,
    },
  });

  return res.data;
};

// Obtener imágenes aleatorias destacadas
export const getRandomImages = async (count = 10): Promise<UnsplashTypes[]> => {
  const res = await axios.get("https://api.unsplash.com/photos/random", {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
    params: { count },
  });

  return res.data;
};

// Obtener detalles de una imagen por ID
export const getImageById = async (id: string): Promise<UnsplashTypes> => {
  const res = await axios.get(`https://api.unsplash.com/photos/${id}`, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });

  return res.data;
};

// Obtener fotos de un usuario
export const getUserImages = async (
  username: string,
  page = 1
): Promise<UnsplashTypes[]> => {
  const res = await axios.get(
    `https://api.unsplash.com/users/${username}/photos`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
      params: {
        page,
        per_page: 10,
      },
    }
  );

  return res.data;
};
