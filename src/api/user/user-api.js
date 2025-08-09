export const loginUser = async (userdata) => {
  let { useremail, password, rememberMe } = userdata;
  console.log(userdata);
  try {
    // let encryUserData = EncryptData(JSON.stringify(data));
    let { data } = await axios.post("http://localhost:3000/login", userdata);
    // console.log(data);
  } catch (error) {
    console.error("API Error: Could not log in user.", error);
    throw error;
  }
};
