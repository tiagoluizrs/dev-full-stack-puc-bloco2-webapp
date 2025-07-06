import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ApiService } from '~/services/Api';
import { StorageService } from '~/services/Storage';
import { NoteService, type Note } from '~/services/Note';
import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Button,
} from '@mui/material';
import { AppBar, NoteDialog } from '~/components';

type RouteParams = {
    type: 'movie' | 'tv';
    id: string;
};

export default function ItemPage() {
    const { id, type } = useParams<RouteParams>();
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isFav, setIsFav] = useState(false);

    const [note, setNote] = useState<Note | null>(null);
    const [noteOpen, setNoteOpen] = useState(false);

    useEffect(() => {
        if (!id || !type) return;

        const fetchItem = async () => {
            try {
                setLoading(true);
                const data = await ApiService.getDetails(type, Number(id));
                const fullItem = { ...data, media_type: type };
                setItem(fullItem);
                setIsFav(StorageService.isFavorite(Number(id), type));
                const existingNote = NoteService.get(Number(id));
                setNote(existingNote || null);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id, type]);

    const handleToggleFavorite = () => {
        if (!item) return;

        if (isFav) {
            // @ts-ignore
            StorageService.removeFavorite(item.id, type);
            NoteService.delete(item.id); // opcional: remove anotação junto
            setNote(null);
        } else {
            StorageService.addFavorite({ ...item, media_type: type });
        }
        setIsFav(!isFav);
    };

    const handleSaveNote = (partial: Partial<Note>) => {
        const nova = {
            itemId: item.id,
            media_type: item.media_type,
            title: item.title || item.name,
            ...partial,
        };
        NoteService.save(nova);
        setNote(nova);
    };

    const handleDeleteNote = () => {
        NoteService.delete(item.id);
        setNote(null);
    };

    if (loading) {
        return (
            <Box textAlign="center" mt={10}>
                <CircularProgress />
            </Box>
        );
    }

    if (!item) {
        return (
            <Container sx={{ py: 10 }}>
                <Typography variant="h6">Item não encontrado.</Typography>
            </Container>
        );
    }

    const title = item.title || item.name;
    const poster = item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : 'https://via.placeholder.com/300x450?text=Sem+Imagem';

    return (
        <>
            <AppBar />
            <Container sx={{ py: 6 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {title}
                </Typography>

                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
                    <Box flexShrink={0}>
                        <img
                            src={poster}
                            alt={title}
                            style={{ width: 300, borderRadius: 8 }}
                        />
                    </Box>

                    <Box flex={1}>
                        <Typography variant="body1" mb={2}>
                            {item.overview || 'Descrição não disponível.'}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Lançamento: {item.release_date || item.first_air_date || '—'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Popularidade: {item.popularity}
                        </Typography>

                        <Button
                            variant={isFav ? 'outlined' : 'contained'}
                            color="primary"
                            onClick={handleToggleFavorite}
                            sx={{ mt: 2 }}
                        >
                            {isFav ? 'Remover da Minha Lista' : 'Adicionar à Minha Lista'}
                        </Button>

                        {isFav && (
                            <Box mt={4}>
                                <Typography variant="h6" gutterBottom>
                                    📝 Sua Anotação
                                </Typography>

                                {note ? (
                                    <>
                                        {note.rating && (
                                            <Typography>Avaliação: {note.rating}/10</Typography>
                                        )}
                                        {note.episodesWatched && (
                                            <Typography>
                                                Episódios assistidos: {note.episodesWatched}
                                            </Typography>
                                        )}
                                        {note.comment && (
                                            <Typography color="text.secondary" mt={1}>
                                                {note.comment}
                                            </Typography>
                                        )}
                                        <Box mt={2} display="flex" gap={1}>
                                            <Button variant="outlined" onClick={() => setNoteOpen(true)}>
                                                Editar
                                            </Button>
                                            <Button color="error" onClick={handleDeleteNote}>
                                                Excluir Anotação
                                            </Button>
                                        </Box>
                                    </>
                                ) : (
                                    <Button sx={{ mt: 2 }} onClick={() => setNoteOpen(true)}>
                                        ✏️ Adicionar Anotação
                                    </Button>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>

            {item && (
                <NoteDialog
                    open={noteOpen}
                    onClose={() => setNoteOpen(false)}
                    initialNote={{
                        itemId: item.id,
                        media_type: item.media_type,
                        title: title,
                        existing: note || undefined,
                    }}
                    onSave={handleSaveNote}
                />
            )}
        </>
    );
}