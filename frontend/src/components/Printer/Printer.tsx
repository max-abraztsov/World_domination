import React, {useState, FC} from 'react';
import { donatFromBudget } from '../../store/countrySlice';
import { useAppSelector, useAppDispatch } from '../../hook';
import cl from  "./Printer.module.css"
import PrinterTop from "./../../assets/print-top.svg"
import PrinterBottom from "./../../assets/print-bottom.svg"


const Printer: FC = () => {

    const form = useAppSelector(state => state.form);
    const dispatch = useAppDispatch();

    const [donateForm, setDonateForm] = useState({
        to: "",
        amount: 0,
    })

    function donate(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        dispatch(donatFromBudget({amount: donateForm.amount, countryTo: donateForm.to}));
        console.log(donateForm);
        setDonateForm({ to: "", amount: 0, });
    }

    function handleChangeAmount(e: React.ChangeEvent<HTMLInputElement>) {
        setDonateForm({ ...donateForm, amount: Number(e.target.value)});
    }

    function handleChangeTo(e: React.ChangeEvent<HTMLSelectElement>) {
        setDonateForm({ ...donateForm, to: e.target.value});
    }

    return (
        <div className={cl.printer}>
            <img src={PrinterTop} />
            <img src={PrinterBottom}></img>
            <form className={cl.printer__form}>
                <div>
                    <select id={cl.country} name="country" className={cl.printer__input} value={donateForm.to} onChange={handleChangeTo}>
                        <option value="">Choose country...</option>
                        {form.enemies.map( enemy => 
                            <option 
                            key={enemy.country} 
                            value={enemy.country}>{enemy.country}</option>
                        )}
                    </select>
                </div>
                <div>
                    <input 
                        type="number" 
                        id="amount" 
                        name="amount" 
                        value={donateForm.amount} 
                        onChange={handleChangeAmount}
                        placeholder="Enter an amount " 
                        className={cl.printer__input}
                        required 
                    /> 
                </div>
                
                <div id={cl.printer__button_container}>
                    <button id={cl.printer__button} type="submit" onClick={donate}>
                        Print
                    </button>
                    <div className={cl.printer__button_bottom}></div>
                </div>
                
            </form>
        </div>
    );
};

export default Printer;