export interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface FavoriteType {
  id: string;
  userId: string;
  imageId: string;
  imageUrl: string;
  title?: string;
  createdAt: Date;
}

export interface SavedPhotoType {
  id: string;
  userId: string;
  imageId: string;
  imageUrl: string;
  title?: string;
  createdAt: Date;
}
