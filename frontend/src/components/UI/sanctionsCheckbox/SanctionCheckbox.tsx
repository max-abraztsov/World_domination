import React, {FC} from 'react';

import cl from "./SanctionCheckbox.module.css"

interface SanctionCheckboxProps{
    children: React.ReactNode,
    toggleStatus?(event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLLabelElement>): void, 
}

const SanctionCheckbox: FC<SanctionCheckboxProps> = ({children, toggleStatus}) => {

    return (
        <label className={cl.checkbox} onChange={toggleStatus}>  
            <span>
                <input className={cl.real_checkbox} type="checkbox"/>
                <span className={cl.custom_checkbox}></span>
            </span>
            {children}
        </label>
    );
};

export default SanctionCheckbox;