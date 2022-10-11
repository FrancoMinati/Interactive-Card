import { card_number, number_input, name_input, card_name, month_input, year_input, card_date, cvc_input, card_cvc, form } from './elements.js'
import { cc_format, checkValue, formatDate, setInvalid, setValid, setError, validateForm } from './functions.js'

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (validateForm(cvc_input,month_input,name_input)) {
        document.querySelector("#end-state").style.display = "flex"
        form.style.display = "none"
    }

})
//For name input there is 2 listeners, because of autocomplete
name_input.addEventListener("input", (e) => {
    let name = name_input.value
    let name_err = "InputNameError"
    if (name.length > 0) {
        // In case data !== null it checks if its a number or letter, if its a letter , if its a letter show the change in the card
        // If its a number the value, shows the error message and substring the input value to make it look a only letter register, passed 2 seconds the alert dissapears
        if (e.data != null) {
            (checkValue(e) ? (card_name.innerHTML = `${name}`, setValid(name_input, name_err)) :
                (name_input.value = name_input.value.substring(0, name_input.value.length - 1),
                setInvalid(name_input, name_err), setTimeout(() => { setValid(name_input, name_err) }, 2000)))
        }
        (e.inputType == 'deleteContentBackward') && (card_name.innerHTML = `${name}`)
    } else {
        card_name.innerText = "Jane appleseed"
    }
})
// The change event if for the fields that can be autocompleted.
name_input.addEventListener("change", (e) => {
    card_name.innerHTML = `${name_input.value}`
})

number_input.addEventListener("input", (e) => {
    let base_card = "0000 0000 0000 0000"
    let id_err = "InputNumberError"
    if (number_input.value.length > 0) {
        let val = number_input.value
        let card = card_number.textContent
        // If e.data isnt null means, contains a character or a number
        if (e.data != null) {
            // !Check value means, in case of false==number,becames true. Then proceeds to format the value to match the card format 
            //  in case of true==letter. Substrings the content of the input value (to look like you cant write letters), and show error messagge of no letters allowed.
            !checkValue(e) ? (
                val = cc_format(val), number_input.value = val,
                card_number.innerHTML = `${val.concat(card.substring(val.length))}`,
                setValid(number_input, id_err))
                :
                (number_input.value = number_input.value.substring(0, number_input.value.length - 1),
                    setInvalid(number_input, id_err),
                    setTimeout(() => { setValid(number_input, id_err) }, 2000))
        } else {
            // If e.data is null means, backwards delete. So it substring the base_card string to obtain the amount of 0 needed. Then concats it to the value of the input
            (e.inputType == 'deleteContentBackward') && (
                val = cc_format(val),
                number_input.value = val,
                card_number.innerHTML = `${val.concat(base_card.substring(val.length))}`)
        }
    } else {
        // If the lenght of the input is 0, set it to base card input, this is for not loosing the 0000 0000 ... format
        card_number.innerHTML = base_card
    }

})
// CVC, Month and Year follows a similar process, if the value is >0 check if its a number, if this is true, change the content of the card
// If its not substrings the value of the input to make it look an number input
/*cvc*/
cvc_input.addEventListener("input", (e) => {
    let cvc = cvc_input.value
    let cvc_err="InputCvCError"
    if (cvc.length > 0) {
        (e.data != null) ?
            ((!checkValue(e)) ? (card_cvc.innerHTML = `${cvc}`, setValid(cvc_input, cvc_err)) :
                (cvc_input.value = cvc_input.value.substring(0, cvc_input.value.length - 1), 
                setError(cvc_input,cvc_err)))
            :
            (e.inputType == 'deleteContentBackward') && (card_cvc.innerHTML = `${cvc}`)
    } else {
        card_cvc.innerText = "000"
    }
})
/*month/year*/
month_input.addEventListener("input", (e) => {
    let month = month_input.value;
    let month_err= "InputMonthError"
    let previousTxt=""
    if (month.length > 0) {
        (e.data != null) ?
            ((!checkValue(e)) ? (previousTxt=card_date.textContent.substring(3, 5),card_date.innerHTML = `${formatDate(month) + "/" + previousTxt}`,setValid(month_input, month_err)) :
            (month_input.value = month_input.value.substring(0, month_input.value.length - 1), 
            setError(month_input,month_err)))
            :
            (e.inputType == 'deleteContentBackward') && (previousTxt = card_date.textContent.substring(3, 5), card_date.innerHTML = `${formatDate(month) + "/" + previousTxt}`)
    } else {
        previousTxt = card_date.textContent.substring(3, 5)
        card_date.innerHTML = `${"00/" + previousTxt}`
    }
})
year_input.addEventListener("input", (e) => {
    let year = year_input.value;
    let year_err= "InputYearError"
    let previousTxt=""
    if (year.length > 0) {
        (e.data != null) ?
            ((!checkValue(e)) ? (previousTxt = card_date.textContent.substring(0, 2), card_date.innerHTML = `${previousTxt + "/" + formatDate(year)}`, setValid(year_input,year_err)) :
                (year_input.value = year_input.value.substring(0, year_input.value.length - 1), 
                setError(year_input,year_err)))
            :
            (e.inputType == 'deleteContentBackward') && (previousTxt = card_date.textContent.substring(0, 2), card_date.innerHTML = `${previousTxt + "/" + formatDate(year)}`)

    } else {
        previousTxt = card_date.textContent.substring(0, 2)
        card_date.innerHTML = `${previousTxt + "/00"}`
    }
})

document.querySelector("#refresh").addEventListener("click", () => {
    window.location.reload()
})


