import {FC, useState, useEffect} from 'react';
import {useAppSelector} from './../../hook';
import cl from "./GameOver.module.css"
import gameover from "./../../assets/game_over-light.png"
import BarChart from '../UI/charts/BarChart';

const GameOver: FC = () => {

    const countriesPublic = useAppSelector(state => state.countriesPublic.initialStateCountriesPublic);
    const country = useAppSelector(state => state.country.initialStateCountry.country);

    const copiedCountries = [...countriesPublic.countries];

    const sortedCountries = copiedCountries.sort( (a, b) => {
        return b.average_live_level - a.average_live_level;
    });

    console.log(sortedCountries);

    const [yourPlace, setYourPlace] = useState(sortedCountries.findIndex(item => item.country === country));

    const [chartData, setChartData] = useState({});
    const [metricData, setMetricData] = useState({});

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

    useEffect(() => {
        const yourPlace = sortedCountries.findIndex(item => item.country === country);
        setYourPlace(yourPlace);
    }, [sortedCountries, country]);

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

    return (
        <div>
            <div className={[cl.game_over, cl.pedestal].join(" ")}>
                <div className={cl.container}>
                    <div className={cl.game_over_pedestal}> 
                        <div className={cl.game_over_content}> 
                            <h2 className={cl.game_over_title}> Game over!</h2>
                            <div className={cl.game_over_photo}>
                                <img src={gameover} className={cl.game_over_img} />
                                {sortedCountries.length >= 3 && (
                                    <div>
                                        <div className={[cl.game_over_city, cl.city_place_first].join(" ")}>{sortedCountries[0].country}</div>
                                        <div className={[cl.game_over_city, cl.city_place_second].join(" ")}>{sortedCountries[1].country}</div>
                                        <div className={[cl.game_over_city, cl.city_place_third].join(" ")}>{sortedCountries[2].country}</div>
                                    </div>
                                )}
                            </div>
                            <h3 className={cl.game_over_place}>You came in {yourPlace + 1} place</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className={[cl.game_over, cl.info].join(" ")}> 
                <div className={[cl.container, cl.container_charts].join(" ")}>
                    <div className={cl.game_over_info}> 
                        <BarChart data={chartData}/>  
                        <div className={cl.countries__information}>
                            {countriesPublic.countries.map( (country, index) => 
                                <div className={cl.countries__country} key={`${country.country }-${index}`}>
                                    <div> 
                                        <h3 className={cl.countries__name}>{country.country}</h3>
                                    </div>
                                    <div className={cl.countries__cities}>
                                        { country.cities.map((city, index) => 
                                            city.state ? (
                                                <p className={cl.countries__city} key={`${city.city_name}-r${index}`}>{city.city_name}: {city.live_level}%</p>
                                            ) : (
                                                <p className={cl.countries__city} key={`${city.city_name}-r${index}`}>
                                                    {city.city_name}: <img className={cl.city__destoyed} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/800px-Cross_red_circle.svg.png" alt="cross" />
                                                </p> 
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameOver;

