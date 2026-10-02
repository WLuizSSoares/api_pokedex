const nome = document.getElementById("nome");
const button = document.getElementById("buscar");

button.addEventListener("click", function(evento) {
   const nomeDigitado = nome.value.trim().toLowerCase();
   buscarPokemon(nomeDigitado);

});

function buscarPokemon(nomeDigitado){
    const endereco = "https://pokeapi.co/api/v2/pokemon/" + nomeDigitado

    fetch(endereco)
        .then(response => {
            if(!response.ok) {
                throw new Error('Erro na requisição');
            }

            return response.json();
        })
        .then(data => {
            console.log(data);
        });


};


