import React from 'react';
import { Chart } from 'react-google-charts';


const ChartComp = ({ data, options, type }) => {
  return (
    <Chart
      chartType={type}
      data={data}
      options={options}
    />
  );
};

export default ChartComp;
