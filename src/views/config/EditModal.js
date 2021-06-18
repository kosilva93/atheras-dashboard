import { useState, lazy } from 'react'
import { Modal, Button, Dropdown, ButtonGroup } from 'react-bootstrap'
import { CInput } from '@coreui/react'

import apiConfig from '../../api/configuration';

const DeleteModal = lazy(() => import('./DeleteModal'));
const ErrorMessage = lazy(() => import('./ErrorMessage'));

const EditModal = (config) => {
    const [error, setError] = useState(null);

    config = config.config;
    // console.log(JSON.stringify(config));

    const StationLocationName = useFormInput(config.cfg_scenario_parameters.Station.LocationName),
        StationLatitude = useFormInput(config.cfg_scenario_parameters.Station.Latitude),
        StationLongitude = useFormInput(config.cfg_scenario_parameters.Station.Longitude),
        StationSST = useFormInput(config.cfg_scenario_parameters.Station.SST),
        Frequency = useFormInput(config.cfg_scenario_parameters.Frequency),
        SateliteName = useFormInput(config.cfg_scenario_parameters.Satelite.Name),
        SateliteLongitude = useFormInput(config.cfg_scenario_parameters.Satelite.Longitude);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const toggleButtonState = () => {
        const editConfiguration = {
            Station: {
                LocationName: StationLocationName.value,
                Latitude: Number.isInteger(StationLatitude.value) ? StationLatitude.value.toFixed(1) : StationLatitude.value + '',
                Longitude: Number.isInteger(StationLongitude.value) ? StationLongitude.value.toFixed(1) : StationLongitude.value + '',
                SST: StationSST.value
            },
            Frequency: Frequency.value,
            Satelite: {
                Name: SateliteName.value,
                Longitude: Number.isInteger(SateliteLongitude.value) ? SateliteLongitude.value.toFixed(1) : SateliteLongitude.value + ''
            }
        };

        // console.log('patching with ' + JSON.stringify(editConfiguration));
        apiConfig.updateConfiguration(config.cfg_id, editConfiguration).then(() => {
            handleClose();
        }).catch(error => {
            console.log('updateConfiguration error: ' + JSON.stringify(error));
            setError(error.data.message);
        });
    };

    return (
        <>
            <Dropdown as={ButtonGroup}>
                <Button variant="primary" onClick={handleShow}>Edit</Button>
                <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
                <Dropdown.Menu>
                    <DeleteModal config={config} />
                </Dropdown.Menu>
            </Dropdown>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                        <tbody>
                            <tr>
                                <td>Configuration Title</td>
                                <td>{config.cfg_title}</td>
                            </tr>
                            <tr>
                                <td>Station Name</td>
                                <td>
                                    <CInput type="text" {...StationLocationName} className="form-control" aria-label="Text input" />
                                </td>
                            </tr>
                            <tr>
                                <td>Station Latitude</td>
                                <td>
                                    <CInput type="text" {...StationLatitude} className="form-control" aria-label="Text input" />
                                </td>
                            </tr>
                            <tr>
                                <td>Station Longitude</td>
                                <td>
                                    <CInput type="text" {...StationLongitude} className="form-control" aria-label="Text input" />
                                </td>
                            </tr>
                            <tr>
                                <td>Station SST</td>
                                <td>
                                    <CInput type="text" {...StationSST} className="form-control" aria-label="Text input" />
                                </td>
                            </tr>
                            <tr>
                                <td>Frequency</td>
                                <td>
                                    <CInput type="text" {...Frequency} className="form-control" aria-label="Text input" />
                                </td>
                            </tr>
                            <tr>
                                <td>Satellite Name</td>
                                <td>
                                    <CInput type="text" {...SateliteName} className="form-control" aria-label="Text input" />
                                </td>
                            </tr>
                            <tr>
                                <td>Satellite Longitude</td>
                                <td>
                                    <CInput type="text" {...SateliteLongitude} className="form-control" aria-label="Text input" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <ErrorMessage error={error} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={toggleButtonState}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default EditModal;
