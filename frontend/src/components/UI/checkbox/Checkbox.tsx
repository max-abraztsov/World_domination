import React, {FC} from 'react';

import cl from "./Checkbox.module.css"

interface CheckboxProps{
    formState: boolean, // получаем состояние чекбокса из формы которую будет высылать
    price: number, // стоимость 
    budget: number, // оставшийся бюджет из формы
    checked?: boolean,
    children: React.ReactNode,
    toggleStatus?(event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLLabelElement>): void, 
}

const Checkbox: FC<CheckboxProps> = ({formState, children, checked, toggleStatus, price, budget}) => {

    if (checked) return (
        <label className={cl.checkbox}>
            <span className={cl.active_custom_checkbox}></span>
            {children}
        </label>
    );
    else return (
        <label className={cl.checkbox} >  
            { (budget >= price) || (budget < price && formState)  ? ( 
                <span>
                    <input className={cl.real_checkbox} type="checkbox" onChange={toggleStatus}/>
                    <span className={cl.custom_checkbox}></span>
                </span>
            ) : formState ? ( 
                <span className={cl.active_custom_checkbox}></span>
            ) : (
                <span className={cl.custom_checkbox}></span>
            )}
            {children}
        </label>
    );
};

export default Checkbox;