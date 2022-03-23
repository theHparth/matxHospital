import { UnAuthenticatedError } from "../../errors/index.js";

const checkPermissionsHospital = (requestUser, resourceUserId) => {
  // if (requestHospital.hospitalName === hospitalname) return;
  if (requestUser.hospitalId === resourceUserId.toString()) return;
  console.log("not authorized");
  throw new UnAuthenticatedError("Not authorized to access this route");
};

export default checkPermissionsHospital;

// import { UnAuthenticatedError } from "../errors/index.js";

// const checkPermissions = (requestUser, resourceUserId) => {
//   if (requestUser.userId === resourceUserId.toString()) return;

//   throw new UnAuthenticatedError("Not authorized to access this route");
// };

// export default checkPermissions;
