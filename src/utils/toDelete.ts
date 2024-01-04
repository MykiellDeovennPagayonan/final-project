export default async function toDelete(url, id) {
  const token = localStorage.getItem("token")

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  }).then((res) => res.json())


}