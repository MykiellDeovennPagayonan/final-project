const openAiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

export default async function getEmbeddings(sentencesText : Array<string>) {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${openAiKey}`,
      'Content-Type': 'application/json'
    }, body: JSON.stringify({ 
    input: sentencesText,
    model: "text-embedding-ada-002" })
  }).then(res => res.json())

  return (response.data)
}