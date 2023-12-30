const jwt = require('jsonwebtoken');

export default function getUserInfo() : UserInfo {
  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);

  return decodedToken
}
