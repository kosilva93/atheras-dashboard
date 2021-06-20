import React, { useEffect, useState } from 'react'
import { CChartLine, CChart } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import apiML from '../../api/ml'
import { useSelector } from 'react-redux';

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

const MainChartExample = attributes => {
  const previewData = useSelector(state => state.dataset)

  
  let label_test = []
  label_test = [...getUniqueLabel(previewData)]

  const dataset_test = [];
  previewData.forEach(item => {
    dataset_test.push({
      label: "Data ID: " + item.id,
      //backgroundColor: hexToRgba(brandInfo, 10),
      //borderColor: brandInfo,
      //pointHoverBackgroundColor: brandInfo,
      borderWidth: 2,
      data: createCoordinate(item.output)
    })
  })

  function createCoordinate(data) {
    let result = [];

    data.forEach(item => {
      result.push({
        x: item.results_date,
        y: item.pif
      })
    })
    return result;
  }

  function getUniqueLabel(data) {
    let result = []

    data.forEach(item => {
      item.output.forEach(element => {
        result.push(element.results_date)
      })
    })
    return [...new Set(result)]
  }

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: true
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Date',
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            max: 2
          },
          gridLines: {
            display: true
          },
          scaleLabel: {
            display: true,
            labelString: 'PIF'
          }
        }]
      },
      elements: {
        line: {
          tension: 0
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    }
  }
  )()

  // render
  return (
    <CChartLine
      {...attributes}
      datasets={dataset_test}
      options={defaultOptions}
      labels={label_test}
    //labels={["2021-06-03T09:30:00", "2021-06-03T09:45:00", "2021-06-03T10:00:00", "2021-06-03T10:15:00", "2021-06-03T10:30:00", "2021-06-03T10:45:00", "2021-06-03T11:00:00", "2021-06-03T11:15:00", "2021-06-03T11:30:00", "2021-06-03T11:45:00", "2021-06-03T12:00:00", "2021-06-03T12:15:00", "2021-06-03T12:30:00", "2021-06-03T12:45:00", "2021-06-03T13:00:00", "2021-06-03T13:15:00", "2021-06-03T13:30:00", "2021-06-03T13:45:00", "2021-06-03T14:00:00", "2021-06-03T14:15:00", "2021-06-03T14:30:00", "2021-06-03T14:45:00", "2021-06-03T15:00:00", "2021-06-03T15:15:00", "2021-06-03T15:30:00", "2021-06-03T15:45:00", "2021-06-03T16:00:00", "2021-06-03T16:15:00", "2021-06-03T16:30:00", "2021-06-03T16:45:00", "2021-06-03T17:00:00", "2021-06-03T17:15:00", "2021-06-03T17:30:00", "2021-06-03T17:45:00", "2021-06-03T18:00:00", "2021-06-03T18:15:00", "2021-06-03T18:30:00", "2021-06-03T18:45:00", "2021-06-03T19:00:00", "2021-06-03T19:15:00", "2021-06-03T19:30:00", "2021-06-03T19:45:00", "2021-06-03T20:00:00", "2021-06-03T20:15:00", "2021-06-03T20:30:00"]}
    //labels={[0.7303845425610003,0.9885931952176004,0.0275369520832729,0.0022855367829745,0.0043893114363174,0.0036831423185004,0.0013179720254156,0.0007777247442883252,0.0007364490670379315,0.0007852946589330315,0.0008794163827310201,0.0010709305891863,0.0018940745622524,0.0028278660584075,0.0041253906253809,0.0034274968918682,0.0012872636267236,0.0007784335109433675,0.0007378961855834976,0.0007410746138697607,0.0007469165958726979,0.0007469165958726979,0.0007469165958726979,0.0007469165958726979,0.0007469165958726979]}
    />
  )
}

export default MainChartExample
