let card_number = document.querySelector("#card_number_display")
let input = document.querySelector("#number")
const numRegex = /^[0-9]+$/

input.addEventListener("keyup", (e) => {

    if (input.value.length > 0) {
        let val = input.value
        let card = card_number.textContent
        
        if (checkDigit(e)) {

            val = cc_format(input.value)
            input.value = val
            card_number.innerHTML = `${val.concat(card.substring(val.length))}`
        }
        if (e.which == 8) {
            let base_card="0000&nbsp;0000&nbsp;0000&nbsp;0000"
            card_number.innerHTML = `${cc_format(input.value).concat(base_card.substring(val.length))}`
            
        }
    }
    if (input.value.length === 0) {
        
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
    var code = (event.which) ? event.which : event.keyCode;

    if ((code < 48 || code > 57) && (code > 31)) {
        return false;
    }

    return true;
}
document.querySelectorAll('*').forEach(el => {
    if (el.offsetWidth > document.documentElement.offsetWidth) {
        console.log('Found the worst element ever: ', el);
    }
  });