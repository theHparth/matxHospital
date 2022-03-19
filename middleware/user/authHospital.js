import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../../errors/index.js";

UnAuthenticatedError;
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  const tokenHospital = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(tokenHospital, process.env.JWT_SECRET);
    req.hospital = { hospitalId: payload.hospitalId };

    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
