import {FC} from 'react';
import Country from '../country/Country';
import cl from "./Admin.module.css";
import { useAppSelector } from '../../hook';
import BarChart from '../../components/UI/charts/BarChart';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'

const Admin: FC = () => {

    const countries = useAppSelector(state => state.countries);

    const countriesPublic = useAppSelector(state => state.countriesPublic);

    const chartData = {
        labels: countriesPublic.countries.map( item => item.country),
        datasets: [
            {
                label: 'Average live level',
                data: countriesPublic.countries.map( item => item.average_live_level),
                backgroundColor: '#55828B',
            },
        ],
    };

    return (
        <div className={cl.admin}>
            <div className={cl.container}>
                <section className={cl.countries}>
                    <BarChart data={chartData}/>
                    {countries.countries.map( country => 
                        <div>
                            <Country key={country.country} forAdmin={country}></Country>
                            <hr className={cl.hr}></hr>
                        </div> 
                    )}
                </section>
                <aside className={cl.panel}>
                    <button className={cl.admin__button}>Initiate</button>
                    <p className={cl.button__helper}>*Initiate a round of closed negotiations</p>

                    <h3 className={cl.admin__sequence_title}>Sequence</h3>
                    <ul className={cl.admin__sequence_text}>
                        <li>1. Initiate a round of closed negotiations (15 minutes)</li>
                        <li>2. Finish a round of closed negotiations</li>
                        <li>3. Invite all to the UN summit (10 minutes)</li>
                        <li>4. Conclude UN summit</li>
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default Admin;