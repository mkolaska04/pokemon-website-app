const pokemonInfo = document.getElementById('pokemon-info');
const dropdown = document.getElementById('myDropdown')


function showDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

const searchPokemon = (pokemonName) => {
  return new Promise((resolve, reject) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => {
      if (!response.ok) {
        reject(`HTTP error! status: ${response.status}`); 
      }
      return response.json(); 
    })
    .then(data => resolve(data)) 
    .catch(error => reject(error)); 
});
};

function createPokeinfo(pokemon) {
    pokemonInfo.innerHTML = `
        <div class="card">
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" onclick="showPokeinfo()"/>
            <p>Id number: ${pokemon.id}</p>
          <div id="poke-info" class="poke-info">
            <div>
              <h3>Types:</h3>
              <ul>
                ${pokemon.types.map(type => `<li>${type.type.name}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h3>Abilities:</h3>
              <ul>
                ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h3>Height and weight </h3>
              <ul>
                <li>Height: ${pokemon.height}</li>
                <li>Weight: ${pokemon.weight}</li>
              </ul>
            </div>
          </div>
        </div>
        `;
}
function handleSearchError(error) {
  pokemonInfo.innerHTML = `
  <div class="card">
    <h2>Sorry, no pokemon found with that name</h2>
  </div>
`;
}

function filterFunction() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const div = document.getElementById("myDropdown");
  const list = div.getElementsByClassName("list");
  for (let i = 0; i < list.length; i++) {
    txtValue = list[i].value
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
}

function handleInputClick(event) {
  const pokemonName = event.target.value;
  console.log(pokemonName);
  searchPokemon(pokemonName)
    .then(data => createPokeinfo(data))
    .catch(error => handleSearchError(error));
}

function handleInputSearch(event) {
  console.log(event)
  if (event.key === 'Enter') {
    const pokemonName = event.target.value.toLowerCase();
    console.log(pokemonName);
    searchPokemon(pokemonName)
    .then(data => createPokeinfo(data))
    .catch(error => handleSearchError(error));
  } else {
    filterFunction();
  }
}


function showPokeinfo() {
  document.getElementById("poke-info").classList.toggle("show-info");
}

function fetch_list() {
  return new Promise((resolve, reject) => {
    fetch(`https://pokeapi.co/api/v2/pokemon`)
    .then(response => {
      if (!response.ok) {
        reject(`HTTP error! status: ${response.status}`); 
      }
      return response.json()
    })
    .then(data => resolve(data)) 
    .catch(error => reject(error)); 
  }); 
}

function create_list() {
  fetch_list()
    .then((data) => {
      data_to_element(data)
    })
    .catch((error) => list = `${error}`)
}
function data_to_element(data) {
  const list = data.results
  console.log(list)
  const search_bar = '<input type="text" placeholder="Search.." id="myInput" onkeydown="handleInputSearch(event)">'
  const poke_list = list.reduce((acc, curr, index) => {
    console.log(curr.name)
    element = `<input class="list" type="button" onclick="handleInputClick(event)" value="${curr.name}"></input>`
    acc += element
    return acc;
  }, '')
  console.log(poke_list)
  dropdown.innerHTML = `
    ${search_bar}
    <div class="container">
    ${poke_list}
    </div>
    `
}
create_list();