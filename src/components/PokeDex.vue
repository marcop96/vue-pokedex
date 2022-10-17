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
        <button class="btn btn-square bg-red-500" @click="pokemonInfo()">
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
          <li v-for="pokemon in pokemons" @click="clickedPokemon = pokemon.url">
            {{ pokemon.name }}
          </li>
        </ul>
      </div>

      <div
        id="pokemon-info-container"
        class="h-96 w-2/5 border-4 border-red-500 mx-auto flex flex-col items-center"
      >
        <div class="img">
          <img
            src="https://images.freeimages.com/images/large-previews/8a5/shooting-the-sunset-1381775.jpg"
          />
        </div>
        <div class="info">
          <ul>
            <li>Name</li>
            <li>type</li>
            <li>INFO</li>
            <li>MORE INFO</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const clickedPokemon = ref("");
const pokemons = ref();
const pokemonId = ref("");
function obtainPokemons() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
    .then((response) => response.json())
    .then((data) => (pokemons.value = data.results));
}
obtainPokemons();

function pokemonInfo() {
  fetch(clickedPokemon.value)
    .then((response) => response.json())
    .then((data) => (pokemonId.value = data.id));
  console.log(pokemonId.value);
}
</script>
