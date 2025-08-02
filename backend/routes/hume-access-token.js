const express = require("express");
const { getHumeAccessToken } = require("../utils/getHumeAccessToken");

const router = express.Router();

// Get access token for Hume API
router.get("/access-token", async (req, res) => {
  try {
    const accessToken = await getHumeAccessToken();

    res.json({
      accessToken,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
});

module.exports = router;
