import React, {useEffect, useRef, FC} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'


interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}
  
interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface Props {
  data: ChartData;
}
  
const BarChart: FC<Props> = ({ data }) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Уничтожаем предыдущий график, если он существует
    }

    chartRef.current = new Chart(document.getElementById('myChart') as HTMLCanvasElement, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [data]);

  return <canvas id="myChart" />;
};
  
export default BarChart;