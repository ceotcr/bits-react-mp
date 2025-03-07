import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import { IAuthRes } from "../../libs/types";
import { getUser } from "../../libs/apicalls/users";
import { Avatar, Box, Card, CardContent, Typography, Skeleton } from "@mui/material";
import { MdArrowBack } from "react-icons/md";
import { useAuth } from "../../store/authStore";

const User = () => {
    const params = useParams<{ id: string }>();
    const id = params.id as string;
    const { data: user, isLoading, error } = useQuery<IAuthRes>({
        queryKey: ["user", id],
        queryFn: async () => await getUser(Number(id)),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const navigate = useNavigate()
    const { user: authUser } = useAuth()

    if (!authUser || ["admin", "moderator"].includes(authUser.role) === false) {
        navigate('/login')
        return null
    }
    if (isLoading) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
                <Skeleton variant="circular" width={96} height={96} />
                <Skeleton variant="text" width={180} height={30} sx={{ mt: 2 }} />
                <Skeleton variant="text" width={220} height={20} />
            </Box>
        );
    }

    if (error || !user) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error" variant="h6">Error fetching user data</Typography>
            </Box>
        );
    }

    return (
        <Box maxWidth={800} mx="auto" p={3}>

            <Link to="/users" className="flex items-center gap-1 text-gray-600 hover:text-gray-800 mb-4">
                <MdArrowBack size={24} />
                <span>Back to Users</span>
            </Link>
            <Card sx={{ display: "flex", alignItems: "center", p: 3, mb: 3 }}>
                <Avatar src={user.image} alt={user.firstName} sx={{ width: 96, height: 96, mr: 2 }} />
                <Box>
                    <Typography variant="h5" fontWeight="bold">
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography color="text.secondary">@{user.username}</Typography>
                </Box>
            </Card>

            {[
                {
                    title: "Personal Info", details: [
                        ["Email", user.email],
                        ["Phone", user.phone],
                        ["Age", user.age],
                        ["Gender", user.gender],
                        ["Blood Group", user.bloodGroup],
                        ["Birth Date", user.birthDate],
                    ]
                },
                {
                    title: "Address", details: [
                        [`${user.address.address}, ${user.address.city}, ${user.address.state}, ${user.address.country} - ${user.address.postalCode}`],
                    ]
                },
                {
                    title: "Company", details: [
                        ["Name", user.company.name],
                        ["Title", user.company.title],
                        ["Department", user.company.department],
                        ["Location", `${user.company.address.city}, ${user.company.address.state}`],
                    ]
                },
                {
                    title: "Bank & Crypto", details: [
                        ["Bank Card", `${user.bank.cardNumber} (${user.bank.cardType})`],
                        ["IBAN", user.bank.iban],
                        ["Crypto Wallet", `${user.crypto.wallet} (${user.crypto.coin} - ${user.crypto.network})`],
                    ]
                },
            ].map((section, index) => (
                <Card key={index} sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {section.title}
                        </Typography>
                        {section.details.map(([label, value], i) => (
                            <Typography key={i} variant="body2" color="text.secondary">
                                <strong>{label}:</strong> {value}
                            </Typography>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default User;
