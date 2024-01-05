import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import getUserInfo from "@/utils/getUserInfo";

export default function useFetchData(url: string, forUser?: boolean) {
  const [data, setData] = useState<Array<any>>(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token: string = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      getData(token);
    }
  }, []);

  async function getData(token: string) {
    console.log(url);

    if (forUser) {
      const userInfo = getUserInfo();
      const userId = userInfo.id;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok && response.status === 401) {
          router.push("/login");
        }

        const responseBody = await response.json();

        console.log(responseBody.body);

        const dataInitial = responseBody.body;
        setData(dataInitial);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    } else {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok && response.status === 401) {
          router.push("/login");
        }
        
        const responseBody = await response.json();

        console.log(responseBody.body);

        const dataInitial = responseBody.body;
        setData(dataInitial);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
  }

  return { data, error };
}
