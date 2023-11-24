import { getProviders } from "next-auth/react"

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const providers = await getProviders()
  console.log("Providers", providers)
  res.end()
}