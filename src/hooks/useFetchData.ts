import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import getUserInfo from "@/utils/getUserInfo";

export default function useFetchData(url: string, forUser?: boolean) {
  const [data, setData] = useState<Array<any>>(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login")
    } else {
      getData(token)
    }
  }, []);

  async function getData(token) {
    if (forUser) {
      const userInfo = getUserInfo()
      const userId = userInfo.id

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
          setError(err);
        });

      if (!response.authenticated) {
        router.push("/login");
      }

      console.log(response.body);

      const topicsInitial = response.body;
      setData(topicsInitial);

    } else {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
          setError(err);
        });

      if (!response?.authenticated) {
        router.push("/login");
      }

      console.log(response.body);

      const topicsInitial = response.body;
      setData(topicsInitial);
    }
  }

  return { data, error };
}
