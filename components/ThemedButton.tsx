import React from 'react';
import { Button, ButtonProps, useTheme } from 'react-native-paper';

const ThemedButton: React.FC<ButtonProps> = ({ children, ...props }) => {
    const theme = useTheme();

    return (
        <Button {...props}>
            {children}
        </Button>
    );
};

export default ThemedButton;
