// Formatters
// Formats card to have a space every 4 numbers
function cc_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
        return parts.join(' ')
    } else {
        return value
    }
}
// formats date
function formatDate(value) {
    let val
    return value < 10 ? (val = "0" + value) : val = value
}

// Checkers

// See if the value of the event is a number or not
function checkValue(event) {
    if (isLetter(event.data)) {
        return true;
    } else {
        return false;
    }
}


//Validations

function validateForm(cvc,month,name) {
    let a = validateCvC(cvc.value)
    let b = validateMonth(month.value)
    let c = hasNumber(name.value)
    
    c && (document.querySelector("#InputNameError").innerHTML = "Invalid Name", setInvalid("name", "InputNameError") )
    return (a && b && !c)

}

function validateMonth(value) {
    !(value > 0 && value <= 12) && (document.querySelector("#InputMonthError").innerHTML = "Invalid Month", setInvalid("month", "InputMonthError"))
    return (value > 0 && value <= 12)
}
function validateCvC(value) {
    !(value.length === 3) && (document.querySelector("#InputCvCError").innerHTML = "Incomplete CVC", setInvalid("cvc", "InputCvCError"))
    return (value.length === 3)
}



function hasNumber(myString) {
    return /\d/.test(myString);
}


function isLetter(str) {
    return (str.length === 1 && str.match(/^[A-Za-z ]+$/i));
}
function setInvalid(Input, ErrorID) {
    let error = document.getElementById(ErrorID)
    Input.classList.add("invalid")
    error.style.display = "block"
}
function setValid(Input, ErrorID) {
    let error = document.getElementById(ErrorID)
    Input.classList.remove("invalid")
    error.style.display = "none"
}
function setError(input,err){
    setInvalid(input,err), document.getElementById(err).innerText = `Letters not allowed`
    setTimeout(() => { setValid(input,err),document.getElementById(err).innerText = `Cant be blank` }, 2000)
}
export {cc_format,checkValue,formatDate,hasNumber,isLetter,setInvalid,setValid,validateCvC,validateForm,validateMonth,setError}