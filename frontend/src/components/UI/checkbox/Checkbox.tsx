import React, {FC} from 'react';

import cl from "./Checkbox.module.css"

interface CheckboxProps{
    checked?: boolean,
    children: React.ReactNode,
    toggleStatus?(event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLLabelElement>): void, 
}



const Checkbox: FC<CheckboxProps> = ({children, checked, toggleStatus}) => {
    return (
        <label className={cl.checkbox} onChange={toggleStatus}>
            { checked ? ( // Если данная услуга уже сделана, тогда выводится просто картинка
                <span className={cl.active_custom_checkbox}></span>
            ) : ( // Если не куплена, тогда выводится функцональный компонент
                <span>
                    <input className={cl.real_checkbox} type="checkbox"/>
                    <span className={cl.custom_checkbox}></span>
                </span>
            )}
            {children}
        </label>
    );
};

export default Checkbox;