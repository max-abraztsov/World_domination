import React, {useState, FC, useEffect} from 'react';
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
        setAnimation(true);
        setTimeout(() => {
            setDonateForm({ to: "", amount: 0, });
            setAnimation(false);
        }, 3000);
        
    }

    function handleChangeAmount(e: React.ChangeEvent<HTMLInputElement>) {
        setDonateForm({ ...donateForm, amount: Number(e.target.value)});
    }

    function handleChangeTo(e: React.ChangeEvent<HTMLSelectElement>) {
        setDonateForm({ ...donateForm, to: e.target.value});
    }

    const [animation, setAnimation] = useState(false);

    const [paperStyles, setPaperStyles] = useState([cl.printer__paper]);

    useEffect(() => {
        if(animation) setPaperStyles([cl.printer__paper, cl.animate]);
        else setPaperStyles([cl.printer__paper]);
    }, [animation])
    
    return (
        <div className={cl.printer}>
            <img className={cl.printer__top} src={PrinterTop} />
            <img className={cl.printer__bottom} src={PrinterBottom}></img>
            <div className={paperStyles.join(" ")} >
                <h4>Interstate transfer</h4>
                <p>Round: {form.round}</p>
                <p>Sender: {form.country}</p>
                <p>Recipient: {donateForm.to}</p>
                <p>Amount: {donateForm.amount}</p>
            </div>
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
                    <button  id={cl.printer__button} type="submit" onClick={donate}>
                        Print
                    </button>
                    <div className={cl.printer__button_bottom}></div>
                </div>
                
            </form>
        </div>
    );
};

export default Printer;