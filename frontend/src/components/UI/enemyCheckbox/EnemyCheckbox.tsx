import React, {FC} from 'react';

import cl from "./EnemyCheckbox.module.css"

interface EnemyCheckboxProps{
    stateCity?: boolean,
    children: React.ReactNode,
    toggleStatus?(event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLLabelElement>): void, 
}

const EnemyCheckbox: FC<EnemyCheckboxProps> = ({children, stateCity, toggleStatus}) => {
    return (
        <label className={cl.checkbox} onChange={toggleStatus}>
            { !stateCity ? ( // Если данная услуга уже сделана, тогда выводится просто картинка
                <span className={cl.destroyed}></span>
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

export default EnemyCheckbox;