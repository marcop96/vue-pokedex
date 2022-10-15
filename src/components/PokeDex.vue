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

    <div id="pokemon-grid" class="grid grid-cols-4 grid-rows-5"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
