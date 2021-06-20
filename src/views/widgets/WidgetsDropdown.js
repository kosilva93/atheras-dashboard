import React from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader
} from '@coreui/react'
import Mapbox from '../map/Map'

const WidgetsDropdown = () => {
  // render
  return (
    <CRow  className=".flex-row">
      <CCol lg="3">
      <CCard style={{ height: '550px', width: '250px'}}>
            <CCardHeader>
              Card title
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
            <CCardFooter>Card footer</CCardFooter>
          </CCard>
        </CCol>
        <CCol lg="6">
            {/* <Mapbox style={{ height: '600px', width: '800px'}} /> */}
            <Mapbox stationID={null} style={{ height: '550px'}}/>
      </CCol> 
      <CCol lg="3"> 
      <CCard style={{ height: '550px', width: '250px'}}>
            <CCardHeader>
              Card title
            </CCardHeader>
            <CCardBody>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </CCardBody>
          </CCard>
        </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
