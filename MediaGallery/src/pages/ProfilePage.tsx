import FavoriteItems from "../components/FavoriteItems";
import SavedItems from "../components/SavedItems";
import { useAuthContext } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className="text-center mt-10 text-slate-500 text-lg">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 space-y-8">
      {/* Perfil */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-100 shadow-xl text-center">
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl text-blue-700 mx-auto mb-6 font-bold tracking-wider">
          {user.name?.[0]?.toUpperCase() || "U"}
        </div>
        <h2 className="mb-2 font-bold text-2xl text-slate-800">{user.name}</h2>
        <p className="mb-4 text-slate-500 text-lg">{user.email}</p>
        <div className="bg-slate-100 rounded-lg py-3 text-slate-700 text-base font-medium">
          Miembro desde: {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Guardados */}
      <SavedItems />

      {/* Favoritos */}
      <FavoriteItems />
    </div>
  );
}

export default ProfilePage;
