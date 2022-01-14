import { PrismaClient } from "@prisma/client";
import { TMDBGenreResult, TMDBResult } from "../type";
import { Common } from "./common";

export class TMDB extends Common {
  private apiKey = "873061bde64d952fd76d3a2549620e0a";
  public db: PrismaClient;

  constructor() {
    super();
    this.db = new PrismaClient();
  }

  public async getData(page = 1) {
    const genres = await this.db.genre.findMany();

    for (let index = 0; index < page; index++) {
      console.log(`getting page ${index + 1}`);

      const data = await this.get<TMDBResult.RootObject>(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          this.apiKey
        }&language=en-US&page=${index + 1}`
      );

      data.results.forEach(async (d) => {
        const year = parseInt(d.release_date?.split("-")[0] ?? 0);
        const x = {
          name: d.title,
          description: d.overview,
          image_potrait: `https://image.tmdb.org/t/p/original${d.poster_path}`,
          image_wide: `https://image.tmdb.org/t/p/original${d.backdrop_path}`,
          director: "",
          year: isNaN(year) ? 0 : year,
          rating: "",
          genres: {
            connect: d.genre_ids
              .map((id) => ({
                id: genres.find((g) => g.id === id)?.id ?? 0,
              }))
              .filter((g) => g.id !== 0),
          },
        };

        await this.db.show.create({ data: x });
      });
    }
  }

  public async getGenres() {
    const data = await this.get<TMDBGenreResult.RootObject>(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US&page=1`
    );

    const genres = data.genres.map((d) => ({
      name: d.name,
      updatedAt: new Date(),
    }));

    await this.db.genre.createMany({
      data: genres,
    });
  }
}
