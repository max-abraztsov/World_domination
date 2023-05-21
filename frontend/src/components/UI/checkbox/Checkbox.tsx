import React, {FC} from 'react';
import cl from "./Checkbox.module.css"

interface CheckboxProps{
    checked?: boolean | undefined;
    children: React.ReactNode;
}

const Checkbox: FC<CheckboxProps> = ({children, checked}) => {
    return (
        <label className={cl.checkbox}>
            <input
                className={cl.real_checkbox}
                type="checkbox"
                checked={checked}
                 />
            <span
                className={cl.custom_checkbox}></span>
            {children}
        </label>
    );
};

export default Checkbox;