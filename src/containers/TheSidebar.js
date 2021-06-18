import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg
} from '@coreui/react'

import { ReactComponent as FullLogo } from './logo-negative-new.svg';
//import { ReactComponent as IconLogo } from './logo-only.svg';
import apiConfig from '../api/configuration';

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  //const [newNavigation, setNewNavication] = useState([])

  useEffect(() => {
    // Get the stations from the api and dynamically populate sidebar navigation
    apiConfig.getAllConfiguration().then(response => {
      // Check if navigation is still the same. Error handling
      if (navigation.length === 2) {
      response.foreach( item => {
        navigation.push({
          _tag: 'CSidebarNavItem',
          name: item.cfg_scenario_parameters.Station.LocationName,
          to: '/station/' + item.cfg_id,
          icon: 'cil-location-pin',
        })
      })
    }
    }).catch(error => {
      // TO-DO
        //setHasError(true)
    })
  }, [])

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/dashboard">
      <CImg className="c-sidebar-brand-full" height={50} width={"100%"}>
      <FullLogo />
      </CImg>
      </CSidebarBrand>

      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
