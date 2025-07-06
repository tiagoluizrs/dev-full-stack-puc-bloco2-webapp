import { Grid as GridMaterial, type GridProps } from '@mui/material';
import type { ReactNode } from 'react';

interface CustomGridProps extends GridProps {
    children?: ReactNode;
}

export const Grid = ({ children, ...props }: CustomGridProps) => {
    return <GridMaterial {...props}>{children}</GridMaterial>
}