let card_number = document.querySelector("#card_number_display")
let number_input = document.querySelector("#number")

let name_input = document.querySelector("#name")
let card_name = document.querySelector("#card_name_display")

let month_input = document.querySelector("#month")
let year_input = document.querySelector("#year")
let card_date = document.querySelector("#card_date_display")

let cvc_input = document.querySelector("#cvc")
let card_cvc = document.querySelector("#card_cvc_display")

let form = document.querySelector("#form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (validateForm()) {
        document.querySelector("#end-state").style.display = "flex"
        form.style.display = "none"
    }

})
name_input.addEventListener("input", (e) => {
    let name = name_input.value

    if (name.length > 0) {
        (e.data != null) ?
            ((checkLetter(e)) &&
                (card_name.innerHTML = `${name}`),setValid("name","InputNameError"))
            :
            (e.which == 0) && (card_name.innerHTML = `${name}`)

            !hasNumber(name_input.value)&&setValid("name","InputNameError")
    } else {
        card_name.innerText = "Jane appleseed"
    }
})

name_input.addEventListener("change", (e) => {
    card_name.innerHTML = `${name_input.value}`
    if (name_input.value.length === 0) {
        card_name.innerText = "Jane appleseed"
    }
})
number_input.addEventListener("input", (e) => {
    if (number_input.value.length > 0) {
        let val = number_input.value
        let card = card_number.textContent

        if (e.data != null) {
            if (checkDigit(e)) {
                val = cc_format(number_input.value)
                number_input.value = val
                card_number.innerHTML = `${val.concat(card.substring(val.length))}`
                setValid("number", "InputNumberError")

            } else {
                number_input.value = number_input.value.substring(0, number_input.value.length - 1)
                setInvalid("number", "InputNumberError")
                setTimeout(() => { setValid("number", "InputNumberError") }, 2000)
            }
        } else {
            if (e.which == 0) {
                let base_card = "0000 0000 0000 0000"
                val = cc_format(number_input.value)
                number_input.value = val
                card_number.innerHTML = `${val.concat(base_card.substring(val.length))}`

            }
        }
    }

    if (number_input.value.length === 0) {

        card_number.innerHTML = `0000 0000 0000 0000`
    }
    if (number_input.value.length == 19) {
        setValid("number", "InputNumberError")
    }
})

/*cvc*/
cvc_input.addEventListener("input", (e) => {
    let cvc = cvc_input.value

    if (cvc.length > 0) {
        (e.data != null) ?
            ((checkDigit(e)) ? (card_cvc.innerHTML = `${cvc}`, setValid("cvc", "InputCvCError")) :
                (cvc_input.value = cvc_input.value.substring(0, cvc_input.value.length - 1), setInvalid("cvc", "InputCvCError"), document.querySelector("#InputCvCError").innerText = `Letters not allowed`))
            :
            (e.which == 0) && (card_cvc.innerHTML = `${cvc}`)

    } else {
        card_cvc.innerText = "000"
    }
})
/*month/year*/
month_input.addEventListener("input", (e) => {
    let month = month_input.value;

    if (month.length > 0) {
        (e.data != null) ?
            ((checkDigit(e)) ? (previousTxt = card_date.textContent.substring(3, 5), card_date.innerHTML = `${formatDate(month)+ "/" + previousTxt }`, setValid("month", "InputMonthError")) :
                (month_input.value = month_input.value.substring(0, month_input.value.length - 1), setInvalid("month", "InputMonthError"), document.querySelector("#InputMonthError").innerText = `Letters not allowed`))
            :
            (e.which == 0) && (previousTxt = card_date.textContent.substring(3, 5), card_date.innerHTML = `${formatDate(month) + "/" +previousTxt }`)

    } else {
        previousTxt = card_date.textContent.substring(3, 5)
        card_date.innerHTML = `${"00/"+ previousTxt}`
    }
})
year_input.addEventListener("input", (e) => {
    let year = year_input.value;

    if (year.length > 0) {
        (e.data != null) ?
            ((checkDigit(e)) ? (previousTxt = card_date.textContent.substring(0, 2), card_date.innerHTML = `${previousTxt + "/" + formatDate(year)}`, setValid("year", "InputYearError")) :
                (year_input.value = year_input.value.substring(0, year_input.value.length - 1), setInvalid("year", "InputYearError"), document.querySelector("#InputYearError").innerText = `Letters not allowed`))
            :
            (e.which == 0) && (previousTxt = card_date.textContent.substring(0, 2), card_date.innerHTML = `${previousTxt + "/" + formatDate(year)}`)

    } else {
        previousTxt = card_date.textContent.substring(0, 2)
        card_date.innerHTML = `${previousTxt + "/00"}`
    }
})
function cc_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
        return parts.join(' ')
    } else {
        return value
    }
}
function checkDigit(event) {
    if (isNumber(event.data)) {
        return true;
    } else {
        return false;
    }
}


function validateForm() {
    let a = validateCvC(cvc_input.value)
    let b = validateMonth(month_input.value)
    let c = hasNumber(name_input.value)
    
    c && (document.querySelector("#InputNameError").innerHTML = "Invalid Name", setInvalid("name", "InputNameError") )
    return (a && b && !c)

}
function hasNumber(myString) {
    return /\d/.test(myString);
}
function validateMonth(value) {
    !(value > 0 && value <= 12) && (document.querySelector("#InputMonthError").innerHTML = "Invalid Month", setInvalid("month", "InputMonthError"))
    return (value > 0 && value <= 12)
}
function validateCvC(value) {
    !(value.length === 3) && (document.querySelector("#InputCvCError").innerHTML = "Incomplete CVC", setInvalid("cvc", "InputCvCError"))
    return (value.length === 3)
}

function formatDate(value) {
    return value < 10 ? (val = "0" + value) : val = value
}


function checkLetter(event) {

    if (isLetter(event.data)) {
        return true;
    } else {
        return false;
    }
}

function isNumber(str) {
    return !(str.length === 1 && str.match(/^[A-Za-z ]+$/i));
}
function isLetter(str) {
    return (str.length === 1 && str.match(/^[A-Za-z ]+$/i));
}
function setInvalid(InputID, ErrorID) {
    let input = document.getElementById(InputID)
    let error = document.getElementById(ErrorID)
    input.classList.add("invalid")
    error.style.display = "block"
}
function setValid(InputID, ErrorID) {
    let input = document.getElementById(InputID)
    let error = document.getElementById(ErrorID)
    input.classList.remove("invalid")
    error.style.display = "none"
}
document.querySelector("#refresh").addEventListener("click", () => {
    window.location.reload()
})

