const isBrowser = typeof window !== 'undefined';

export type Note = {
    itemId: number;
    media_type: 'movie' | 'tv';
    title: string;
    rating?: number;
    episodesWatched?: number;
    comment?: string;
};

const KEY = 'cinesync:notas';

export const NoteService = {
    getAll(): Note[] {
        if (!isBrowser) return [];
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : [];
    },

    get(itemId: number): Note | undefined {
        return NoteService.getAll().find((n) => n.itemId === itemId);
    },

    save(note: Note) {
        const notes = NoteService.getAll().filter(n => n.itemId !== note.itemId);
        notes.push(note);
        localStorage.setItem(KEY, JSON.stringify(notes));
    },

    delete(itemId: number) {
        const notes = NoteService.getAll().filter(n => n.itemId !== itemId);
        localStorage.setItem(KEY, JSON.stringify(notes));
    }
};