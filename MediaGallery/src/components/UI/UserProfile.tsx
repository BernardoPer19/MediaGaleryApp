import type { UnsplashTypes } from "../../types/ImgTypes";

interface userProps {
  user: UnsplashTypes;
}

export function UserProfile(user: userProps) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <img
        src={user.user.user.profile_image.medium}
        alt={user.user.user.name}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p className="font-semibold text-gray-800">{user.user.user.name}</p>
        <a
          href={user.user.links.html}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm hover:underline"
        >
          Ver perfil
        </a>
        {user.user.user.instagram_username && (
          <p className="text-sm text-gray-500">
            @{user.user.user.instagram_username}
          </p>
        )}
      </div>
    </div>
  );
}
