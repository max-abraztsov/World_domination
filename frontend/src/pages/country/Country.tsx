import {FC, useState} from 'react';
import { ICountry, IForm  } from '../../types/types';
import { useAppSelector } from '../../hook';
import cl from "./Country.module.css"
import City from '../../components/city/City';
import Checkbox from '../../components/UI/checkbox/Checkbox';

interface CountryProps{
    forAdmin?: ICountry;
}

const Country: FC<CountryProps> = ({forAdmin}) => {

    let country = useAppSelector(state => state.country);

    if (forAdmin) country = forAdmin;

    const [isPresident, setIsPresident] = useState(true);
    

    const [formResult, setFormResult] = useState<IForm>({
        country: "Belarus",
        nuclear__program: false,
        ecology: false,
        bomb: 0,
        donat: 0,
        cities: [
            {
                city__name: "Minsk",
                develop: false,
                shield: false,
            },
            {
                city__name: "Homel",
                develop: false,
                shield: false,
            },
            {
                city__name: "Grodno",
                develop: false,
                shield: false,
            },
            {
                city__name: "Brest",
                develop: false,
                shield: false,
            },
        ],
    });

    return (
        <div className={cl.country}>
            <div className={cl.container}>
                <section className={cl.country__info}>
                    <div className={cl.country__title}>
                        <img className={cl.country__flag} src={country.flag__photo} alt={"flag " + country.country} />
                        <h2 className={cl.country__name}>{country.country}</h2>
                    </div>
                    <div className={cl.country__stats}>
                        <div className={cl.country__live_level}>
                            <p className={cl.country__indicator}>Average <br/>live level:</p>
                            <p className={cl.country__index}>{country.average__live__level}%</p>
                        </div>
                        <div className={cl.country__budget}>
                            <p className={cl.country__indicator}>Your <br/>Budget:</p>
                            <p className={cl.country__index}>{country.budget}$</p>
                        </div>    
                    </div> 
                </section>
                <form>
                    <section className={cl.cities__info}>
                        {country.cities.map(item => 
                            <City 
                                key={item.city__name} 
                                city={item} 
                                isPresident={isPresident}
                            />                    
                        )}
                    </section>
                    <section>
                        <div className={cl.country__development}>
                            <div className={cl.country__dev_col}>
                                <h3>Nuclear program:</h3>
                                <Checkbox checked={country.nuclear__program}>Develop nuclear program (500$)</Checkbox>
                                <div className={cl.country__input}>
                                    <p className={cl.input__text}>Order nuclear bombs (150$):</p>
                                    <input type="number" placeholder='2'/>
                                </div>
                            </div>
                            <div className={cl.country__dev_col}>
                                <h3>Ecology:</h3>
                                <Checkbox>Develop ecology (200$)</Checkbox>
                            </div>
                        </div>
                        <div className={cl.country__button}>
                            <button className={cl.button} type="submit">Send order</button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
};

export default Country;