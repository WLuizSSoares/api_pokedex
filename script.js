const nome = document.getElementById("nome");
const button = document.getElementById("buscar");
const pokemonNome = document.getElementById("pokemon-nome");
const pokemonNumero = document.getElementById("pokemon-numero");
const pokemonTipo = document.getElementById("pokemon-tipo");
const pokemonAltura = document.getElementById("pokemon-altura");
const pokemonPeso = document.getElementById("pokemon-peso");
const mensagemErro = document.getElementById("mensagem-erro");
const textoErro = document.getElementById("texto-erro");

button.addEventListener("click", function(evento) {
   const nomeDigitado = nome.value.trim().toLowerCase();
   buscarPokemon(nomeDigitado);

});

function buscarPokemon(nomeDigitado){
    // Reseta o aviso a cada nova tentativa
    mensagemErro.style.display = 'none';
    limparSpan(); 
    if (nomeDigitado == ""){
    
        textoErro.textContent = "Por favor, digite um nome válido!"
        mensagemErro.style.display = 'block';
    
    }else{
        const endereco = "https://pokeapi.co/api/v2/pokemon/" + nomeDigitado

        fetch(endereco)
            .then(response => {
                if(!response.ok) {
                    if(response.status == 404){
                        throw new Error('Pokémon não encontrado');
                    }

                    throw new Error('Erro ao fazer a busca! Tenta novamente com outro nome. ');
                    
                }

                return response.json();
            })
            .then(data => {
                pokemonNome.textContent = data.name;
                pokemonTipo.textContent = data.types[0].type.name;
                pokemonNumero.textContent = data.id;
                pokemonAltura.textContent = data.height;
                pokemonPeso.textContent = data.weight;

            })
            .catch(erro =>{
                // Preenche a div com a mensagem do catch e a torna visível.
                textoErro.textContent = erro.message;
                mensagemErro.style.display = 'block';
                
            });
        }
    

    


}

function limparSpan(){
    const informacoesPokemon = [pokemonNome, pokemonTipo, pokemonNumero, pokemonAltura, pokemonPeso];

    for(const lista of informacoesPokemon){
        lista.textContent = "";
    }
}


