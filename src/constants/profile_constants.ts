type ProfileState = {
  name: string;
  pic: any;
  curPassword: string;
  newPassword: string;
};

const INITIAL_PROFILE_STATE: ProfileState = {
  name: "",
  pic: "",
  curPassword: "",
  newPassword: "",
};

export { INITIAL_PROFILE_STATE };
