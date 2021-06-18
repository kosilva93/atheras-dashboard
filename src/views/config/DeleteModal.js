import { useState, lazy } from 'react'
import { Modal, Dropdown, Button } from 'react-bootstrap'
import { CCard } from '@coreui/react'
  import CIcon from '@coreui/icons-react'

import apiConfig from '../../api/configuration';

const ErrorMessage = lazy(() => import('./ErrorMessage'));

const DeleteModal = (config) => {
    const [error, setError] = useState(null);

    config = config.config;
    // console.log(JSON.stringify(config));

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const toggleButtonState = () => {
        // console.log('deleting ' + JSON.stringify(config));
        apiConfig.deleteConfiguration(config.cfg_id).then(() => {
            handleClose();
        }).catch(error => {
            console.log('deleteConfiguration error: ' + JSON.stringify(error));
            setError(error.data.message);
        });
    };

    return (
        <>
            <Dropdown.Item onClick={handleShow}><CIcon name="cil-trash" />&nbsp;Delete</Dropdown.Item>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CCard>Are you sure you want to delete "{config.cfg_title}"?</CCard>
                    <ErrorMessage error={error} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={toggleButtonState}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal;