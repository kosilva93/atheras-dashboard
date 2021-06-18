import React from 'react'
import { CChartPie } from '@coreui/react-chartjs'
//import { getStyle, hexToRgba } from '@coreui/utils'

const PieChart = attributes => {
    const random = (min, max)=>{
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

      let elements = 5;
      const data1 = [];
      for (let i = 0; i < elements; i++) {
        data1.push(random(50, 200))
      }

    const defaultData = [{
          label: 'My First Dataset',
          data: data1,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(0, 205, 0)',
            'rgb(200, 0, 200)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }];
    
    const defaultOptions = {
        aspectRatio: 1
    };
    

    return (
      <CChartPie
          {...attributes}
          datasets={defaultData}
          options={defaultOptions}
          labels= {['Red', 'Blue', 'Green','Purple','Yellow']}
      />
    );
}

export default PieChart
