import React, { useState, useEffect } from 'react'
import {
  TheContent,
  TheSidebar,
  TheHeader
} from './index'

import { useDispatch, useSelector } from 'react-redux';
import apiConfig from '../api/configuration';
import * as stationActions from '../store/stations';
import apiML from '../api/ml';
import * as datasetAction from '../store/dataset';


const TheLayout = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.users.access_token);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(token) {
      setLoading(true)
      apiConfig.getAllConfiguration(token).then(response => {
        response.forEach( ({ cfg_id, cfg_title, cfg_scenario_parameters: {Frequency, Satelite, Schedule, Station} }) => {
          dispatch(stationActions.loadStations({
            id: cfg_id,
            title: cfg_title,
            frequency: Frequency,
            satellite: Satelite,
            schedule: Schedule,
            station: Station
          }))
        });
        setLoading(false)
      }).catch(error => {
          
      })

      apiML.getMLPreview(token).then(response => {
        response.forEach( ({ results_creation_date, results_id, results_output: {output} }) => {
          dispatch(datasetAction.loadPreview({
            id: results_id,
            creation_date: results_creation_date,
            output: output,
          }))
        });
      }).catch(error => {

      })
    }
  }, [])

  return (
    <>
    { loading ? <div>Loading...</div> :
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
      </div>
    </div>
}
    </>
  )
}

export default TheLayout
