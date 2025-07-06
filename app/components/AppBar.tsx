import {
    AppBar as MuiAppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Search } from './Search';
import { useLocation } from 'react-router';
import { useState } from 'react';

type AppBarProps = {
    onSearch?: (query: string) => void;
};

export const AppBar = ({ onSearch }: AppBarProps) => {
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [drawerOpen, setDrawerOpen] = useState(false);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Minha Lista', href: '/my-list' },
    ];

    return (
        <>
            <MuiAppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Branding + Navegação */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <Typography variant="h6" component="div">
                            CineSync
                        </Typography>

                        {!isMobile && (
                            navItems.map((item) => (
                                <Button
                                    key={item.href}
                                    href={item.href}
                                    color="inherit"
                                    variant={
                                        location.pathname === item.href ? 'outlined' : 'text'
                                    }
                                    sx={{ textTransform: 'none' }}
                                >
                                    {item.label}
                                </Button>
                            ))
                        )}
                    </Box>

                    {/* Ações */}
                    <Box display="flex" alignItems="center" gap={1}>
                        {onSearch && !isMobile && (
                            <Search onSearch={onSearch} />
                        )}

                        {isMobile && (
                            <IconButton
                                onClick={() => setDrawerOpen(true)}
                                color="inherit"
                                edge="end"
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </MuiAppBar>

            {/* Drawer para mobile */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ width: 250, p: 2 }}>
                    {onSearch && (
                        <Box mb={2}>
                            <Search onSearch={onSearch} />
                        </Box>
                    )}
                    <List>
                        {navItems.map((item) => (
                            // @ts-ignore
                            <ListItem button key={item.href} component="a" href={item.href}>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight:
                                            location.pathname === item.href ? 'bold' : 'normal',
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};