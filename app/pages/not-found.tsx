import { Button, Container, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

export default function NotFoundErrorPage() {
    return (
        <Container sx={{ py: 10 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h2" color="primary" gutterBottom>
                    404
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Página não encontrada
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    A URL solicitada não existe ou foi movida.
                </Typography>

                <Button
                    variant="contained"
                    component={RouterLink}
                    to="/"
                    color="primary"
                >
                    Voltar para a Home
                </Button>
            </Paper>
        </Container>
    );
}