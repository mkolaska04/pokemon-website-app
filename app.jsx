
let selectedPokemon = "Choose your pokemon";

const App = () => {

  const showDropdown = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  };

  function showPokeinfo() {
    document.getElementById("poke-info").classList.toggle("show-info");
  }

  const handleInputClick = (pokemonName) => {
    console.log(pokemonName);
    searchPokemon(pokemonName)
      .then((data) => {
        selectedPokemon = data;
        console.log(selectedPokemon)
      })
      .then(() => {
        renderApp();
      })
      .catch((error) => {
        handleSearchError(error);
      });
  };

 function handleInputSearch(event) {
  console.log(event); 
  if (event.key === 'Enter') {
    const pokemonName = event.target.value.toLowerCase(); 
    console.log(pokemonName); 
    searchPokemon(pokemonName)
      .then(data => {
        selectedPokemon = data; 
        console.log(selectedPokemon); 
        renderApp();
      })
      .catch(error => handleSearchError(error)); 
  } else {
    filterFunction(); 
  }
}
  function filterFunction() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase(); 
  const div = document.getElementById("myDropdown");
  const list = div.getElementsByClassName("list");
  for (let i = 0; i < list.length; i++) {
    const txtValue = list[i].value;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      list[i].style.display = ""; 
    } else {
      list[i].style.display = "none"; 
    }
  }
}

  function handleSearchError(error) {
    selectedPokemon = "Sorry, no pokemon found with that name"
    console.log(error);
    renderApp();
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

  const PokemonDetails = ({ pokemon }) => {
    if (typeof (pokemon) !== "object") {
      return <h1>{pokemon}</h1>;
    }

    return (
      <div id="pokemon-info">
        <div className="card">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} onClick={() => showPokeinfo()} />
          <p>Id number: {pokemon.id}</p>
          <div id="poke-info" className="poke-info">
            <div>
              <h3>Types:</h3>
              <ul>
                {pokemon.types.map((type) => (
                  <li key={type.type.name}>{type.type.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Abilities:</h3>
              <ul>
                {pokemon.abilities.map((ability) => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Height and weight</h3>
              <ul>
                <li>Height: {pokemon.height}</li>
                <li>Weight: {pokemon.weight}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const pokemons = [
    "bulbasaur",
    "ivysaur",
    "venusaur",
    "charmander",
    "charmeleon",
    "charizard",
    "squirtle",
    "wartortle",
    "blastoise",
    "caterpie",
    "metapod",
    "butterfree",
    "weedle",
    "kakuna",
    "beedrill",
    "pidgey",
    "pidgeotto",
    "pidgeot",
    "rattata",
    "raticate",
    "spearow",
    "fearow",
    "ekans",
    "arbok",
    "pikachu",
    "raichu",
    "sandshrew",
    "sandslash",
    "nidoran-f",
    "nidorina",
    "nidoqueen",
    "nidoran-m",
    "nidorino",
    "nidoking",
    "clefairy",
    "clefable",
    "vulpix",
    "ninetales",
    "jigglypuff",
    "wigglytuff",
    "zubat",
    "golbat",
    "oddish",
    "gloom",
    "vileplume",
    "paras",
    "parasect",
    "venonat",
    "venomoth",
    "diglett",
    "dugtrio",
    "meowth",
    "pers"
  ];

  const PokemonList = ({ pokemons, onBtnClick, onPokemonClick, handleKeyDown }) => {
    return (
      <div className="dropdown">
        <button onClick={onBtnClick} className="dropbtn">
          Search your pokemon
        </button>

        <div id="myDropdown" className="dropdown-content">
          <input
            type="text"
            id="myInput"
            placeholder="Wyszukaj Pokemona"
            onKeyDown={handleKeyDown} 
          />

          {pokemons.map((pokemon) => (
            <input
              key={pokemon}
              className="list"
              type="button"
              value={pokemon}
              onClick={() => onPokemonClick(pokemon)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="navbar">
        <PokemonList pokemons={pokemons} onPokemonClick={handleInputClick} onBtnClick={showDropdown} handleKeyDown={handleInputSearch}/>
      </div>
      <PokemonDetails pokemon={selectedPokemon} />
    </div>
  );
};


const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();


