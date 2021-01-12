import React from 'react';
import { DonutChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import { ScaleTypes, Alignments } from '@carbon/charts/interfaces';
import IChartData from '../../shared/interfaces/IChartData.interface';

interface CapturesByRegionProps {
  data: Array<IChartData>;
}
const CapturesByRegion: React.FC<CapturesByRegionProps> = ({ data }) => {
  const options = {
    title: 'Capturas por região',
    axes: {
      bottom: {
        title: 'Regiões',
        mapsTo: 'group',
        scaleType: 'labels' as ScaleTypes,
      },
      left: {
        title: 'Número de capturas',
        mapsTo: 'value',
      },
    },
    legend: {
      alignment: 'center' as Alignments,
    },
    donut: {
      center: {
        label: 'Pokémons',
      },
      alignment: 'center' as Alignments,
    },
    height: '400px',
  };

  return <DonutChart options={options} data={data} />;
};

export default CapturesByRegion;
