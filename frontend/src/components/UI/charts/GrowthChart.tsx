import {useEffect, useRef, FC} from 'react';
import { Chart } from 'react-chartjs-2'


interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}
  
interface ChartDataset {
    label: string;
    data: number[];
    backgroundColor: () => string;
}
  
interface Props {
    data: ChartData;
}

const GrowthChart: FC<Props> = ({ data }) => {
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
        chartRef.current.destroy(); // Уничтожаем предыдущий график, если он существует
        }

        chartRef.current = new Chart(document.getElementById('myChart2') as HTMLCanvasElement, {
        type: 'line',
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

    return <canvas id="myChart2" />;
};
  
export default GrowthChart;