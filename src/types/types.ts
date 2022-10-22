//declares type of values in 'pokemonStats' object
export interface PokemonStats {
  id: null | number;
  name: null | string;
  types: null | string[];
  height: null | number;
  weight: null | number;
  picture: null | string;
}

export interface ObtainPokemonResponse {
  results: Results[];
  count: number;
  next: string | null;
  previous: string | null;
}
export interface Results {
  name: string;
  url: string;
}

export interface PokemonType {
  type: Results;
}
export interface PokemonStatsResponse {
  id: number;
  name: string;
  types: PokemonType[];
  height: number;
  weight: number;
  sprites: { other: { "official-artwork": { front_default: string } } };
}
