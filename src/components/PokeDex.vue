<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="search-bar" class="form-control">
    <div class="input-group place-content-center mt-6">
      <input
        type="text"
        placeholder="Search a Pokemon by name or ID"
        class="input input-bordered w-3/6 bg-red-300 border-4 text-black"
        v-model="userSearchInput"
      />
      <button class="btn btn-square bg-red-500" @click="searchPokemon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  </div>
  <div class="flex flex-col items-center w-full sm:flex-row">
    <!-- <div class="justify-self-start w-32 mt-11 ml-5"> -->
    <n-scrollbar class="w-36" style="max-height: 500px" trigger="none">
      <ul>
        <li
          class="text-xl ml-4 text-white hover:text-red-500 hover:font-extrabold hover:cursor-pointer"
          v-for="pokemon in filterSearch || pokemons"
          @click="obtainPokemonInfo(pokemon.url)"
        >
          {{ pokemon.name }}
        </li>
      </ul>
    </n-scrollbar>

    <n-card class="justify-center bg-red-500 mt-4 w-max m-auto" size="small">
      <div class="img">
        <img
          :src="pokemonStats.picture as string"
          class="object-scale-down"
          width="300"
          height="300"
        />
      </div>
      <div class="info">
        <ul>
          <li class="font-bold text-white text-xl">
            ID: {{ pokemonStats.id }}
          </li>
          <li class="font-bold text-white text-xl">
            Name: {{ pokemonStats.name }}
          </li>
          <li class="font-bold text-white text-xl">
            Type:
            {{ pokemonStats.types && pokemonStats.types.join(" | ") }}
          </li>
          <li class="font-bold text-white text-xl">
            Height: {{ pokemonStats.height }} cm
          </li>
          <li class="font-bold text-white text-xl">
            Weight: {{ pokemonStats.weight }} kg
          </li>
        </ul>
      </div>
    </n-card>
  </div>

  <!-- <PaginationSystem :number-of-pages="countPokemons"></PaginationSystem> -->
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { NScrollbar, NCard } from "naive-ui";
//Ref declares reactive TYPES
import type { Ref } from "vue";
import type {
  PokemonStats,
  ObtainPokemonResponse,
  PokemonStatsResponse,
  Results,
} from "@/types/types";

const nextPokemonURL: Ref<null | string> = ref("");
const totalPokemonCount = ref();

const pokemons = ref();
//declares type null to avoid conflicts
//Ref <PokemonStats> is the TYPE

const pokemonStats: Ref<PokemonStats> = ref({
  id: null,
  name: null,
  types: null,
  height: null,
  weight: null,
  picture: "../src/assets/pokeball.png",
});
const activePage = ref(
  "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0"
);

//obtain initial pokemon response and gross data
onMounted(() => {
  fetch(activePage.value)
    .then((response) => response.json())
    .then((data: ObtainPokemonResponse) => {
      //for setting up the list
      pokemons.value = data.results;
      //by default next would be page 2
      nextPokemonURL.value = data.next;
      totalPokemonCount.value = data.count;
    });
});

// fetches info for specific pokemon
function obtainPokemonInfo(pokemon: string) {
  pokemonStats.value = {
    id: null,
    name: "loading..",
    types: null,
    height: null,
    weight: null,
    picture: "../src/assets/pokeball.png",
  };
  fetch(pokemon)
    .then((response) => response.json())
    .then((data: PokemonStatsResponse) => {
      pokemonStats.value.id = data.id;
      pokemonStats.value.name = data.name;
      pokemonStats.value.types = data.types.map((type) => type.type.name);
      pokemonStats.value.height = data.height;
      pokemonStats.value.weight = data.weight / 10;
      pokemonStats.value.picture =
        data.sprites.other["official-artwork"]["front_default"];
      userSearchInput.value = "";
    });
}

const userSearchInput = ref("");

function searchPokemon() {
  let query;

  //if it's an ID(number)
  if (!isNaN(parseInt(userSearchInput.value, 10))) {
    query = userSearchInput.value;
  }

  //if its not an ID(if its a string)
  else if (filterSearch.value.length) {
    //obtains the first element that matches criteria
    query = filterSearch.value[0].name;
  }
  //when no conditions are met, doesnt fetch
  else {
    return;
  }

  obtainPokemonInfo(`https://pokeapi.co/api/v2/pokemon/${query}`);
}
//reactively filters pokemons based on user search

const filterSearch = computed(() => {
  if (!isNaN(parseInt(userSearchInput.value, 10))) {
    return pokemons.value;
  }

  if (!pokemons.value) {
    return [];
    //pokemons.value != undefined
  }
  return pokemons.value.filter((pokemon: Results) =>
    pokemon.name.includes(userSearchInput.value.toLowerCase())
  );
});
</script>
