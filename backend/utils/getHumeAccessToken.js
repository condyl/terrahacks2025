const { fetchAccessToken } = require("hume");

const getHumeAccessToken = async () => {
  const apiKey = process.env.HUME_API_KEY;
  const secretKey = process.env.HUME_SECRET_KEY;

  if (!apiKey || !secretKey) {
    throw new Error(
      "Missing required environment variables (HUME_API_KEY or HUME_SECRET_KEY)"
    );
  }

  try {
    const accessToken = await fetchAccessToken({
      apiKey: apiKey,
      secretKey: secretKey,
    });

    if (!accessToken || accessToken === "undefined") {
      throw new Error("Unable to get access token");
    }

    return accessToken;
  } catch (error) {
    throw error;
  }
};

module.exports = { getHumeAccessToken };
