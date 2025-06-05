function SavedItems({savedItems}) {

  return (
    <div className="bg-white rounded-xl  p-5">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">
        Tus guardadas
      </h3>
      {savedItems.length === 0 ? (
        <p>No tienes fotos guardadas aún.</p>
      ) : (
        <ul>
          {savedItems.map((item) => (
            <li key={item.imageId}>
              <img
                src={item.imageUrl}
                alt={item.title || "Imagen guardada"}
                width={150}
              />
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SavedItems;
