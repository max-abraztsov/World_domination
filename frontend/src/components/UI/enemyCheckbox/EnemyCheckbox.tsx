import React, {FC} from 'react';

import cl from "./EnemyCheckbox.module.css"

interface EnemyCheckboxProps{
    formState: boolean,
    indexCol: number,
    id: number,
    bombs: number,
    stateCity?: boolean,
    children: React.ReactNode,
    toggleStatus?(event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLLabelElement>): void, 
}

const EnemyCheckbox: FC<EnemyCheckboxProps> = ({formState, children, stateCity, toggleStatus, bombs}) => {
    
    if (!stateCity) return (
        <label className={cl.checkbox}>
            <span className={cl.destroyed}></span>
            {children}
        </label>
    );
    else return (
        <label className={cl.checkbox} onChange={toggleStatus}>
            { (bombs > 0) || (bombs == 0 && formState) ? ( 
                <span>
                    <input className={cl.real_checkbox} type="checkbox"/>
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

export default EnemyCheckbox;