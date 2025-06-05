import { useAuthContext } from "../context/AuthContext";
import { useSave } from "../hooks/useSave";
import { UserIcon } from "lucide-react"; // Asegúrate de tener lucide-react instalado

function ProfilePage() {
  const { user } = useAuthContext();
  const { savedItems = [], isLoading } = useSave();

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-slate-500 text-lg">
        Cargando guardados...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-slate-500 text-lg">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Perfil */}
      <div className="p-10 bg-gradient-to-br from-slate-50 to-blue-100 rounded-3xl shadow-2xl text-center">
        <div className="w-28 h-28 mx-auto rounded-full bg-white border-4 border-blue-200 flex items-center justify-center text-blue-700 text-4xl font-bold mb-6 shadow-inner">
          {user.name?.[0] ? (
            user.name[0].toUpperCase()
          ) : (
            <UserIcon className="w-10 h-10 text-blue-500" />
          )}
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">{user.name}</h2>
        <p className="text-slate-600 text-lg">{user.email}</p>
        <div className="mt-4 inline-block bg-white px-4 py-2 rounded-lg text-sm font-medium text-slate-700 shadow">
          Miembro desde: {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Guardados */}
      <section>
        <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
          Tus imágenes guardadas
        </h3>

        {savedItems.length === 0 ? (
          <p className="text-center text-slate-500 text-lg">
            No tienes fotos guardadas aún.
          </p>
        ) : (
          <ul className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {savedItems.map((item) => (
              <li
                key={item.imageId}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200"
              >
                <div className="aspect-square w-full">
                  <img
                    src={item.imageUrl}
                    alt={item.title || "Imagen guardada"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {item.title || "Sin título"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
