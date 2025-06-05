function FavoriteItems() {
  const favorites = ["Curso React", "Café Especial"]; // Temporal

  return (
    <div className="bg-white rounded-xl  p-5">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">Tus favoritos</h3>
      {favorites.length === 0 ? (
        <p className="text-slate-500">No has marcado favoritos aún.</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((item, i) => (
            <li key={i} className="bg-slate-100 rounded px-3 py-2 text-slate-700">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteItems;
