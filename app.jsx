
let selectedPokemon = "Choose your pokemon";
let pokemons = []
let filtred_pokemons = []
let searchValue = ""

const fetch_list = async () => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    const json = await res.json();

    const fetched_pokemons = await Promise.all(
      json.results.map(async (pokemon) => { return pokemon.name })
    )
    pokemons = fetched_pokemons;
    renderApp();
  
  }
  catch (err) {
    console.error('Nie załadowano Pokemonów', err)
  }
};

const App = () => {

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

  const PokemonList = ({ onBtnClick, onPokemonClick, handleKeyDown }) => {
    const filtred_pokemons = pokemons.filter(pokemon => pokemon.toLowerCase().includes(searchValue.toLowerCase()))

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
          <div className="container">
            {filtred_pokemons.map((pokemon) => (
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
      </div>
    );
  };

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

  const handleSearchChange = (e) => {
    console.log(e.key);
    if (e.key !== "Enter") {
      searchValue = e.target.value;
      
    } else if (e.key === "Enter") {
      searchPokemon(searchValue)
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
    }
    
    
  };


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



  return (
    <div>
      <div className="navbar">
            {<PokemonList onBtnClick={showDropdown} onPokemonClick={handleInputClick} handleKeyDown={handleSearchChange} />}
        </div>
      <PokemonDetails pokemon={selectedPokemon} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {

  root.render(<App />);
};

// renderApp();
fetch_list();



