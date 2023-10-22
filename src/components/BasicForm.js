import useInput from "../hooks/use-input";

const BasicForm = (props) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        valueChangeHandler: firstNameChangedHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstNameInput,

    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        valueChangeHandler: lastNameChangedHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastNameInput,
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput,

    } = useInput((value) => value.trim() !== '' && emailRegex.test(value));

    const formIsValid = enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid;
    console.log(formIsValid)
    const formSubmissionHandler = (event) => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        resetFirstNameInput();
        resetLastNameInput();
        resetEmailInput();
    }

    const firstNameInputClasses = firstNameInputHasError ? 'form-control invalid' : 'form-control';
    const lastNameInputClasses = lastNameInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control'

    const createErrorText = () => {
        let text =[];
        if (firstNameInputHasError) {
            text.push("Name must not be empty.")
        }
        if (lastNameInputHasError) {
            text.push("Last Name must not be empty.")
        }
        if (emailInputHasError) {
            text.push("Email must not be empty and must be valid.")
        }
        return text.map((text, index) => <p key={index} className="error-text">{text}</p>)
    }

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className='control-group'>
                <div className={firstNameInputClasses}>
                    <label htmlFor='name'>First Name</label>
                    <input
                        onBlur={firstNameBlurHandler}
                        onChange={firstNameChangedHandler}
                        value={enteredFirstName}
                        type='text'
                        id='name'/>
                </div>
                <div className={lastNameInputClasses}>
                    <label htmlFor='name'>Last Name</label>
                    <input
                        onBlur={lastNameBlurHandler}
                        onChange={lastNameChangedHandler}
                        value={enteredLastName}
                        type='text'
                        id='name'/>
                </div>
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='name'>E-Mail Address</label>
                <input
                    onBlur={emailBlurHandler}
                    onChange={emailChangedHandler}
                    value={enteredEmail}
                    type='text'
                    id='name'/>
            </div>
            {createErrorText()}
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
