export interface PhotoBase {
  id: string;
  userId: string;
  imageId: string;
  imageUrl: string;
  title?: string | null;
  createdAt?: Date;
}
