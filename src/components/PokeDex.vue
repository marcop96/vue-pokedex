<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="bg-yellow-200 h-screen">
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
              clickedPokemon = pokemon.url;
              pokemonInfo();
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
            :src="pokemonPicture"
            class="object-scale-down"
            width="300"
            height="300"
          />
        </div>
        <div class="info">
          <ul>
            <li class="font-bold text-xl">ID: {{ pokemonId }}</li>
            <li class="font-bold text-xl">Name: {{ pokemonName }}</li>
            <li class="font-bold text-xl">Type: {{ pokemonTypes }}</li>
            <li class="font-bold text-xl">Height: {{ pokemonHeight }} cm</li>
            <li class="font-bold text-xl">Weight: {{ pokemonWeight }} kg</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const clickedPokemon = ref("");
const pokemons = ref("");
const pokemonId = ref("");
const pokemonName = ref("");
const pokemonTypes = ref("");
const pokemonHeight = ref("");
const pokemonWeight = ref();

const pokemonPicture = ref(".");
function obtainPokemons() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
    .then((response) => response.json())
    .then((data) => (pokemons.value = data.results));
}
obtainPokemons();

function pokemonInfo() {
  fetch(clickedPokemon.value)
    .then((response) => response.json())
    .then((data) => {
      pokemonId.value = data.id;
      pokemonName.value = data.name;
      pokemonTypes.value = data.types[0].type.name;
      pokemonHeight.value = data.height;
      pokemonWeight.value = data.weight / 10;

      pokemonPicture.value =
        data.sprites.other["official-artwork"]["front_default"];
    });
}
</script>
