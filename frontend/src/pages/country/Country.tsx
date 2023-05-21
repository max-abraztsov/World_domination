import {FC, useState} from 'react';
import { ICountry, IForm  } from '../../types/types';
import cl from "./Country.module.css"
import City from '../../components/city/City';
import Checkbox from '../../components/UI/checkbox/Checkbox';

const Country: FC = () => {

    const [isPresident, setIsPresident] = useState(true);
    
    const [country, setCountry] = useState<ICountry>({
        country: "Belarus",
        flag__photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQNcell8SvcD2oHdkfnzK_q_hZ7LSyjc7UyAPeZtyATwYoD5HOGYtq-tOGyVpxE7YLhb0&usqp=CAU",
        budget: 1000,
        average__live__level: 57,
        nuclear__program: true,
        bomb: 2,
        cities: [
            {
                photo: "https://www.sb.by/upload/medialibrary/1a7/1a727cda80dc698264b839a7ff704fa8.jpg",
                city__name: "Minsk",
                live__level: 56,
                progress: 90,
                profit: 270,  
                shield: true,  
            },
            {
                photo: "https://www.sb.by/upload/iblock/f82/f8206e5046cccf16e1a69da02994b74f.jpg",
                city__name: "Homel",
                live__level: 57,
                progress: 60,
                profit: 180,  
                shield: undefined,
            },
            {
                photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/fb/ce/ff/caption.jpg?w=700&h=500&s=1",
                city__name: "Grodno",
                live__level: 57,
                progress: 50,
                profit: 170,  
                shield: undefined,
            },
            {
                photo: "https://www.vsedostoprimechatelnosti.ru/assets/cache/images/evropa/belorussiya/brest/brest-880x-770.jpg",
                city__name: "Brest",
                live__level: 58,
                progress: 50,
                profit: 160,  
                shield: true,
            },
        ]
    });

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