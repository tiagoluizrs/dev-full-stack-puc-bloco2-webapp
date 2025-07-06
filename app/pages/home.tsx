import { useEffect, useState } from 'react';
import { usePopular } from '~/hooks/usePopular';
import { ApiService } from '~/services/api';
import { StorageService } from '~/services/storage';
import { CardList } from '~/components/CardList';
import { AppBar } from '~/components/AppBar';
import { Container, Box, CircularProgress } from '@mui/material';
import {Alert, Snackbar} from "~/components";

export const HomePage = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[] | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    const { data: filmes, loading: loadingFilmes } = usePopular('movie');
    const { data: series, loading: loadingSeries } = usePopular('tv');

    useEffect(() => {
        const favs = StorageService.getAllFavoriteIds();
        setFavorites(favs);
    }, []);

    const handleToggleFavorite = (item: any) => {
        const isFav = favorites.includes(item.id);
        const name = item.title || item.name;

        if (isFav) {
            StorageService.removeFavorite(item.id, item.media_type);
            setAlertMessage(`"${name}" removido da sua lista`);
        } else {
            StorageService.addFavorite(item);
            setAlertMessage(`"${name}" adicionado à sua lista`);
        }

        const updated = StorageService.getAllFavoriteIds();
        setFavorites(updated);
        setAlertOpen(true);
    };


    const handleSearch = async (term: string) => {
        const cleaned = term.trim();
        setQuery(cleaned);

        if (!cleaned) {
            setSearchResults(null);
            return;
        }

        const [movieData, tvData] = await Promise.all([
            ApiService.search('movie', cleaned),
            ApiService.search('tv', cleaned),
        ]);
        setSearchResults([...movieData.results, ...tvData.results]);
    };


    const resultMovies = searchResults?.filter(item => item.media_type === 'movie' || item.title);
    const resultSeries = searchResults?.filter(item => item.media_type === 'tv' || item.name);

    return (
        <>
            <AppBar onSearch={handleSearch} />
            <Container sx={{ mt: 4, pb: 4 }}>
                {query && searchResults ? (
                    <>
                        {!!resultMovies?.length && (
                            <CardList
                                title={`🎬 Filmes encontrados para: "${query}"`}
                                items={resultMovies}
                                favorites={favorites}
                                type={"movie"}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        )}
                        {!!resultSeries?.length && (
                            <CardList
                                title={`📺 Séries encontradas para: "${query}"`}
                                items={resultSeries}
                                favorites={favorites}
                                type={"tv"}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        )}
                        {!resultMovies?.length && !resultSeries?.length && (
                            <Box mt={4} textAlign="center" color="text.secondary">
                                Nenhum resultado encontrado para “{query}”.
                            </Box>
                        )}
                    </>
                ) : (
                    <>
                        {loadingFilmes ? (
                            <Box mb={4}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <CardList
                                title="🎬 Filmes Populares"
                                items={filmes}
                                favorites={favorites}
                                type={"movie"}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        )}

                        {loadingSeries ? (
                            <Box mt={2}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <CardList
                                title="📺 Séries Populares"
                                items={series}
                                favorites={favorites}
                                type={"tv"}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        )}
                    </>
                )}
            </Container>
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setAlertOpen(false)}>
                    {alertMessage}
                </Alert>
            </Snackbar>

        </>
    );
};