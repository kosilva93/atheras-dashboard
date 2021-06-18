import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow
} from '@coreui/react'
//import CIcon from '@coreui/icons-react'
import MainChartExample from '../../charts/MainChartExample.js'
import PieChart from '../../charts/PieChart.js'
import Mapbox from '../../map/Map';
import apiConfig from '../../../api/configuration'

//const WidgetsDropdown = lazy(() => import('../../widgets/WidgetsDropdown.js'))
//const WidgetsBrand = lazy(() => import('../../widgets/WidgetsBrand.js'))

const Station = ({ match }) => {
  // const station = stations.find(item => item.id.toString() === match.params.id)
  // const stationDetails = station ? station :
  //   [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]];
  const [stationDetails, setStation] = useState([])

  useEffect(() => {
    apiConfig.getConfiguration(match.params.id).then(response => {
      setStation({
        id: response.cfg_id,
        name: response.cfg_scenario_parameters.Station.LocationName,
        latitude: response.cfg_scenario_parameters.Station.Latitude,
        longitude: response.cfg_scenario_parameters.Station.Longitude,
        sattelite: response.cfg_scenario_parameters.Satelite.Name,
        frequency: response.cfg_scenario_parameters.Frequency,
        SST: response.cfg_scenario_parameters.Station.SST
      })
    }).catch(error => {
      // TO-DO
      //setHasError(true)
    })
  }, [match.params.id])

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <MainChartExample style={{ height: '120px', marginTop: '20px' }} />
          </CCard>
          <CCard>
            <MainChartExample style={{ height: '120px', marginTop: '20px' }} />
          </CCard>
        </CCol>
        <CCol>
          <Mapbox />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CRow>
            <CCol>
              <CCard>
                <PieChart />
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <PieChart />
              </CCard>
            </CCol>
          </CRow>
        </CCol>
        <CCol>
          <CCard>
            <CCardBody>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th>System Configuration</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="small text-muted">Name</div>
                    </td>
                    <td>
                      <div className="small text-muted">{stationDetails.name}</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="small text-muted">Latitude</div>
                    </td>
                    <td>
                      <div className="small text-muted">{stationDetails.latitude}</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="small text-muted">Longitude</div>
                    </td>
                    <td>
                      <div className="small text-muted">{stationDetails.longitude}</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="small text-muted">Satellite</div>
                    </td>
                    <td>
                      <div className="small text-muted">{stationDetails.sattelite}</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="small text-muted">Frequency</div>
                    </td>
                    <td>
                      <div className="small text-muted">{stationDetails.frequency} GHz</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="small text-muted">SST</div>
                    </td>
                    <td>
                      <div className="small text-muted">{stationDetails.SST} dB</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

export default Station;
