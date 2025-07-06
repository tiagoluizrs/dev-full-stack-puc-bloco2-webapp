import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Box, Snackbar, Alert, Typography
} from '@mui/material';
import { useState, useEffect } from 'react';

type NoteDialogProps = {
    open: boolean;
    onClose: () => void;
    initialNote: {
        itemId: number;
        title: string;
        media_type: 'movie' | 'tv';
        existing?: {
            rating?: number;
            episodesWatched?: number;
            comment?: string;
        };
    };
    onSave: (note: { rating?: number; episodesWatched?: number; comment?: string }) => void;
};

export const NoteDialog = ({ open, onClose, initialNote, onSave }: NoteDialogProps) => {
    const [rating, setRating] = useState<number | ''>('');
    const [episodesWatched, setEpisodesWatched] = useState<number | ''>('');
    const [comment, setComment] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const isValid =
        // @ts-ignore
        (initialNote.media_type === 'movie' && rating >= 1 && rating <= 10) ||
        // @ts-ignore
        (initialNote.media_type === 'tv' && episodesWatched >= 1);

    const commentTooShort = comment.length < 50;
    const disableSave = !isValid || commentTooShort;


    useEffect(() => {
        if (initialNote?.existing) {
            setRating(initialNote.existing.rating ?? '');
            setEpisodesWatched(initialNote.existing.episodesWatched ?? '');
            setComment(initialNote.existing.comment ?? '');
        } else {
            setRating('');
            setEpisodesWatched('');
            setComment('');
        }
    }, [initialNote]);

    const handleSave = () => {
        try{
            onSave({
                rating: typeof rating === 'number' ? rating : undefined,
                episodesWatched: typeof episodesWatched === 'number' ? episodesWatched : undefined,
                comment,
            });
            setAlertMessage('Anotação salva com sucesso!');
            setShowSnackbar(true);
            onClose();
        } catch (error) {
            setAlertMessage('Erro ao salvar a anotação. Tente novamente.');
            setShowSnackbar(true);
            onClose();
        }
    };


    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Anotação para: {initialNote.title}</DialogTitle>
                <DialogContent>
                    <Box mt={1} display="flex" flexDirection="column" gap={2}>
                        {initialNote.media_type === 'movie' && (
                            <TextField
                                label="Sua nota (1 a 10)"
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                // @ts-ignore
                                error={rating < 1 || rating > 10}
                                helperText="Nota obrigatória de 1 a 10"
                                fullWidth
                                required
                            />
                        )}


                        {initialNote.media_type === 'tv' && (
                            <TextField
                                label="Episódios assistidos"
                                type="number"
                                value={episodesWatched}
                                onChange={(e) => setEpisodesWatched(Number(e.target.value))}
                                // @ts-ignore
                                error={episodesWatched < 1}
                                helperText="Informe quantos episódios você já assistiu"
                                fullWidth
                                required
                            />
                        )}


                        <TextField
                            label="Comentário (min. 50)"
                            multiline
                            minRows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            error={commentTooShort}
                            helperText={commentTooShort ? 'Min de 50 caractéres' : ''}
                            fullWidth
                        />
                        <Typography component="p" color="textSecondary">{comment.length} caractéres</Typography>

                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        disabled={disableSave}
                    >
                        Salvar
                    </Button>

                </DialogActions>
            </Dialog>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowSnackbar(false)}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
