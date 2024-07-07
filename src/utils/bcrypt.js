import bcryptjs from "bcryptjs";

const saltRound = 10;

export const hashPassword = (plainPassword) => {
  return bcryptjs.hashSync(plainPassword, saltRound);
};

export const compareSync = (plainPassword, hashPass) => {
  return bcryptjs.compareSync(plainPassword, hashPass);
};
