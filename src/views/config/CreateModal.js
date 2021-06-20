import { useState, lazy } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { CInput } from '@coreui/react'

import apiConfig from '../../api/configuration';
import { useSelector } from 'react-redux';

const ErrorMessage = lazy(() => import('./ErrorMessage'));

const CreateModal = () => {
    const token = useSelector(state => state.users.access_token);
    const [error, setError] = useState(null);

    const ConfigurationTitle = useFormInput(''),
        StationLocationName = useFormInput(''),
        StationLatitude = useFormInput(''),
        StationLongitude = useFormInput(''),
        StationSST = useFormInput(''),
        Frequency = useFormInput(''),
        SateliteName = useFormInput(''),
        SateliteLongitude = useFormInput(''),
        ScheduleStartDate = {value: '2021-10-15T00:05:32.000Z'},
        ScheduleEndDate = {value: '2021-10-16T00:05:32.000Z'},
        ScheduleSamplingTime = {value: '10'};
        // ScheduleStartDate = useFormInput(''),
        // ScheduleEndDate = useFormInput(''),
        // ScheduleSamplingTime = useFormInput('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const ToggleButtonState = () => {
        const newConfiguration = {
            ConfigurationTitle: ConfigurationTitle.value,
            ScenarioParameters: {
                Station: {
                    LocationName: StationLocationName.value,
                    Latitude: StationLatitude.value,
                    Longitude: StationLongitude.value,
                    SST: parseInt(StationSST.value)
                },
                Frequency: parseInt(Frequency.value),
                Satelite: {
                    Name: SateliteName.value,
                    Longitude: SateliteLongitude.value
                },
                Schedule: {
                    StartDate: ScheduleStartDate.value,
                    EndDate: ScheduleEndDate.value,
                    SamplingTime: parseInt(ScheduleSamplingTime.value)
                }
            }
        };

        // console.log(newConfiguration);
        apiConfig.addConfiguration(token, newConfiguration).then(() => {
            handleClose();
        }).catch(error => {
            console.log('addConfiguration error: ' + JSON.stringify(error));
            setError(error.data.message);
        });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>Create</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                        <tbody>
                            <tr>
                                <td>Title</td>
                                <td>
                                    <CInput type="text" {...ConfigurationTitle} className="form-control" aria-label="Text input" />
                                </td>
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
                            {/* <tr>
                                <td>Schedule Start Date</td>
                                <td>
                                    <CInput type="text" {...ScheduleStartDate} className="form-control" aria-label="Text input" />
                                </td>
                            </tr>
                            <tr>
                                <td>Schedule End Date</td>
                                <td>
                                    <CInput type="text" {...ScheduleEndDate} className="form-control" aria-label="Text input" />
                                </td>
                            </tr>
                            <tr>
                                <td>Schedule Sampling Time</td>
                                <td>
                                    <CInput type="text" {...ScheduleSamplingTime} className="form-control" aria-label="Text input" />
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                    <ErrorMessage error={error} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ToggleButtonState}>
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

export default CreateModal;
