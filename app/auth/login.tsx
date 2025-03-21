import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/theme/theme";
import ThemedTextInput from "@/components/ThemedTextInput";
import { useLoginMutation } from "@/hooks/queries/useLoginMutation";
import { useDispatch, useSelector } from "react-redux";
import { selectState } from "@/store/selectors/sliceSelectors";
import { showSnackbar } from "@/store/snackbarSlice";


const schema = Yup.object({
    username: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const LoginScreen = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<UserLoginInput>({
        values: {
            username: "test@test.test",
            password: "password"
        },
        resolver: yupResolver(schema),
    });
    const loginMutation = useLoginMutation();
    const dispatch = useDispatch();

    const { colors } = useTheme();

    const onSubmit: SubmitHandler<UserLoginInput> = (data) => {
        loginMutation.mutate(data);
    };

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={styles.title}>Log in</ThemedText>

            <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value } }) => (
                    <ThemedTextInput
                        label="E-mail address"
                        value={value}
                        onChangeText={onChange}
                        mode="outlined"
                        style={[styles.input, { color: colors.primary }]}
                        error={!!errors.username}
                        textColor={theme.colors.tertiary}
                    />
                )}
            />
            {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <ThemedTextInput
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



            <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={styles.button}
                textColor={colors.secondary}
            >
                Log in
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

export default LoginScreen;