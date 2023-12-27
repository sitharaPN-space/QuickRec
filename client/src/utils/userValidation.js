import jwt from "jwt-decode";
let decodedData, token;

export function getUserDataFromToken() {
  try {
    token = localStorage.getItem("profile");
    const isGoogleAuth = token.length > 500; // custom auth or google auth
    const decodedToken = jwt(token);
    if (decodedToken.exp > Date.now() / 1000) {
      decodedData = decodedToken;
      if (isGoogleAuth) {
        decodedData.EmailAddress = decodedToken.email;
        decodedData.UserId = decodedToken.sub;
        decodedData.UserName = decodedToken.name;
        decodedData.UserRole = "Google User";
      }
      // console.log(token.length);
      // console.log(decodedData);
      // console.log(decodedToken);
    } else {
      localStorage.clear();
      decodedData = null;
    }
  } catch {
    decodedData = null;
  }
  return { result: decodedData, token: token };
}

export function isTokenExpired() {
  if (decodedData?.exp <= Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
}
