import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/theme/theme";
import { useRegisterUser } from "@/hooks/queries/useRegisterMutation";

interface LoginFormInput {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string
}

const schema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    passwordConfirmation: Yup
        .string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .min(5, 'Must be at least 5 characters long')
        .required('Password is required'),
}).required();

export default function RegisterScreen() {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
        resolver: yupResolver(schema),
    });
    const { mutateAsync, isLoading, error } = useRegisterUser();
    const { colors } = useTheme();

    const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
        const userData = {
            username: data.email,
            password: data.password,
            name: data.name,
        };

        try {
            await mutateAsync(userData);
        } catch (err) {
            console.error("Error during registration:", err);
        }
    };

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={styles.title}>Register new user</ThemedText>

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label="Email"
                        value={value}
                        onChangeText={onChange}
                        mode="outlined"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        error={!!errors.email}
                        textColor={theme.colors.tertiary}
                    />
                )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label="Full name"
                        value={value}
                        onChangeText={onChange}
                        mode="outlined"
                        style={[styles.input, { color: colors.primary }]}
                        error={!!errors.name}
                        textColor={theme.colors.tertiary}
                    />
                )}
            />
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label="Password"
                        value={value}
                        onChangeText={onChange}
                        mode="outlined"
                        secureTextEntry
                        style={styles.input}
                        error={!!errors.password}
                        theme={{ colors: { text: "red" } }}
                        textColor={theme.colors.tertiary}
                    />
                )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}


            <Controller
                control={control}
                name="passwordConfirmation"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label="Password confirmation"
                        value={value}
                        onChangeText={onChange}
                        mode="outlined"
                        secureTextEntry
                        style={styles.input}
                        error={!!errors.password}
                        textColor={theme.colors.tertiary}
                    />
                )}
            />
            {errors.passwordConfirmation && <Text style={styles.error}>{errors.passwordConfirmation.message}</Text>}

            <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={styles.button}
                textColor={colors.secondary}
            >
                Register
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    title: {
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        marginBottom: 15,
        backgroundColor: theme.colors.secondary,
        width: "70%",
        alignSelf: "center",
        color: 'red'
    },
    button: {
        marginTop: 10,
        width: "70%",
        alignSelf: "center",
    },
    error: {
        color: theme.colors.error,
        textAlign: "center",
        marginBottom: 10,
    },
});

