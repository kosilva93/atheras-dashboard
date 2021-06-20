import React, { lazy, useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

import MainChartExample from '../charts/MainChartExample.js'
//import store from 'src/store.js';
import { useSelector } from 'react-redux';


const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
//const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))



const Dashboard = () => {
  const stations = useSelector(state => state.stations)
  const [stationConfigurations, setConfigurationData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const ws = new WebSocket('ws://localhost:3000/ws')
  // const [totalItems, setTotalItems] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemPerPage = 1;

  let itemsToRender;

  useEffect(() => {
      ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
      }

      ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)
      this.setState({dataFromServer: message})
      console.log(message)
      }

      ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss

      }
  }, [])

  if (stations) {
    itemsToRender = stations.map(item => {
      return (
        <tr key={item.id}>
          <td><div className="small text-muted">{item.station.LocationName}</div></td>
          <td>{item.frequency}</td>
          <td>{item.station.SST}</td>
          <td>{item.schedule.SamplingTime}</td>
        </tr>
      )
    });
  }

  // if (hasError) {
  //   itemsToRender = <tr><td>Error occured</td></tr>
  // } else if (stations) {
  //   console.log("Inside render func", stations)
  //   itemsToRender = stations.map(item => {
  //     return (
  //       <tr key={item.id}>
  //         <td><div className="small text-muted">{item.station.LocationName}</div></td>
  //         <td>{item.frequency}</td>
  //         <td>{item.station.SST}</td>
  //         <td>{item.schedule.SamplingTime}</td>
  //       </tr>
  //     )
  //   });
  // } else {
  //   itemsToRender = "Loading...";
  // }

  return (
    <>
    <div style={{height: '600px'}}>
    <WidgetsDropdown />
    </div>
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
