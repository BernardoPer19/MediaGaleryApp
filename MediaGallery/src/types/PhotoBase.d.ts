const mappedPhoto: SaveData = {
  userId: user.user_id,       // o user.user_id si tu contexto es así
  imageId: photo.id,
  imageUrl: photo.urls.full,
  title: photo.description || null,
};
type SaveData = Omit<PhotoBase, "id" | "createdAt">;
