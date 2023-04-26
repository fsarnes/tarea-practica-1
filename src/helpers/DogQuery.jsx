import { useQuery } from "react-query";
import axios from "axios";
import dogNames from "dog-names";
import { getRandomDescription } from "./Descriptions";

const DogQuery = async (params) => {
  let dogName = dogNames.allRandom();
  const [queryName, queryParams] = params.queryKey;
  const data = {
    id: `${queryParams.dogCount}-${dogName}`,
    name: dogName,
    age: Math.floor(Math.random() * 17 + 1),
    distance: Math.floor(Math.random() * 30 + 1),
    description: getRandomDescription(),
    url: null
  };

  await axios
    .get("https://dog.ceo/api/breeds/image/random")
    .then(response => {
      data.url = response.data.message;
    });

  return data;
};

export function useDogQuery(params) {
  return useQuery(["DogQuery", params], DogQuery, {
    enabled: true,
    keepPreviousData: false,
    refetchOnWindowFocus: false
  });
}
