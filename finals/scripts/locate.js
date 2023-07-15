const pokedex = document.getElementById('poke');
const searchbar = document.getElementById('locate');

searchbar.addEventListener('input', searchPokemon);

function searchPokemon() {
  const searchTerm = searchbar.value.toLowerCase();
  const cards = Array.from(pokedex.getElementsByClassName('card'));

  cards.forEach(card => {
    const pokemonName = card.querySelector('.card-title').textContent.toLowerCase();
    if (pokemonName.includes(searchTerm)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}