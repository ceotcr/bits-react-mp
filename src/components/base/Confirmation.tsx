import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Confirmation = ({
    title,
    description,
    open,
    handleClose,
    handleYes,
    handleNo,
    isLoading
}: {
    isLoading?: boolean,
    title: string,
    description?: string,
    open: boolean,
    handleClose: () => void,
    handleYes: () => void
    handleNo: () => void
}) => {
    return (
        <Dialog
            open={open}
            onClose={() => {
                if (!isLoading) {
                    handleClose()
                }
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {
                        description && <div>{description}</div>
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='error' onClick={handleNo} disabled={isLoading}>No</Button>
                <Button onClick={handleYes} autoFocus disabled={isLoading}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default Confirmation