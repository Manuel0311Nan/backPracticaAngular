import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

import { validationResult } from "express-validator";
import  jwt  from "jsonwebtoken";


const registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array())
    } else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                emoji: req.body.emoji
            });
            user.save().then((response) => {
                res.status(201).json({
                    message: "User successfully created!",
                    result: response
                });
            }).catch(error => {
                res.status(500).json({
                    error:error
                })
            })
        })
    }
}

const loginUser = async (req, res, next) => {
    let getUser;
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: 'Authentication failed'
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password)
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: getUser._id
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate("name");
        return res.status(200).json(users);
      } catch (error) {
        return next(error);
      }
    };
    const getUserById = async (req, res, next) => {

        const { id } = req.params;
        try {
      
          const userbyid = await User.findById(id)
            .select({ password: 0 });
          return res.status(200).json(userbyid);
      
        } catch (error) {
          return next(error)
        }
};
      
const editUser = async (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('User successfully updated!')
        }
    })
}

const deleteUser = async (req, res, next) => {
    User.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
}
export {registerUser, loginUser, getUsers, getUserById, editUser, deleteUser}

