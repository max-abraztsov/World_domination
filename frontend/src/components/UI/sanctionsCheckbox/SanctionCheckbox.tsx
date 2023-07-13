import React, {FC} from 'react';

import cl from "./SanctionCheckbox.module.css"

interface SanctionCheckboxProps{
    checked?: boolean,
    children: React.ReactNode,
    toggleStatus?(event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLLabelElement>): void, 
}

const SanctionCheckbox: FC<SanctionCheckboxProps> = ({children, toggleStatus, checked}) => {

    return (
        <label className={cl.checkbox} onChange={toggleStatus}>  
            <span>
                <input className={cl.real_checkbox} type="checkbox" checked={checked}/>
                <span className={cl.custom_checkbox}></span>
            </span>
            {children}
        </label>
    );
};

export default SanctionCheckbox;