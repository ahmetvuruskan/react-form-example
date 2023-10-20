import {useState, useRef} from "react";

const SimpleInput = (props) => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
    const [enteredNameTouched, setEnteredNameTouched] = useState(false);
    const nameInputRef = useRef();
    const nameInputChangeHandler = (event) => {
        setEnteredName(event.target.value);
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        setEnteredNameTouched(true);
        if (enteredName.trim() === '') {
            setEnteredNameIsValid(false);
            return;
        }
        console.log(enteredName);
        setEnteredNameIsValid(true)
        setEnteredName('');
    }
    const isNameInputValid = !enteredNameIsValid && enteredNameTouched;
    const inputClasses = isNameInputValid ? 'form-control invalid' : 'form-control';
    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={inputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input value={enteredName} ref={nameInputRef} onChange={nameInputChangeHandler} type='text' id='name'/>
                {isNameInputValid && <p className="error-text">Name must not be empty.</p>}
            </div>
            <div className="form-actions">
                <button>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
