import React from 'react';
import { SimpleBarChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import { ScaleTypes } from '@carbon/charts/interfaces';
import IChartData from '../../shared/interfaces/IChartData.interface';

interface CapturesByTypeProps {
  data: Array<IChartData>;
}
const CapturesByType: React.FC<CapturesByTypeProps> = ({ data }) => {
  const options = {
    title: 'Capturas por tipo',
    axes: {
      bottom: {
        title: 'Tipos',
        mapsTo: 'group',
        scaleType: 'labels' as ScaleTypes,
      },
      left: {
        title: 'Número de capturas',
        mapsTo: 'value',
      },
    },
    height: '400px',
  };

  return <SimpleBarChart options={options} data={data} />;
};

export default CapturesByType;
