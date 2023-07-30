import {FC, useState, useEffect} from 'react';
import cl from "./Counter.module.css"

import { useAppSelector, useAppDispatch } from '../../hook';
import {toggleRocketOrder} from '../../store/countrySlice';


const Counter: FC = () => {

    const form = useAppSelector(state => state.form);
    const [possibleRocketLimit, setPossibleRocketLimit] = useState<number>(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setPossibleRocketLimit(Math.floor(form.budget/150));
    }, [form.budget]);

    console.log(typeof(form.rocket_order));

    function handlePlus(){
        if(possibleRocketLimit > 0) dispatch(toggleRocketOrder({order: Number(form.rocket_order)+1}));
    }

    function handleMinus(){
        if(form.rocket_order > 0)  dispatch(toggleRocketOrder({order: Number(form.rocket_order)-1}));
    }

    return (
        <div className={cl.counter}>
            <button 
                className={cl.counter__minus} 
                type="button"
                onClick={handleMinus}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#DD7474"/>
                    <rect x="3" y="9" width="2" height="10" rx="1" transform="rotate(-90 3 9)" fill="white"/>
                </svg>
            </button>
            <p className={cl.counter__text}>{form.rocket_order}</p>
            <button 
                className={cl.counter__plus} 
                type="button"
                onClick={handlePlus}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#527153"/>
                    <rect x="7.16666" y="3" width="1.66667" height="10" rx="0.833333" fill="white"/>
                    <rect x="3" y="8.83325" width="1.66667" height="10" rx="0.833333" transform="rotate(-90 3 8.83325)" fill="white"/>
                </svg>
            </button>
        </div>
    );
};

export default Counter;