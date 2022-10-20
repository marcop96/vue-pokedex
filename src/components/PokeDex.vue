<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div>
    <div id="search-bar" class="form-control">
      <div class="input-group place-content-center mt-6">
        <input
          type="text"
          placeholder="Search a Pokemon"
          class="input input-bordered w-96 bg-yellow-200"
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

    <div class="flex justify-start items-center mt-11 ml-5">
      <div id="pokemon-list">
        <ul>
          <li
            v-for="pokemon in pokemons"
            @click="
              clickedPokemonURL = pokemon.url;
              obtainPokemonInfo();
            "
          >
            {{ pokemon.name }}
          </li>
        </ul>
      </div>

      <div
        id="pokemon-info-container"
        class="h-96 w-2/5 -4 mx-auto flex flex-col items-center"
      >
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
            <li class="font-bold text-xl">ID: {{ pokemonStats.id }}</li>
            <li class="font-bold text-xl">Name: {{ pokemonStats.name }}</li>
            <li class="font-bold text-xl">Type: {{ pokemonStats.types }}</li>
            <li class="font-bold text-xl">
              Height: {{ pokemonStats.height }} cm
            </li>
            <li class="font-bold text-xl">
              Weight: {{ pokemonStats.weight }} kg
            </li>
          </ul>
        </div>
      </div>
    </div>

    <PaginationSystem :number-of-pages="countPokemons"></PaginationSystem>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

//Ref declares REACTIVE TYPES
import type { Ref } from "vue";
//import  new types
import type { PokemonStats, ObtainPokemonResponse } from "@/types/types";
//components
import PaginationSystem from "./PaginationSystem.vue";

const clickedPokemonURL = ref("");
const nextPokemonURL: Ref<null | string> = ref("");

const totalPokemonCount = ref();

const countPokemons = computed(() => {
  return Math.floor(totalPokemonCount.value / 20);
});
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

const activePage = ref("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
//function obtainPokemons() {
//}

//obtainPokemons();
onMounted(() => {
  fetch(activePage.value)
    .then((response) => response.json())
    .then((data: ObtainPokemonResponse) => {
      //for setting up the list
      pokemons.value = data.results;

      //by default this would be page 2
      nextPokemonURL.value = data.next;
      totalPokemonCount.value = data.count;
    });
});
function obtainPokemonInfo() {
  fetch(clickedPokemonURL.value)
    .then((response) => response.json())
    .then((data) => {
      pokemonStats.value.id = data.id;
      pokemonStats.value.name = data.name;
      pokemonStats.value.types = data.types[0].type.name;
      pokemonStats.value.height = data.height;
      pokemonStats.value.weight = data.weight / 10;
      pokemonStats.value.picture =
        data.sprites.other["official-artwork"]["front_default"];
    });
}
</script>
