import { FormControl, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoginSchema, TLoginSchema } from "../../../libs/schemas/userAuth";
import { useAuth } from "../../../store/authStore";
import { login } from "../../../libs/apicalls/auth";
import { useLocation, useNavigate } from "react-router";

const LoginForm = () => {
    const { setUser } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors: fieldErrors },
    } = useForm<TLoginSchema>({
        resolver: zodResolver(LoginSchema),
        mode: "onChange",
    });
    const navigate = useNavigate()
    const location = useLocation()
    const { isPending, mutate, isError: isErorOnSubmit, error: submitError } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setUser(data);
            const redirectPath = location.state?.from || "/";
            navigate(redirectPath);
        },
        onError: () => {
            setUser(null);
        },
        retry: 1
    });

    const onSubmit = (data: TLoginSchema) => {
        mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full md:max-w-md rounded-lg"
        >
            <FormControl fullWidth margin="normal" error={!!fieldErrors.username}>
                <TextField
                    label="Username"
                    {...register("username")}
                    error={isErorOnSubmit || !!fieldErrors.username}
                    helperText={fieldErrors.username?.message}
                />
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!fieldErrors.password}>
                <TextField
                    label="Password"
                    type="password"
                    {...register("password")}
                    error={isErorOnSubmit || !!fieldErrors.password}
                    helperText={fieldErrors.password?.message}
                />
            </FormControl>
            {isErorOnSubmit && <Typography color="error">{submitError?.message}</Typography>}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={isPending}
                loading={isPending}
                loadingPosition="start"
                sx={{ mt: 1 }}
            >
                {isPending ? "Logging in..." : "Login"}
            </Button>
        </form>
    );
};

export default LoginForm;
