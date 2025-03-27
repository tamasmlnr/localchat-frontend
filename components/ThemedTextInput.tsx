import React from 'react';
import { TextInput, useTheme, TextInputProps } from "react-native-paper";
import { StyleSheet } from "react-native";
import { theme } from "@/theme/theme";

const ThemedTextInput = (props: TextInputProps) => {
    const { colors } = useTheme();

    return (
        <TextInput
            {...props}
            textColor={colors.tertiary}
            testID={props.id ?? `${props.label}-field`}
            style={styles.input}
        />
    );
};


const styles = StyleSheet.create({
    input: {
        marginBottom: 15,
        backgroundColor: theme.colors.secondary,
        width: "70%",
        alignSelf: "center",
        color: 'red'
    },

});

export default ThemedTextInput;