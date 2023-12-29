import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function useFetchData(url: string) {
  const [data, setData] = useState<Array<Topic>>(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function getData(token) {
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        setError(err);
      });

    if (!response.authenticated) {
      router.push("/login");
    }

    console.log(response.body);

    const topicsInitial = response.body;
    setData(topicsInitial);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    getData(token);
  }, []);

  return { data, error };
}
