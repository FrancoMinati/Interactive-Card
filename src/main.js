let card_number = document.querySelector("#card_number_display")
let number_input = document.querySelector("#number")
const numRegex = /^[0-9]+$/

number_input.addEventListener("input", (e) => {
    if (number_input.value.length > 0) {
        let val = number_input.value
        let card = card_number.textContent


        
        if (e.data != null) {
            if (checkDigit(e)) {
                val = cc_format(number_input.value)
                number_input.value = val
                card_number.innerHTML = `${val.concat(card.substring(val.length))}`
            } else {
                number_input.value = number_input.value.substring(0,number_input.value.length - 1)
            }
        }else{
        if (e.which == 0) {
            let base_card = "0000 0000 0000 0000"
            val = cc_format(number_input.value)
            number_input.value = val
            card_number.innerHTML = `${val.concat(base_card.substring(val.length))}`
            
        } }
    }

    if (number_input.value.length === 0) {

        card_number.innerHTML = `0000&nbsp;0000&nbsp;0000&nbsp;0000`
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

function isNumber(str) {
    return !(str.length === 1 && str.match(/[a-z]/i));
}
