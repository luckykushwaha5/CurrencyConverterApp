const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const selection = document.querySelectorAll(".country select");
const btn = document.querySelector(".btn");
const msg = document.querySelector(".message");
const from = document.querySelector(".from1 select");
const to = document.querySelector(".to1 select");

// for(let code in countryList){
//     console.log(code,countryList[code]);
// }

for(let select of selection){
    for(let code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;

        if(select.name === "from" && code ==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && code ==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
}

btn.addEventListener("click",async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("#money");
    let totalAmount = amount.value;
    if(totalAmount === "" || totalAmount < 0 ){
        msg.style.color = "red";
        msg.innerText = "Please enter valid amount";
    }
    console.log(totalAmount);
    
    const newURL = `${URL}/${from.value.toLowerCase()}.json`;
    let response = await fetch(newURL);
    let newResponse = await response.json();
    let rate = newResponse[from.value.toLowerCase()] ;
    let finalRate = rate[to.value.toLowerCase()]

    let result = totalAmount * finalRate;
    console.log(result);
    msg.innerText = result;
})

const updateFlag = (element) =>{
    console.log(element);
    let currencyCode = element.value;
    console.log(currencyCode);
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}



//Background Animation ------------------------------------------------------------------>>>>>>>>>>>
let hue = 0;
function animate() {
  hue += 0.5; // speed
  document.body.style.background = `linear-gradient(
    45deg,
    hsl(${hue}, 70%, 50%),
    hsl(${hue+60}, 70%, 50%)
  )`;
  requestAnimationFrame(animate);
}
animate();