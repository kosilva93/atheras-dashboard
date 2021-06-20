import React, { useEffect, useState } from 'react'
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
import * as uiActions from '../store/ui'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  const stations = useSelector(state => state.stations)
  let cleanNavigation = navigation;
  let newNavigation = cleanNavigation;


  useEffect(() => {
    // Get the stations from the api and dynamically populate sidebar navigation
    // apiConfig.getAllConfiguration(token).then(response => {
    //   // Check if navigation is still the same. Error handling
      
    // }).catch(error => {
    //   // TO-DO
    //     //setHasError(true)
    // })
  }, [])

  if (navigation.length === 3) {
    stations.forEach( item => {
    navigation.push({
      _tag: 'CSidebarNavItem',
      name: item.station.LocationName,
      to: '/station/' + item.id,
      icon: 'cil-location-pin'
    })
  })
}
//}

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch(uiActions.set({ sidebarShow: val }))}
    >
      <CSidebarBrand className="d-md-down-none" to="/dashboard">
      <CImg className="c-sidebar-brand-full" height={50} width={"100%"}>
      <FullLogo />
      </CImg>
      </CSidebarBrand>

      <CSidebarNav>

        <CCreateElement
          items={newNavigation}
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
