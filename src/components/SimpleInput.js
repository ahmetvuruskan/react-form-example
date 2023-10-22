import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let formIsValid = false

    const {
        value: enteredName,
        hasError: nameInputHasError,
        reset: resetNameInput,
        isValid: enteredNameIsValid,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredEmail,
        hasError: emailInputHasError,
        reset: resetEmailInput,
        isValid: enteredEmailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler

    } = useInput((value) => value.trim() !== '' && emailRegex.test(value));


    formIsValid = enteredNameIsValid && enteredEmailIsValid;
    const formSubmissionHandler = (event) => {
        event.preventDefault();
        if (!enteredNameIsValid || !enteredEmailIsValid) {
            return;
        }
        resetNameInput();
        resetEmailInput();
    }


    const inputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';
    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={inputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input value={enteredName}
                       onChange={nameChangeHandler}
                       onBlur={nameBlurHandler}
                       type='text'
                       id='name'/>
                {nameInputHasError && <p className="error-text">Name must not be empty.</p>}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>Your Email</label>
                <input value={enteredEmail}
                       onChange={emailChangeHandler}
                       onBlur={emailBlurHandler}
                       type='text'
                       id='email'/>
                {emailInputHasError && <p className="error-text">Email must not be empty and must be valid.</p>}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
