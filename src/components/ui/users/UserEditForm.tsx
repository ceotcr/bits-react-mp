import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { IAuthRes } from "../../../libs/types";

const UserEditForm = ({ user, onSubmit, onCancel }: {
    user: IAuthRes,
    onSubmit: (data: Partial<IAuthRes>) => void,
    onCancel: () => void
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        }
    });

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} p={3}>
            <h2>Edit User</h2>
            <br />
            <TextField
                fullWidth
                label="First Name"
                {...register("firstName", { required: "First name is required" })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                margin="dense"
            />
            <TextField
                fullWidth
                label="Last Name"
                {...register("lastName", { required: "Last name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                margin="dense"
            />
            <TextField
                fullWidth
                label="Email"
                type="email"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
                margin="dense"
            />
            <TextField
                fullWidth
                label="Phone"
                {...register("phone", { required: "Phone number is required" })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                margin="dense"
            />
            <Box mt={2} display="flex" justifyContent="space-between">
                <Button onClick={onCancel} color="secondary">Cancel</Button>
                <Button type="submit" variant="contained" color="primary">Save</Button>
            </Box>
        </Box>
    );
};

export default UserEditForm;
