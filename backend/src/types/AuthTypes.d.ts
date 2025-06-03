export interface UserType {
  user_id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string; // cambiar a string si viene así de la DB
}

export interface PhotoBase {
  id: string;
  userId: string;
  imageId: string;
  imageUrl: string;
  title?: string | null;
  createdAt?: Date;
}
