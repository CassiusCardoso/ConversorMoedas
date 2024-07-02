const moedaDe = document.querySelector(".from select");
const moedaPara = document.querySelector(".for select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const valor = document.querySelector("form input");
const exTaxaTxt = document.querySelector("form .result");

// Event Listeners para o menu de moedas

[moedaDe, moedaPara].forEach((select, i) => {
    for(let codigoMoeda in Country_List){
        const selected = (i === 0 && codigoMoeda === "BRL") || (i === 1 && codigoMoeda === "USD") ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${codigoMoeda}" ${selected}>${codigoMoeda} </option>`);
    }
    select.addEventListener("change", () => {
        const codigo = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[codigo].toLowerCase()}.png`;
    });
});

// Função para pegar a taxa de conversão da api

async function pegarTaxaConversaoApi(){
    const inputValor = valor.value || 1;
    exTaxaTxt.innerText = "Obtendo taxa de conversão...";

    try{
        const resposta = await fetch(`https://v6.exchangerate-api.com/v6/5d801304e76964cda6f72f87/latest/${Country_List.value}`);
        const resultado = await resposta.json();
        const taxaConversao = resultado.conversion_rates[moedaPara.value];
        const totalTaxaConversao = (inputValor * taxaConversao).toFixed(2);
        exTaxaTxt.innerText = `${inputValor} ${moedaDe.value} = ${totalTaxaConversao} ${moedaPara.value}`
    }
    catch(error){
        exTaxaTxt.innerText = "Ocorreu algo de errado..."
    }
}

// Event listeners para o botão e para o ícone de converter

window.addEventListener("load", pegarTaxaConversaoApi);
getBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    pegarTaxaConversaoApi();
});

exIcon.addEventListener("click", () =>{
    [moedaDe.value, moedaPara.value] = [moedaPara.value, moedaDe.value]
    [moedaDe, moedaPara].forEach((select) =>{
        const codigo = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[codigo].toLowerCase()}.png`;
    });
    pegarTaxaConversaoApi();
});