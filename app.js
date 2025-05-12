// const BASE_URL = "https://currency-rate-exchange-api.onrender.com/v1/currencies"

const BASE_URL = "https://api.exchangerate-api.com/v4/latest"

// const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies"

const dropdowns =document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurrency = document.querySelector(".from select")
const toCurrency = document.querySelector(".to select")
const msg = document.querySelector(".msg")

for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value= currCode
        if(select.name==="from" && currCode === "USD"){
            newOption.selected = "selected"
        } else if(select.name==="to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption)
    }
    select.addEventListener("change", (evt)=> {
        updateFlag(evt.target)
    })
}

const updateExchangeRate = async ()=> {
    let amount = document.querySelector(".amount input")
    let amtvalue = amount.value
    if(amtvalue === "" || amtvalue <= 0){
        amtvalue = 1
    }
    
    try {
        const URL = `${BASE_URL}/${fromCurrency.value}`
        let response = await fetch(URL)
        
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        let data = await response.json()
        const rate = data.rates[toCurrency.value]
        
        if(!rate) {
            throw new Error(`Exchange rate not available for ${toCurrency.value}`)
        }
        
        let result = amtvalue * rate
        msg.innerText = `${amtvalue} ${fromCurrency.value} = ${result.toFixed(2)} ${toCurrency.value}`
    } catch(error) {
        msg.innerText = `Error: ${error.message}`
        console.error('Error fetching exchange rate:', error)
    }
    msg.innerText = `${amtvalue} ${fromCurrency.value} = ${result} ${toCurrency.value}`
}

const updateFlag = (element) => {
    let currCode = element.value
    let countryCode = countryList[currCode]
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault()
    updateExchangeRate()
})

window.addEventListener("load" , () => {
    updateExchangeRate()
})
