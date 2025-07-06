import { Alert as AlertMaterial, type AlertProps } from '@mui/material';
import type { ReactNode } from 'react';

interface CustomAlertProps extends AlertProps {
    children?: ReactNode;
}

export const Alert = ({ children, ...props }: CustomAlertProps) => {
    return <AlertMaterial {...props}>{children}</AlertMaterial>
}