import { Badge, Box, Group, SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Record } from "pocketbase";
import { useContext } from "react";
import GameItem from "../component/gameList/GameItem";
import Header from "../component/Header";
import Loading from "../component/Loading";
import { PocketBaseContext } from "../component/Pocketbase";

export interface GameData extends Record {
  name: string;
  description: string;
  genre: string[];
  titleImage: string;
  gameImages: string[];
}

export interface GenreData extends Record {
  name: string;
}

export default function Index() {
  const { loading, pocketBase } = useContext(PocketBaseContext);

  const gamesQuery = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const games = await pocketBase
        .collection("games")
        .getFullList<GameData>(undefined, { sort: "created", expand: "genre" });
      return games;
    },
    refetchOnWindowFocus: false,
    enabled: !loading,
  });

  const genresQuery = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const genres = await pocketBase
        .collection("genres")
        .getFullList<GenreData>(undefined, { sort: "created" });
      return genres;
    },
    refetchOnWindowFocus: false,
    enabled: !loading,
  });

  return (
    <>
      <Header showLogin />
      {gamesQuery.isLoading || genresQuery.isLoading || loading ? (
        <Loading />
      ) : gamesQuery.isError || genresQuery.isError ? (
        <>Error</>
      ) : (
        <>
          <Group p={8} spacing={4}>
            {genresQuery?.data?.map?.((genre) => (
              <Badge key={genre.id} variant="filled">
                {genre.name}
              </Badge>
            ))}
          </Group>
          <Box p={8}>
            <SimpleGrid cols={7}>
              {gamesQuery.data?.map((game) => (
                <GameItem key={game.id} game={game} />
              ))}
            </SimpleGrid>
          </Box>
        </>
      )}
    </>
  );
}
