import { Button as ButtonMaterial, type ButtonProps } from '@mui/material';
import type { ReactNode } from 'react';

interface CustomButtonProps extends ButtonProps {
    children?: ReactNode;
}

export const Button = ({ children, ...props }: CustomButtonProps) => {
    return <ButtonMaterial {...props}>{children}</ButtonMaterial>
}