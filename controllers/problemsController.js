const Problems = require("../models/problemModel");

const findByDate = async (req, res) => {
  const date = req.query.date;
  const user_id = req.user._id;
  // console.log("date in Backend", req.query);
  try {
    const problems = await Problems.find({ date: date, user_id });
    res.status(200).json(problems);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const getAllProblems = async (req, res) => {
  const user_id = req.user._id;
  const problems = await Problems.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(problems);
};

const problemCreate = async (req, res) => {
  const { date, name, link, platform, difficulty, topic, helpUsed } = req.body;
  // console.log("reqBody : ", req.body);

  try {
    const user_id = req.user._id;
    const problem = await Problems.create({
      date,
      name,
      link,
      platform,
      difficulty,
      topic,
      helpUsed,
      user_id,
    });
    if (problem) {
      // console.log("first");
    } else {
      // console.log("second");
    }
    res.status(200).json({ problem });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const deleteProblem = async (req, res) => {
  const { id } = req.body;

  try {
    const problem = await Problems.deleteOne({ _id: id });
    res.status(200).json("Problem is Deleted Successfully.");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAlreadyExist = async (req, res) => {
  const { link } = req.body;

  try {
    const problem = await Problems.findOneAndDelete({ link: link });
    if (problem) {
      // console.log(`Problem with this ${link} get deleted Successfully.`);
    } else {
      // console.log("Problem Not Found of this link : " + link);
    }

    res.status(200).json("Problem is resolved.");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  problemCreate,
  getAllProblems,
  deleteProblem,
  deleteAlreadyExist,
  findByDate,
};
