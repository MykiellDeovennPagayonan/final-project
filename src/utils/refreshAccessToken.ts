import jwt from "jsonwebtoken"

export default function refreshAccessToken(user) {
  const token = jwt.sign(user, process.env.JWT_REFRESH_SECRET)

  return token
}
