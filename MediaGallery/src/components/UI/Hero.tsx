import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function Hero() {
  const { isAuthenticated } = useAuthContext();

  return (
    <section className="bg-white text-black py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-10">
        {/* Texto */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Descubre, Guarda y Comparte Imágenes Únicas
          </h1>
          <p className="text-lg text-gray-800 mb-8">
            FreeLanceGram es tu galería digital para explorar fotos increíbles,
            guardar tus favoritas y compartirlas con la comunidad.
          </p>

          {isAuthenticated ? (
            <Link
              to="/gallery"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Explorar Galería
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Iniciar Sesión para Guardar Imagenes
            </Link>
          )}
        </div>

        {/* Imagen/Ilustración */}
        <div className="max-w-md w-full">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="Galería de imágenes"
            className="rounded-xl shadow-lg object-cover w-full h-72 md:h-96"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
