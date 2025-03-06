import { useReducer, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Stack, IconButton, Dialog, Pagination } from '@mui/material';
import { MdEdit } from 'react-icons/md';
import { getUsers, updateUser } from '../../libs/apicalls/users';
import Filters from '../ui/users/UserFilters';
import { useUsersStore } from '../../store/usersStore';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router';
import UserEditForm from '../ui/users/UserEditForm';
import { IAuthRes } from '../../libs/types';
import { useSnackbar } from '../../store/snackbarStore';

const Users = () => {
    const { users, setUsers, updateUser: updateStoreUser, pages } = useUsersStore();
    const [selectedUser, setSelectedUser] = useState<IAuthRes | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const [filters, handleFilterChange] = useReducer((state, action) => {
        switch (action.type) {
            case "SET_SEARCH":
                return { ...state, search: action.payload, filterKey: "", filterValue: "" };
            case "SET_FILTER_KEY":
                return { ...state, filterKey: action.payload, search: "", filterValue: "" };
            case "SET_FILTER_VALUE":
                return { ...state, filterValue: action.payload, search: "" };
            case "SET_PAGE":
                return { ...state, page: Number(action.payload) };
            default:
                return state;
        }
    }, {
        search: "",
        filterKey: "",
        filterValue: "",
        page: 1
    });
    const { isLoading, error } = useQuery({
        queryKey: ["users", filters],
        queryFn: async () => {
            const response = await getUsers({
                page: Number(filters.page),
                search: filters.search,
                filter: {
                    key: filters.filterKey,
                    value: filters.filterValue
                }
            });
            setUsers(response);
            return response.users;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
    const { showSnackbar } = useSnackbar();
    const mutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            updateStoreUser(data);
            setOpenDialog(false);
            showSnackbar({ message: "User updated successfully", severity: "success" });
        },
        onError: (error) => {
            showSnackbar({ message: error.message, severity: "error" });
        }
    });

    const handleEditClick = (user: IAuthRes) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    return (
        <Stack spacing={2} pb={8}>
            <Filters
                filters={filters}
                filterKeyValues={[
                    { key: "role", values: ["admin", "user", "moderator"] },
                    { key: "gender", values: ["male", "female"] }
                ]}
                dispatch={handleFilterChange}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Typography>Loading...</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                        {error && (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Typography>Error: {error.message}</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                        {!error && !isLoading && users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Typography>No users found</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Avatar src={user.image} alt={user.firstName} />
                                </TableCell>
                                <TableCell>
                                    <Link to={`/users/${user.id}`} className='!whitespace-nowrap underline'>
                                        {user.firstName} {user.lastName}
                                    </Link>
                                </TableCell>
                                <TableCell className='!whitespace-nowrap'>{user.email}</TableCell>
                                <TableCell className='!whitespace-nowrap'>{user.phone}</TableCell>
                                <TableCell className='!whitespace-nowrap'>{user.gender}</TableCell>
                                <TableCell>{user.company.name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEditClick(user)}>
                                        <MdEdit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                {selectedUser && (
                    <UserEditForm
                        user={selectedUser}
                        onSubmit={(updatedUser) => mutation.mutate(updatedUser)}
                        onCancel={() => setOpenDialog(false)}
                    />
                )}
            </Dialog>

            <Pagination className="fixed bottom-4 bg-white p-2 rounded-lg right-4 !max-w-[400px]" count={pages} shape="rounded" page={filters.page} onChange={(_e, value) => handleFilterChange({ type: "SET_PAGE", payload: String(value) })} />
        </Stack>
    );
};

export default Users;
