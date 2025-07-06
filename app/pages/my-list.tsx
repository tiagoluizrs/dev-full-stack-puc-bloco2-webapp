import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { CardList } from '~/components/CardList';
import { StorageService } from '~/services/storage';
import { AppBar, NoteDialog } from '~/components';
import { NoteService, type Note } from '~/services/note';


export default function MyListPage() {
    const [movieItems, setMovieItems] = useState<any[]>([]);
    const [tvItems, setTvItems] = useState<any[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [noteDialogOpen, setNoteDialogOpen] = useState(false);
    const [noteItem, setNoteItem] = useState<any | null>(null);

    const handleNoteClick = (item: any) => {
        setNoteItem(item);
        setNoteDialogOpen(true);
    };

    const handleSaveNote = (partialNote: Partial<Note>) => {
        if (!noteItem) return;
        NoteService.save({
            itemId: noteItem.id,
            media_type: noteItem.media_type,
            title: noteItem.title || noteItem.name,
            ...partialNote,
        });
    };


    const loadFavorites = () => {
        const movies = StorageService.getFavorites('movie');
        const series = StorageService.getFavorites('tv');
        setMovieItems(movies);
        setTvItems(series);
        setFavorites([...movies, ...series].map((item) => item.id));
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const handleToggleFavorite = (item: any) => {
        const isFav = favorites.includes(item.id);
        if (isFav) {
            StorageService.removeFavorite(item.id, item.media_type);
        } else {
            StorageService.addFavorite(item);
        }
        loadFavorites(); // recarrega favoritos atualizados
    };

    return (
        <>
            <AppBar />
            <Container sx={{ pt: 8, pb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    ⭐ Minha Lista
                </Typography>

                {movieItems.length > 0 ? (
                    <CardList
                        title="🎬 Meus Filmes"
                        items={movieItems}
                        favorites={favorites}
                        type="movie"
                        onToggleFavorite={handleToggleFavorite}
                        onNoteClick={handleNoteClick}
                    />
                ) : (
                    <Box mb={4}>
                        <Typography color="text.secondary">
                            Nenhum filme salvo ainda.
                        </Typography>
                    </Box>
                )}

                {tvItems.length > 0 ? (
                    <CardList
                        title="📺 Minhas Séries"
                        items={tvItems}
                        favorites={favorites}
                        type="tv"
                        onToggleFavorite={handleToggleFavorite}
                        onNoteClick={handleNoteClick}
                    />
                ) : (
                    <Typography color="text.secondary">
                        Nenhuma série salva ainda.
                    </Typography>
                )}
            </Container>
            <NoteDialog
                open={noteDialogOpen}
                onClose={() => setNoteDialogOpen(false)}
                initialNote={{
                    itemId: noteItem?.id,
                    title: noteItem?.title || noteItem?.name,
                    media_type: noteItem?.media_type,
                    existing: NoteService.get(noteItem?.id)
                }}
                onSave={handleSaveNote}
            />

        </>
    );
}