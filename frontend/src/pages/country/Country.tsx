import {FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hook';
import { useLocation } from 'react-router-dom';
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
import Loader from '../../components/UI/loader/Loader';
import MinisterPage from '../../components/ministerPage/MinisterPage';
import PresidentPage from '../../components/presidentPage/PresidentPage';
import GameOver from '../../components/gameOver/GameOver';
import Pen from "./../../assets/Pen.svg"

const Country: FC = () => {

    const form = useAppSelector(state => state.form.formResult);
    const country = useAppSelector(state => state.country.initialStateCountry);
    const countriesPublic = useAppSelector(state => state.countriesPublic.initialStateCountriesPublic);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        await setIsSubmitting(true);
        try{
            await dispatch(postForm(form));
            await dispatch(getOtherInfo(form));
            const localStorageCountry = localStorage.getItem("country");
            if (localStorageCountry !== null && typeof localStorageCountry === "string") {
                await dispatch(updateFormInfo({ update: generateDefaultForm(JSON.parse(localStorageCountry)) }));
            }
            await setIsSubmitting(false);
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
            const localStorageCountry = localStorage.getItem("country");
            if (localStorageCountry !== null && typeof localStorageCountry === "string") {
                await dispatch(updateFormInfo({ update: generateDefaultForm(JSON.parse(localStorageCountry)) }));
            }
            await setIsSubmitting(false);
        } catch (error) {
            await setIsSubmitting(false);
        }
    }

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

    return (
        <div>
            {countriesPublic.countries[0].country == "" && <Loader text={"Waiting..."} />}
            {!isSubmitting ? (
            <div>
            { country.round < 7 ? (
                <div>
                    {country !== null && country.country != "" && (
                        <div className={cl.country}>
                            <div className={cl.container}>
                                <div className={cl.country__table}> 
                                    {country && country.is_president && (             
                                        <section className={cl.country__print}>
                                            <div>
                                                <Printer />
                                                <div id={cl.pen}>
                                                    <img src={Pen}/>
                                                </div>
                                            </div>
                                            { country.round < 7 && (
                                                <div className={cl.desktop__button}>
                                                    <NuclearButton onClick={clickHandler} /> 
                                                </div>  
                                            )}                                                                               
                                        </section>  
                                    )}
                                    {country && country.is_president ? (
                                        <div className={cl.country__documents_president}>
                                            <PresidentPage 
                                                clickHandler={clickHandler} 
                                                resetInfo={updateMinisterInformation}
                                            />
                                            {country.round < 7 && (
                                                <div className={cl.mobile__button}>
                                                    <NuclearButton onClick={clickHandler} /> 
                                                </div> 
                                            )} 
                                        </div>
                                    ) : country ? (
                                        <MinisterPage clickHandler={updateMinisterInformation}/>                      
                                    ) : (<div>An error accured...</div>)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : country.round === 7 ? (
                <GameOver />
            ) : (<div>Error</div>)}
        </div>
        ) : (<Loader text={"Waiting for the other players..."} />)}
    </div>
    );
};

export default Country;