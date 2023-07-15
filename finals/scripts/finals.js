let currentDate = new Date().getFullYear();

document.querySelector('#year').textContent = currentDate;

const pokeMons = document.getElementById('pokemonData');


const fetchPokemon = async () => {
    let pokemonList = [];
    for (let i = 1; i <= 250; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const response = await fetch(url);
      const data = await response.json();
      const abilities = data.abilities.map((ability) => ability.ability.name);
      const stats = data.stats.find((stat) => stat.stat.name === 'attack');
      const attackPower = stats ? stats.base_stat : 'N/A';

      pokemonList.push({
        name: data.name,
        image: data.sprites['front_default'],
        abilities: abilities.join(', '),
        attackPower: attackPower,
        id: data.id
      });
    }
    getPokemon(pokemonList);
};
  
const getPokemon = (pokemonList) => {

  const pokemonHTML = pokemonList
    .map(
      (pokemon) => `
      <li class="card" style="padding: 2%; margin: 2%; list-style-type: none;">
        <img class="card-image" src="${pokemon.image}"/>
        <h2 class="card-title">${pokemon.name}</h2>
        <p class="card-subtitle">Abilities: ${pokemon.abilities}</p>
        <p class="card-subtitle">Attack Power: ${pokemon.attackPower}</p>
      </li>
    `
    ).join('');

    pokeMons.innerHTML = pokemonHTML;

};

fetchPokemon();


