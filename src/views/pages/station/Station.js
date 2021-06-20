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
import { useSelector } from 'react-redux';


//const WidgetsDropdown = lazy(() => import('../../widgets/WidgetsDropdown.js'))
//const WidgetsBrand = lazy(() => import('../../widgets/WidgetsBrand.js'))

const Station = ({ match }) => {
  const station = useSelector(state => state.stations.find(item => item.id === parseInt(match.params.id)));
  // const station = stations.find(item => item.id.toString() === match.params.id)
  // const stationDetails = station ? station :
  //   [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]];
  const [stationDetails, setStation] = useState([])

  useEffect(() => {
    setStation({
      id: station.id,
      name: station.station.LocationName,
      latitude: station.station.Latitude,
      longitude: station.station.Longitude,
      satellite: station.satellite.Name,
      frequency: station.frequency,
      SST: station.station.SST
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
          <Mapbox stationID={match.params.id} />
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
                      <div className="small text-muted">{stationDetails.satellite}</div>
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
