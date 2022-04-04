import Hospital from "../../models/Hospital.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../../errors/index.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const hospital = await Hospital.findOne({
    email: { $regex: email, $options: "i" },
  }).select("+password");
  console.log(hospital);
  if (!hospital || !hospital.hospitalStatus) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await hospital.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const tokenHospital = hospital.createJWT();
  hospital.password = undefined;
  res
    .status(StatusCodes.OK)
    .json({ hospital, tokenHospital, hospitalName: hospital.hospitalName });
};

const update = async (req, res) => {
  const { hospitalName, address, contect, email, pincode } = req.body;
  if (!hospitalName || !address || !contect || !email || !pincode) {
    throw new BadRequestError("Please provide all values");
  }
  console.log("-----------------------");
  console.log(req.hospital);
  const hospital = await Hospital.findOne({
    _id: req.hospital.hospitalId,
  });

  hospital.hospitalName = hospitalName;
  hospital.email = email;
  hospital.address = address;
  hospital.contect = contect;
  hospital.pincode = pincode;

  await hospital.save();

  const tokenHospital = hospital.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ hospital, tokenHospital, hospitalName: hospital.hospitalName });
};

export { login, update };
