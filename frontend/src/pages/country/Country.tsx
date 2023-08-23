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
import { useLocation } from 'react-router-dom';
import Loader from '../../components/UI/loader/Loader';

import Pen from "./../../assets/Pen.svg"
import MinisterPage from '../../components/ministerPage/MinisterPage';
import PresidentPage from '../../components/presidentPage/PresidentPage';
import GameOver from '../../components/gameOver/GameOver';


const Country: FC = () => {

    const form = useAppSelector(state => state.form.formResult);
    const country = useAppSelector(state => state.country.initialStateCountry);
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

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        dispatch(getOtherInfo(form));
        const countryLocalStorage = localStorage.getItem("country");
        if (countryLocalStorage !== null && localStorage.getItem("authenticated")){
            dispatch(updateCountryInfo({neww: JSON.parse(countryLocalStorage)}));
            dispatch(updateFormInfo({update: generateDefaultForm(JSON.parse(countryLocalStorage))}));
        } else if(countryLocalStorage === null && localStorage.getItem("authenticated")){
            dispatch(clarifyCountryInfo({logincode: country.country, password: country.flag_photo}));
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
            await dispatch(getOtherInfo(form));
            await dispatch(updateFormInfo({update: generateDefaultForm(JSON.parse(localStorage.getItem("country")))}));
            await setIsSubmitting(false);
            await console.log(country, form);
        } catch (error) {
            await setIsSubmitting(false);
        }
    }

    const updateMinisterInformation = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        console.log(form);
        e.preventDefault();
        await setIsSubmitting(true);
        try{
            await dispatch(clarifyCountryInfo({logincode: country.country, password: country.flag_photo}));
            await dispatch(getOtherInfo(form));
            await dispatch(updateFormInfo({update: generateDefaultForm(JSON.parse(localStorage.getItem("country")))}));
            await setIsSubmitting(false);
            await console.log(country, form);
        } catch (error) {
            await setIsSubmitting(false);
        }
    }

    const resetLoserInfo = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        console.log(form);
        e.preventDefault();
        await setIsSubmitting(true);
        try{
            await dispatch(clarifyCountryInfo({logincode: country.country, password: country.flag_photo}));
            await dispatch(getOtherInfo(form));
            await dispatch(updateFormInfo({update: generateDefaultForm(JSON.parse(localStorage.getItem("country")))}));
            await setIsSubmitting(false);
            await console.log(country, form);
        } catch (error) {
            await setIsSubmitting(false);
        }
    }



    console.log(metricData, chartData);
    
    return (
        <div>
            {countriesPublic.countries[0].country == "" && <Loader text={"Waiting..."} />}
            {!isSubmitting ? (
            <div>
            { country.round < 7 ? (
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
                                            { country.round < 7 ? (
                                                <div className={cl.desktop__button}>
                                                <NuclearButton onClick={clickHandler} /> 
                                            </div>  
                                            ) : (<div></div>)}                                                                               
                                        </section>  
                                    ):(<div></div>)}
                                    {country && country.is_president ? (
                                        <div className={cl.country__documents_president}>
                                            <PresidentPage 
                                                metricData={metricData} 
                                                chartData={chartData} 
                                                clickHandler={clickHandler} 
                                                resetInfo={updateMinisterInformation}
                                            />
                                            {country.round < 7 ? (
                                                <div className={cl.mobile__button}>
                                                <NuclearButton onClick={clickHandler} /> 
                                            </div> 
                                            ) : (<div></div>)} 
                                        </div>
                                    ) : country ? (
                                        <MinisterPage 
                                            metricData={metricData} 
                                            chartData={chartData} 
                                            clickHandler={updateMinisterInformation}
                                        />                      
                                    ) : (<div>An error accured...</div>)}
                                </div>
                            </div>
                        </div>
                    ) : (<div></div>)}
                </div>
            ) : countriesPublic.ecology[6] !== null ? (
                <GameOver />
            ) : (<div>Error</div>)}
        </div>
        ) : (<Loader text={"Waiting for the other players..."} />)}
    </div>
    );
};

export default Country;