import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CHeaderNav,
  CBreadcrumbRouter,
} from '@coreui/react'

// routes config
import routes from '../routes'

import { 
  TheHeaderDropdown,
}  from './index'

const TheHeader = () => {
  // TO-DO
  // const dispatch = useDispatch()
  // const sidebarShow = useSelector(state => state.sidebarShow)

  
  // const toggleSidebar = () => {
  //   const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
  //   dispatch({type: 'set', sidebarShow: val})
  // }

  // const toggleSidebarMobile = () => {
  //   const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
  //   dispatch({type: 'set', sidebarShow: val})
  // }

  return (
    <CHeader withSubheader>
      <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />

      <CHeaderNav className="d-md-down-none mr-auto" />

      <CHeaderNav className="px-3 right">
        <TheHeaderDropdown/>
      </CHeaderNav>
    </CHeader>
  )
}

export default TheHeader
