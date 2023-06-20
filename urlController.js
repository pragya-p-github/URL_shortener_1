const shortid = require("shortid");
const URL = require("./urlModel");

const generateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  let shortId = shortid.generate();
  let isDuplicate = false;

  while (!isDuplicate) {
    const existingURL = await URL.findOne({ shortId });
    if (!existingURL) {
      isDuplicate = true;
    } else {
      shortId = shortid.generate();
    }
  }

  try {
    const newURL = await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      note: body.note, // Include the note value
      visitHistory: [{ timestamp: Date.now() }],
    });

    return res.json({ id: newURL.shortId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};




const getAnalytics = async(req, res) => {
  const shortId = req.params.shortId;
  try {
    const url = await URL.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    const analytics = {
      shortId: url.shortId,
      redirectURL: url.redirectURL,
      note: url.note,
      totalClicks: url.visitHistory.length,
      lastClicked: url.visitHistory.length > 0 ? url.visitHistory[url.visitHistory.length - 1].timestamp : null,
    };

    return res.json({ analytics });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

const searchURLs = async(req, res) => {
  const keyword = req.query.keyword;
  const option = req.query.option; // Change variable name to 'option'

  let matchQuery = {};
  let projectFields = {};

  if (option === "shortUrl") { // Update variable name here as well
    matchQuery = { shortId: keyword };
  } else if (option === "originalUrl") { // Update variable name here as well
    matchQuery = { redirectURL: { $regex: keyword, $options: "i" } };
  } else if (option === "notes") { // Update variable name here as well
    matchQuery = { note: { $regex: keyword, $options: "i" } };
  }

  try {
    const results = await URL.aggregate([
      { $match: matchQuery },
      {
        $project: {
          _id: 0,
          shortId: 1,
          redirectURL: 1,
          note: 1,
          lastClicked: {
            $cond: [
              { $isArray: "$visitHistory" },
              { $max: "$visitHistory.timestamp" },
              null,
            ],
          },
          visitHistory: 1,
        },
      },
    ]);

    return res.json({ results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

// ...


module.exports = {
  generateNewShortURL,
  getAnalytics,
  searchURLs,
};
