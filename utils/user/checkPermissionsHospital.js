import { UnAuthenticatedError } from "../../errors/index.js";

const checkPermissionsHospital = (requestHospital, hospitalname) => {
  if (requestHospital.hospitalName === hospitalname) return;

  throw new UnAuthenticatedError("Not authorized to access this route");
};

export default checkPermissionsHospital;
