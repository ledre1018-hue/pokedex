const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");

const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon?limit=151`).then(res => res.json());
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
    if (!pokemonUrl) return;

    try {
        const response = await fetch(pokemonUrl).then(res => res.json());
        console.log("Pokémon seleccionado:", response);

        const pokemonImage = document.getElementById("pokemon-image");
        const pokemonName = document.getElementById("pokemon-name");
        const pokemonStats = document.getElementById("pokemon-stats");
        const pokemonAbilities = document.getElementById("pokemon-abilities");
        const typeHover = document.getElementById("pokemon-type-hover");

        // Nombre e imagen
        pokemonName.textContent = response.name;
        pokemonImage.src = response.sprites.front_default || "";

        // Stats
        pokemonStats.innerHTML = "";
        response.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);
        });

        // Habilidades
        pokemonAbilities.innerHTML = "";
        response.abilities.forEach(abilityEntry => {
            const li = document.createElement("li");
            let text = abilityEntry.ability.name.replace("-", " ");
            if (abilityEntry.is_hidden) text += " (hidden)";
            li.textContent = text;
            pokemonAbilities.appendChild(li);
        });

        // ==================== TIPOS - Hover sobre la imagen ====================
        const types = response.types.map(t => t.type.name);

        const showTypes = () => {
            typeHover.innerHTML = types.map(type => 
                `<span class="type-${type}">${type}</span>`
            ).join(" / ");
            typeHover.classList.add("show");
        };

        const hideTypes = () => {
            typeHover.classList.remove("show");
        };

        // Remover listeners anteriores
        pokemonImage.removeEventListener("mouseenter", showTypes);
        pokemonImage.removeEventListener("mouseleave", hideTypes);

        // Agregar listeners
        pokemonImage.addEventListener("mouseenter", showTypes);
        pokemonImage.addEventListener("mouseleave", hideTypes);

    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
};