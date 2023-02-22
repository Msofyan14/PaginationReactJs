import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await User.count({
    where: {
      [Op.or]: [
        { name: { [Op.like]: "%" + search + "%" } },
        { email: { [Op.like]: "%" + search + "%" } },
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await User.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: "%" + search + "%" } },
        { email: { [Op.like]: "%" + search + "%" } },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

export const getUserByid = async (req, res) => {
  try {
    const users = await User.findByPk(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

// How to Add Data

// export const createUser = async (req, res) => {
//   const user = new User(req.body);
//   try {
//     const userAdd = await user.save();
//     res.status(201).json(userAdd);
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

export const createUser = async (req, res) => {
  const { name, email, gender } = req.body;
  try {
    const user = await User.create({
      name: name,
      email: email,
      gender: gender,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const UpdateUser = async (req, res) => {
  const { name, email, gender } = req.body;
  const userid = parseInt(req.params.id);
  try {
    const updatedUser = await User.findByPk(userid);
    updatedUser.name = name;
    updatedUser.email = email;
    updatedUser.gender = gender;
    await updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userid = parseInt(req.params.id);
    const user = await User.findByPk(userid);
    await user.destroy();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
