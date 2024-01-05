export default async function toDelete(url, id) {
  const token = localStorage.getItem("token")

  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  })
}