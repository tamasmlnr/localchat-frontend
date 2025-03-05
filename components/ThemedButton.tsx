import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonProps, useTheme } from 'react-native-paper';

const ThemedButton: React.FC<ButtonProps> = ({ children, ...props }) => {
    const theme = useTheme();

    return (
        <Button {...props} style={styles.button} mode="contained" textColor={theme.colors.secondary}>
            {children}
        </Button>
    );
};

export default ThemedButton;

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        width: "70%",
        alignSelf: "center",
    },

});
