import React, { lazy, useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

import MainChartExample from '../charts/MainChartExample.js'
import apiConfig from '../../api/configuration'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
//const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))


const Dashboard = () => {
  const [stationConfigurations, setConfigurationData] = useState([]);
  const [hasError, setHasError] = useState(false);
  // const [totalItems, setTotalItems] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemPerPage = 1;

  useEffect(() => {
    apiConfig.getAllConfiguration().then(response => {
      setConfigurationData(response)
      setHasError(false)
    }).catch(error => {
        setHasError(true)
    })
  }, [])

  let itemsToRender;

  if (hasError) {
    itemsToRender = <tr><td>Error occured</td></tr>
  } else if (stationConfigurations) {
    itemsToRender = stationConfigurations.map(item => {
      return (
        <tr key={item.cfg_id}>
          <td><div className="small text-muted">{item.cfg_scenario_parameters.Station.LocationName}</div></td>
          <td>{item.cfg_scenario_parameters.Frequency}</td>
          <td>{item.cfg_scenario_parameters.Station.SST}</td>
          <td>{item.cfg_scenario_parameters.Schedule.SamplingTime}</td>
        </tr>
      )
    });
  } else {
    itemsToRender = "Loading...";
  }

  return (
    <>
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          
          <MainChartExample style={{ height: '300px', marginTop: '40px' }} />
        
        </CCardBody>
      </CCard>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Stations Details
            </CCardHeader>
            <CCardBody>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th>Ground Station Name</th>
                    <th>Frequency</th>
                    <th>SST</th>
                    <th>Minutes of outage last hour</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsToRender}
                </tbody>
              </table>
              <nav className="d-flex justify-content-center">
                <ul className="pagination">
                  <li className="page-link">1</li>
                  <li className="page-link">2</li>
                  <li className="page-link">3</li>
                </ul>
              </nav>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
