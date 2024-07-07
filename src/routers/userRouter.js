import express from "express";
import { newUserValidation } from "../middlewares/validation.js";
import { hashPassword } from "../utils/bcrypt.js";
import { insertUser } from "../models/user/UserModel.js";
import { v4 as uuidv4 } from "uuid";
import { insertSession } from "../models/session/SessionModel.js";
import { emailVerificationMail } from "../services/email/nodemailer.js";

const router = express.Router();

router.post("/", newUserValidation, async (req, res, next) => {
  try {
    // encrypt password

    req.body.password = hashPassword(req.body.password);

    const user = await insertUser(req.body);

    if (user?._id) {
      // create a unique url and add in the database

      const token = uuidv4();

      const obj = {
        token,
        associate: user.email,
      };

      const result = await insertSession(obj);

      if (result?._id) {
        // process for sending email

        // emailVerificationMail({
        //   email: user.email,
        //   fName: user.fName,
        //   url:
        //     process.env.FE_ROOT_URL + `/verify-user?c=${token}&e=${user.email}`,
        // });

        return res.json({
          status: "success",
          message:
            "We have sent you an email with instructions to verify your account. Please check email or junk to verify your account.",
        });
      }
    }

    res.json({
      status: error,
      message: "Unable to create an account please contact administration.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
