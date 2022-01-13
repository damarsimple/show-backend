import { TMDB } from "./scrappers/tmdb";

async function main() {
  await new TMDB().getGenres();
  await new TMDB().getData(100);
}

main();
