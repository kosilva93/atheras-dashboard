import React, { lazy, useState, useEffect } from 'react';
import { CCard } from '@coreui/react';
import apiConfig from '../../api/configuration';
import { useSelector } from 'react-redux';

const EditModal = lazy(() => import('./EditModal'));
const CreateModal = lazy(() => import('./CreateModal'));

const Config = () => {
  const token = useSelector(state => state.users.access_token);
  const [stationConfigurations, setConfigurationData] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    apiConfig.getAllConfiguration(token).then(response => {
      setConfigurationData(response)
      setHasError(false)
    }).catch(error => {
      setHasError(true)
    });
  }, []);

  let itemsToRender;

  if (hasError || stationConfigurations === [] || stationConfigurations.message) {
    itemsToRender = <tr><td>Error occured</td></tr>
  } else if (stationConfigurations) {
    itemsToRender = stationConfigurations.map(item => {
      return (
        <tr key={item.cfg_id}>
          <td>
            {item.cfg_title}
          </td>
          <td>
            <input type="text" className="form-control" aria-label="Text input" value={item.cfg_scenario_parameters.Station.LocationName} readOnly></input>
          </td>
          <td>
            <input type="text" className="form-control" aria-label="Text input" value={item.cfg_scenario_parameters.Station.Latitude} readOnly></input>
          </td>
          <td>
            <input type="text" className="form-control" aria-label="Text input" value={item.cfg_scenario_parameters.Station.Longitude} readOnly></input>
          </td>
          <td>
            <input type="text" className="form-control" aria-label="Text input" value={item.cfg_scenario_parameters.Frequency} readOnly></input>
          </td>
          <td>
            <input type="text" className="form-control" aria-label="Text input" value={item.cfg_scenario_parameters.Station.SST} readOnly></input>
          </td>
          <td>
            <input type="text" className="form-control" aria-label="Text input" value={item.cfg_scenario_parameters.Satelite.Name} readOnly></input>
          </td>
          <td>
            <EditModal config={item} />
          </td>
        </tr>
      );
    });
  } else {
    itemsToRender = <tr><td>Loading...</td></tr>;
  }

  return (
    <>
      <CCard>
        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
          <thead className="thead-light">
            <tr>
              <th></th>
              <th>Station Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Frequency</th>
              <th>SST</th>
              <th>Satellite</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {itemsToRender}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <CreateModal />
              </td>
            </tr>
          </tbody>
        </table>
      </CCard>
    </>
  );
}

export default Config;
