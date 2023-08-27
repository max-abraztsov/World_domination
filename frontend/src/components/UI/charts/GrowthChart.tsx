import {useEffect, useRef, FC, useState} from 'react';
import { Chart } from 'react-chartjs-2'
import { useAppSelector } from '../../../hook';


const GrowthChart: FC = () => {

    
    const countriesPublic = useAppSelector(state => state.countriesPublic.initialStateCountriesPublic);
  

    const [labels, setLabels] = useState<string[]>([]);
    const [data, setData] = useState<(number | null)[]>([]);
    const [backgroundColor, setBackgroundColor] = useState<string>("#5ACA84");

    const chartRef = useRef<any>(null);

    useEffect(() => {
        if (countriesPublic && countriesPublic.ecology){
            setLabels(countriesPublic.ecology.map((item) => item.round))
            setData(countriesPublic.ecology.map((item) => item.value));
            setBackgroundColor("#5ACA85")
        }
      }, [countriesPublic]);

    useEffect(() => {
        if (labels.length != 0) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new Chart(document.getElementById('myChart2') as HTMLCanvasElement, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Ecology',
                        data: data,
                        backgroundColor: backgroundColor,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                    },
                },
            },
            });
        }
    }, [labels]);

    return <canvas id="myChart2" />;
};
  
export default GrowthChart;