export default interface IPokemon {
  photo: string;
  name: string;
  weight?: number;
  pokedexNumber?: number;
  types?: Array<string>;
  abilities?: Array<string>;
}
