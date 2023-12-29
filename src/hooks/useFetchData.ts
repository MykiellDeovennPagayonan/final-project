import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function useFetchData() {
  const [topics, setTopics] = useState<Array<Topic>>(null);
  const router = useRouter();

  async function getTopics(token) {
    console.log(token);
    const response = await fetch(`http://localhost:3001/api/study-notes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    if (!response.authenticated) {
      router.push("/login");
    }

    console.log(response.body);

    const topicsInitial = response.body;
    setTopics(topicsInitial);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    getTopics(token);
  }, []);

  return { topics }
}
