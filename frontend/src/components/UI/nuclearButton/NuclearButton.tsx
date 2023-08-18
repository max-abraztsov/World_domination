import React, {useState, useEffect, FC} from 'react';
import cl from "./NuclearButton.module.css"
import { useAppSelector } from '../../../hook';
import ButtonBottom from "./../../../assets/button-fire.png"
import FireTop from "./../../../assets/fire-top.png"

interface NuclearButtonProps{
    onClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

const NuclearButton: FC<NuclearButtonProps> = ({onClick}) => {

    const country = useAppSelector(state => state.country.initialStateCountry);
    const form = useAppSelector(state => state.form.formResult);

    const [buttonPosition, setButtonPosition] = useState({transform: "translateX(-100vw)", transition: ".4s"})

    useEffect(() => {
        if(country.rockets > form.rockets) setButtonPosition({ transform: "translateX(0px)", transition: ".4s"});
        else setButtonPosition({ transform: "translateX(-100vw)", transition: ".4s"});   
    }, [form.rockets]);


    return (
        <button style={buttonPosition} className={cl.fire__button} onClick={onClick} type="submit">
            <img src={ButtonBottom} alt="button fire" />
            <img className={cl.fire__top} src={FireTop}></img>
        </button>
    );
};

export default NuclearButton;