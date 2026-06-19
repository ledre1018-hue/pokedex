const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");

const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon`).then(response => response.json());
        console.log("Pokémons cargados:", response.results);
        response.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.textContent = pokemon.name;
            option.value = pokemon.url;
            pokemonList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
}

loadPokemons();

const pokemonSelected = async (pokemonUrl) => {
    try {

        const response = await fetch(pokemonUrl).then(response => response.json());
        console.log("Pokémon seleccionado:", response);

        const pokemonImage = document.getElementById("pokemon-image");
        const pokemonName = document.getElementById("pokemon-name");
        const pokemonStats = document.getElementById("pokemon-stats");

        pokemonImage.src = response.sprites.front_default;
        pokemonName.textContent = response.name;

        pokemonStats.innerHTML = "";

        response.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);
            console.log(`Stat: ${stat.stat.name} = ${stat.base_stat}`);
        });

        // ── Habilidades ──────────────────────────────────────────
        const pokemonAbilities = document.getElementById("pokemon-abilities");
        pokemonAbilities.innerHTML = "";

        response.abilities.forEach(abilityEntry => {
            const li = document.createElement("li");
            li.textContent = abilityEntry.ability.name;
            if (abilityEntry.is_hidden) {
                li.textContent += " (hidden)";
            }
            pokemonAbilities.appendChild(li);
            console.log(`Habilidad: ${abilityEntry.ability.name} | hidden: ${abilityEntry.is_hidden}`);
        });
        // ─────────────────────────────────────────────────────────

    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
}
// fetch(`${POKEAPI_URL}/pokemon`)
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// });