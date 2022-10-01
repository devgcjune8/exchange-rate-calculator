const selectBtns = document.querySelectorAll('select')
const currencyFrom = document.querySelector('#currency-from')
const currencyTo = document.querySelector('#currency-to')
const amountFrom = document.querySelector('#amt-from')
const amountTo = document.querySelector('#amt-to')
const swapBtn = document.querySelector('.swap-btn')
const rateEl = document.querySelector('.rate-p')
const copyBtn = document.querySelector('.copy')

const exchangeMoney = () => {
    const currency_a = currencyFrom.value;
    const currency_b = currencyTo.value;

    fetch(`https://v6.exchangerate-api.com/v6/fd8069cbd76c5705c100b562/latest/${currency_a}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.conversion_rates[currency_b]

            rateEl.innerText = `1.00 ${currency_a} = ${exchangeRate} ${currency_b}`

            amountTo.value = (amountFrom.value * exchangeRate).toFixed(2)
        })

}

console.log(amountTo.value)


exchangeMoney()

currencyFrom.addEventListener('change', exchangeMoney)
amountFrom.addEventListener('input', exchangeMoney)
currencyTo.addEventListener('change', exchangeMoney)
amountFrom.addEventListener('input', exchangeMoney)

swapBtn.addEventListener('click', () => {
    const initCurrency = currencyFrom.value;
    const initAmount = amountFrom.value
    currencyFrom.value = currencyTo.value;
    currencyTo.value = initCurrency;
    amountFrom.value = amountTo.value
    amountTo.value = initAmount
   
})

window.onload =( ) => {

    selectBtns.forEach(select => (select.classList.add('glow')))
    document.querySelector('.logo').classList.add('rotate')

    setTimeout(() => {
        selectBtns.forEach(select => (select.classList.remove('glow')))
    }, 2000)   
}

copyBtn.addEventListener('click', () => {

    // Select the text field
    amountTo.focus()
    amountTo.select();
  
    try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }
  } )