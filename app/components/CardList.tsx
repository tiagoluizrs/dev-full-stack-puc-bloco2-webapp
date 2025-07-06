import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Box,
    IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {useNavigate} from "react-router";
import EditNoteIcon from "@mui/icons-material/EditNote";

type MediaItem = {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
    media_type: 'movie' | 'tv';
};

type CardListProps = {
    title: string;
    items: MediaItem[];
    type: 'movie' | 'tv';
    favorites: number[]; // IDs dos favoritos
    onToggleFavorite: (item: MediaItem) => void;
    onNoteClick?: (item: MediaItem) => void;
};

export const CardList = ({ title, items, favorites, onToggleFavorite, onNoteClick, type }: CardListProps) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: '100%', maxWidth: '1280px', px: 2, mb: 6 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                {title}
            </Typography>

            <Grid container={true} spacing={2}>
                {items.map((item) => {
                    const name = item.title || item.name;
                    const imagePath = item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=Sem+Imagem';
                    const isFav = favorites.includes(item.id);

                    return (
                        // @ts-ignore
                        <Grid item={true} size={{sm:12, md:4, lg:3}} key={item.id}>
                            <Card sx={{ height: '100%', position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={imagePath}
                                    alt={name}
                                />
                                <IconButton
                                    onClick={() => onToggleFavorite({ ...item, media_type: type })}
                                    sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
                                >
                                    {isFav ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                                </IconButton>
                                <IconButton
                                    onClick={() => navigate(`/item/${type}/${item.id}`) }
                                    sx={{ position: 'absolute', top: 8, left: 8, color: 'white' }}
                                >
                                    <RemoveRedEyeIcon />
                                </IconButton>
                                {onNoteClick && (
                                    <IconButton
                                        onClick={() => onNoteClick({ ...item, media_type: type })}
                                        sx={{
                                            position: 'absolute',
                                            bottom: 72,
                                            right: 8,
                                            color: 'white',
                                            filter: 'drop-shadow(1px 1px 4px rgba(0,0,0,0.7))',
                                        }}
                                    >
                                        <EditNoteIcon />
                                    </IconButton>

                                )}
                                <CardContent>
                                    <Typography variant="body1" fontWeight="medium" noWrap>
                                        {name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};