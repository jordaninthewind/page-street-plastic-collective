import { Dialog } from '@mui/material';
import { Map, Model3D, SupportUs } from '@app/sections';

const Modal = ({ onClose } = { query: false, onClose: () => { } }) => {
    const query = 'map';
    
    return (
        <Dialog open={!!query} onClose={onClose}>
            {query === 'map' && <Map />}
            {query === 'model-3d' && <Model3D />}
            {query === 'support-us' && <SupportUs />}
        </Dialog>
    )
};

export default Modal;