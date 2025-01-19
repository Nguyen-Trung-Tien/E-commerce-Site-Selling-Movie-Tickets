const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generalAccessToken = (payload) => {
  try {
    const access_token = jwt.sign(
      {
        ...payload,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "15m",
      }
    );
    return access_token;
  } catch (error) {
    console.error("Error generating access token:", error.message);
    throw new Error("Failed to generate access token");
  }
};

const generalRefreshToken = (payload) => {
  try {
    const refresh_token = jwt.sign(
      {
        ...payload,
      },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "365d",
      }
    );
    return refresh_token;
  } catch (error) {
    console.error("Error generating refresh token:", error.message);
    throw new Error("Failed to generate refresh token");
  }
};

const refreshTokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "ERR",
            message: "The authentication",
          });
        }
        const access_token = await generalAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });
        resolve({
          status: "OK",
          message: "SUCCESS",
          access_token,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshTokenJwtService,
};
