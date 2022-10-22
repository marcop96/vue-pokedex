<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div id="search-bar" class="form-control">
    <div class="input-group place-content-center mt-6">
      <input
        type="text"
        placeholder="Search a Pokemon"
        class="input input-bordered w-96 bg-red-300"
      />
      <button class="btn btn-square bg-red-500">
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
  <div class="flex items-center w-full">
    <!-- <div class="justify-self-start w-32 mt-11 ml-5"> -->
    <n-scrollbar class="w-36" style="max-height: 500px" trigger="none">
      <ul>
        <li
          class="text-xl ml-4 text-white hover:text-red-500 hover:font-extrabold hover:cursor-pointer"
          v-for="pokemon in pokemons"
          @click="
            clickedPokemonURL = pokemon.url;
            obtainPokemonInfo();
          "
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
            {{ pokemonStats.types && pokemonStats.types.join(", ") }}
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
import { ref, onMounted } from "vue";
import { NScrollbar, NCard } from "naive-ui";

//Ref declares REACTIVE TYPES
import type { Ref } from "vue";
//import  new types
import type {
  PokemonStats,
  ObtainPokemonResponse,
  PokemonStatsResponse,
} from "@/types/types";
//components
// import PaginationSystem from "./PaginationSystem.vue";

// const obtainPokemons = ref({
//   clickedPokemonURL: null,
//   prevPokemonURL: null,
//   nextPokemonURL: null,
//   totalPokemonCount: null,
// });

const clickedPokemonURL = ref("");
const nextPokemonURL: Ref<null | string> = ref("");
const totalPokemonCount = ref();

const pokemons = ref();

//declaro null para no tener errores en el futuro con los tipos

const pokemonStats: Ref<PokemonStats> = ref({
  id: null,
  name: null,
  types: null,
  height: null,
  weight: null,
  picture: null,
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
function obtainPokemonInfo() {
  fetch(clickedPokemonURL.value)
    .then((response) => response.json())
    .then((data: PokemonStatsResponse) => {
      pokemonStats.value.id = data.id;
      pokemonStats.value.name = data.name;
      pokemonStats.value.types = data.types.map((type) => type.type.name);
      pokemonStats.value.height = data.height;
      pokemonStats.value.weight = data.weight / 10;
      pokemonStats.value.picture =
        data.sprites.other["official-artwork"]["front_default"];
    });
}
</script>
