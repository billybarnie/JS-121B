let currentDate = new Date().getFullYear();

document.querySelector('#year').textContent = currentDate;

const pokeMons = document.getElementById('pokemonData');

const fetchPokemon = async () => {
  const cachedData = localStorage.getItem('pokemonList');
  if (cachedData) {
    const pokemonList = JSON.parse(cachedData);
    getPokemon(pokemonList);
  } else {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500');
    const data = await response.json();

    const pokemonUrls = data.results.map((pokemon) => pokemon.url);
    const pokemonList = await Promise.all(pokemonUrls.map(fetchPokemonData));

    localStorage.setItem('pokemonList', JSON.stringify(pokemonList));

    getPokemon(pokemonList);
  }
};

const fetchPokemonData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const abilities = data.abilities.map((ability) => ability.ability.name);
  const stats = data.stats.find((stat) => stat.stat.name === 'attack');
  const attackPower = stats ? stats.base_stat : 'N/A';

  return {
    name: data.name,
    image: data.sprites['front_default'],
    abilities: abilities.join(', '),
    attackPower: attackPower,
    id: data.id,
  };
};

const getPokemon = (pokemonList) => {
  const pokemonHTML = pokemonList
    .map(
      (pokemon) => `
      <li class="card" style="padding: 2%; margin: 2%; list-style-type: none;">
        <img class="card-image" src="${pokemon.image}" loading="lazy"/>
        <h2 class="card-title">${pokemon.name}</h2>
        <p class="card-subtitle">Abilities: ${pokemon.abilities}</p>
        <p class="card-subtitle">Attack Power: ${pokemon.attackPower}</p>
      </li>
    `
    )
    .join('');

  pokeMons.innerHTML = pokemonHTML;
};

fetchPokemon();


