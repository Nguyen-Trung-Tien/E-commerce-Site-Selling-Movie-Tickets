const jwt = require("jsonwebtoken");

export const generalAccessToken = (payload) => {
  const access_token = jwt.sign(
    {
      payload,
    },
    "access_token",
    { expiresIn: "1h" }
  );
  return access_token;
};

export const generalRefreshToken = (payload) => {
  const access_token = jwt.sign(
    {
      payload,
    },
    "refresh_token",
    { expiresIn: "365" }
  );
  return access_token;
};
module.exports = { generalAccessToken, generalRefreshToken };
