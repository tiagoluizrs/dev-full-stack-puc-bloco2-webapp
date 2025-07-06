import { InputBase, Paper } from '@mui/material';
import { useEffect, useState } from 'react';

type SearchProps = {
    onSearch: (query: string) => void;
};

export const Search = ({ onSearch }: SearchProps) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(value.trim());
        }, 500); // tempo do debounce (em ms)

        return () => clearTimeout(timeout);
    }, [value, onSearch]);

    return (
        <Paper
            sx={{ display: 'flex', alignItems: 'center', width: 300, px: 1 }}
            elevation={1}
        >
            <InputBase
                placeholder="Buscar filmes ou séries..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                fullWidth
                inputProps={{ 'aria-label': 'buscar' }}
            />
        </Paper>
    );
};