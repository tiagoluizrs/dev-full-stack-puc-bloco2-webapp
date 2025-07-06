type MediaType = 'movie' | 'tv';

type MediaItem = {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
    media_type: MediaType;
};

const KEY = (type: MediaType) => `cinesync:favoritos:${type}`;

export const StorageService = {
    getFavorites(type: MediaType): MediaItem[] {
        const raw = localStorage.getItem(KEY(type));
        return raw ? JSON.parse(raw) : [];
    },

    addFavorite(item: MediaItem) {
        const favorites = StorageService.getFavorites(item.media_type);
        const exists = favorites.some((fav) => fav.id === item.id);
        if (!exists) {
            favorites.push(item);
            localStorage.setItem(KEY(item.media_type), JSON.stringify(favorites));
        }
    },

    removeFavorite(id: number, type: MediaType) {
        const favorites = StorageService.getFavorites(type);
        const updated = favorites.filter((item) => item.id !== id);
        localStorage.setItem(KEY(type), JSON.stringify(updated));
    },

    isFavorite(id: number, type: MediaType): boolean {
        return StorageService.getFavorites(type).some((item) => item.id === id);
    },

    getAllFavoriteIds(): number[] {
        const movies = StorageService.getFavorites('movie');
        const series = StorageService.getFavorites('tv');
        return [...movies, ...series].map((item) => item.id);
    },
};
