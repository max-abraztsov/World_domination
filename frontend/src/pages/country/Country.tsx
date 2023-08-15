import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import {FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hook';
import {  
    getOtherInfo, 
    postForm,
    clarifyCountryInfo, 
    updateFormInfo, 
    updateCountryInfo 
} from '../../store/countrySlice';
import cl from "./Country.module.css"
import Printer from '../../components/Printer/Printer';
import { generateDefaultForm } from '../../store/defaultValue';
import NuclearButton from '../../components/UI/nuclearButton/NuclearButton';

import Pen from "./../../assets/Pen.svg"
import MinisterPage from '../../components/ministerPage/MinisterPage';
import PresidentPage from '../../components/presidentPage/PresidentPage';


const Country: FC = () => {

    const form = useAppSelector(state => state.form.formResult);
    const country = useAppSelector(state => state.country.initialStateCountry);
    // const countryStatus = useAppSelector(state => state.country.status);
    // const {status, error} = useAppSelector(state => state.form);
    const countriesPublic = useAppSelector(state => state.countriesPublic.initialStateCountriesPublic);

    const dispatch = useAppDispatch();
    
    const getColorByValue = (value: number | null): string | null => {
        if (value != null && value <= 35) {
            return '#DD7474'; 
        } else if (value != null && value > 35 && value < 70) {
            return '#E1BC5C'; 
        } else if (value != null && value >= 70){
            return '#5ACA85'; 
        } else {
            return null;
        }      
    };

    const [chartData, setChartData] = useState({});
    const [metricData, setMetricData] = useState({});

    useEffect(() => {
        dispatch(getOtherInfo(form));
        const countryLocalStorage = localStorage.getItem("country");
        if (countryLocalStorage !== null && localStorage.getItem("authenticated")){
            dispatch(updateCountryInfo({neww: JSON.parse(countryLocalStorage)}));
            dispatch(updateFormInfo({update: generateDefaultForm(JSON.parse(countryLocalStorage))}));
        } else if(countryLocalStorage === null && localStorage.getItem("authenticated")){
            dispatch(clarifyCountryInfo("Hello!"));
        } else {
            console.log("Error");
        }
    }, []); 

    useEffect(() => {
        if (countriesPublic && countriesPublic.countries) {
            setChartData({
                labels: countriesPublic.countries.map((item) => item.country),
                datasets: [
                    {
                        label: 'Average live level',
                        data: countriesPublic.countries.map((item) => item.average_live_level),
                        backgroundColor: countriesPublic.countries.map((item) => getColorByValue(item.average_live_level)),
                    },
                ],
            });
        }
    
        if (countriesPublic && countriesPublic.ecology) {
            setMetricData({
                labels: countriesPublic.ecology.map((item) => item.round),
                datasets: [
                    {
                        label: 'Ecology',
                        data: countriesPublic.ecology.map((item) => item.value),
                        backgroundColor: countriesPublic.ecology.map((item) => getColorByValue(item.value)),
                    },
                ],
            });
        }
        console.log(chartData, metricData);
    }, [countriesPublic]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        console.log(form);
        e.preventDefault();
        await setIsSubmitting(true);
        try{
            await dispatch(postForm(form));
            await setIsSubmitting(false);
        } catch (error) {
            await setIsSubmitting(false);
        }
    }
    
    const [buttonPosition, setButtonPosition] = useState({transform: "translateX(0px)", transition: ".4s"})

    useEffect(() => {
        if(country.rockets > form.rockets) setButtonPosition({transform: "translateX(-100vw)", transition: ".4s"});
        else setButtonPosition({transform: "translateX(100vw)", transition: ".4s"});   
    }, [form.rockets]);  

    
    return (
        <div>
            {!isSubmitting ? (
                <div>
                    {country !== null && country.country != "" ? (
                        <div className={cl.country}>
                            <div className={cl.container}>
                                <div className={cl.country__table}> 
                                    {country && country.is_president ? (             
                                        <section className={cl.country__print}>
                                            <div>
                                                <Printer />
                                                <div id={cl.pen}>
                                                    <img src={Pen}/>
                                                </div>
                                            </div> 
                                            <div className={cl.desktop__button}>
                                                <NuclearButton onClick={clickHandler} /> 
                                            </div>                                                                                  
                                        </section>  
                                    ):(<div></div>)}
                                    {country && country.is_president ? (
                                        <PresidentPage metricData={metricData} chartData={chartData} />
                                    ) : country ? ( // For simple users
                                        <MinisterPage metricData={metricData} chartData={chartData} />                      
                                    ) : (<div></div>)}
                                    {country && country.is_president ? (
                                        <div style={buttonPosition} className={cl.mobile__button}>
                                            <NuclearButton onClick={clickHandler} /> 
                                        </div>
                                    ) : (<div></div>)}
                                </div>
                            </div>
                        </div>
                    ) : (<div></div>)}
                </div>
            ) : (
                <div className={cl.country}>
                    <div className={cl.container}>
                        <div className={cl.country__table_loading}>
                            <div className={cl.loader}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div className={cl.loader__text}>
                                Waiting for the other players...<br/>
                                Please don't reload the page!
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Country;