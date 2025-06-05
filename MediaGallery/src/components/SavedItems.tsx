function SavedItems() {
  // Aquí podrías usar React Query para traer guardados reales
  const saved = ["Propuesta A", "Post B"]; // Temporal

  return (
    <div className="bg-white rounded-xl  p-5">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">Tus guardadas</h3>
      {saved.length === 0 ? (
        <p className="text-slate-500">Aún no tienes elementos guardados.</p>
      ) : (
        <ul className="space-y-2">
          {saved.map((item, i) => (
            <li key={i} className="bg-slate-100 rounded px-3 py-2 text-slate-700">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SavedItems;
