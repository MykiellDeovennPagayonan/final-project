'use client'

export default function Page({ params }: { params: { id: string } }) {
    return <div>My Post: {params.id}</div>
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/studygroup/");
      const data = await response.json();
      console.log(data);
      setStudyGroups(data);
    }
    fetchData();
  }, []);