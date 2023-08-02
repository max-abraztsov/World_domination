import {FC, useState, useEffect} from 'react';
import cl from "./Metric.module.css"

interface MetricProps{
    indicator: string,
    index: number,
    unit?: string,
    width?: string;
}

const Metric: FC<MetricProps> = ({indicator, index, unit, width}) => {

    const colors = {
        green: "#5ACA85",
        yellow: "#E1BC5C",
        red: "#DD7474",
    }

    const [indexColor, setIndexColor] = useState<string>(colors.green);
    
    useEffect(() => {
        if(unit == "%"){
            if(index <= 35) setIndexColor(colors.red);
            else if ( index > 35 && index < 70) setIndexColor(colors.yellow);
            else setIndexColor(colors.green);
        }
    }, []);

    return (
        <div className={cl.metric}>
            <p className={cl.indicator}>{indicator}</p>
            <p style={{color: indexColor, width: width}} className={cl.index}>{index}{unit}</p>
        </div>
    );
};

export default Metric;
