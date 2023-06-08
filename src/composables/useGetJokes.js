import axios from "axios";
import { useQuery } from "@tanstack/vue-query";
import { usePage } from "./usePage";

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJokes({ queryKey }) {
  await sleep(500);
  return axios.get(
    `http://localhost:3000/jokes?_page=${queryKey[1]}&_limit=5&_sort=question&_order=desc`
  );
}

function useGetJokes(select) {
  const { page } = usePage();

  const { data, isLoading, error, isPreviousData } = useQuery({
    queryKey: ["jokes", page],
    queryFn: getJokes,
    select,
    keepPreviousData: true,
  });

  return { data, isLoading, error, isPreviousData };
}

export { useGetJokes };
