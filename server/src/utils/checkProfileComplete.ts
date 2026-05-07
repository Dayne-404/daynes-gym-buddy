import { profileCompleteFields } from "../types/auth.types";

const checkProfileComplete = (profile: profileCompleteFields): boolean =>
  Object.values(profile).every((value) => value != null);

export default checkProfileComplete