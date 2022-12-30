const Problems = require("../models/problemModel");
const mongoose = require("mongoose");

const findByDate = async (req, res) => {
  const date = req.query.date;
  // console.log("date in Backend", req.query);
  try {
    const problems = await Problems.find({ date: date });
    res.status(200).json(problems);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const problemCreate = async (req, res) => {
  const { date, name, link, platform, difficulty, topic, helpUsed } = req.body;
  console.log("reqBody : ", req.body);

  try {
    const problem = await Problems.create({
      date,
      name,
      link,
      platform,
      difficulty,
      topic,
      helpUsed,
    });
    if (problem) {
      console.log("first");
    } else {
      console.log("second");
    }
    res.status(200).json({ problem });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getAllProblems = async (req, res) => {
  const problems = await Problems.find({}).sort({ createdAt: -1 });
  res.status(200).json(problems);
};

const helpProblems = async (req, res) => {
  const problems = await Problems.find({ helpUsed: true }).sort({
    createdAt: -1,
  });
  res.status(200).json(problems);
};

const notHelpProblems = async (req, res) => {
  const problems = await Problems.find({ helpUsed: false }).sort({
    createdAt: -1,
  });
  res.status(200).json(problems);
};

const deleteProblem = async (req, res) => {
  const { link } = req.body;
  console.log(req.body);
  try {
    const problem = await Problems.deleteOne({ link: link });
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
      console.log(`Problem with this ${link} get deleted Successfully.`);
    } else {
      console.log("Problem Not Found of this link : " + link);
    }

    res.status(200).json("Problem is resolved.");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// to get full year data from this date to 1 year back
const getYearData = async (req, res) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 364);
  const endDate = new Date(
    startDate.getFullYear() + 1,
    startDate.getMonth(),
    startDate.getDate()
  );
  console.log("strdate,enddate", startDate, endDate);
  const data = [];
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    let dateStr = date.toLocaleDateString();
    // console.log("first : ", date, dateStr);
    try {
      const problems = await Problems.find({ date: dateStr });
      let dateParts = dateStr.split("/");
      dateStr = [dateParts[1], dateParts[0], dateParts[2]].join("/");
      let storeDate = new Date(dateStr);
      // storeDate.setDate(storeDate.getDate() + 1);
      data.push({ date: storeDate, count: problems.length });
    } catch (err) {
      console.log(err);
    }
    // console.log("second : ", date);
  }
  res.status(200).json(data);
};

const hardProblems = async (req, res) => {
  let hardProb = await Problems.find({ difficulty: "Hard" }).sort({
    createdAt: -1,
  });
  res.status(200).json(hardProb);
};

const mediumProblems = async (req, res) => {
  let mediumProb = await Problems.find({ difficulty: "Medium" }).sort({
    createdAt: -1,
  });
  res.status(200).json(mediumProb);
};

const easyProblems = async (req, res) => {
  let easyProb = await Problems.find({ difficulty: "Easy" }).sort({
    createdAt: -1,
  });
  res.status(200).json(easyProb);
};

const monthProblems = async (req, res) => {
  let startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    startDate.getDate()
  );
  console.log("strdate,enddate", startDate, endDate);
  let data = [];
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    let dateStr = date.toLocaleDateString();
    try {
      const problems = await Problems.find({ date: dateStr });
      data = [...problems, ...data];
    } catch (err) {
      console.log(err);
    }
    console.log("data : ", data);
  }
  res.status(200).json(data);
};

const weekProblems = async (req, res) => {
  let startDate = new Date();
  startDate.setDate(startDate.getDate() - 6);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate() + 6
  );
  console.log("strdate,enddate", startDate, endDate);
  let data = [];
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    let dateStr = date.toLocaleDateString();
    try {
      const problems = await Problems.find({ date: dateStr });
      data = [...problems, ...data];
    } catch (err) {
      console.log(err);
    }
    console.log("data : ", data);
  }
  res.status(200).json(data);
};

module.exports = {
  problemCreate,
  getAllProblems,
  deleteProblem,
  deleteAlreadyExist,
  findByDate,
  helpProblems,
  notHelpProblems,
  getYearData,
  hardProblems,
  mediumProblems,
  easyProblems,
  monthProblems,
  weekProblems,
};
