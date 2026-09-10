const errorMap = new Map([
  ["ERROR_BAD_PASSWORD", {
    serverText: "§cYour password is too short or too long! Please try with another one!",
    userText: "Your password is too short or too long. Please try again."
  }],
  ["ERROR_PASSWORDS_MISMATCH", {
    serverText: "Your passwords aren't the same",
    userText: "Passwords do not match."
  }],
  ["ERROR_ACCOUNT_EXISTS", {
    serverText: "§cYou already have registered this username!",
    userText: "This username is already registered."
  }],
  ["ERROR_USERAME_IS_PASSWORN", {
    serverText: "§cYou can't use your name as password, please choose another one...",
    userText: "Your username can't be your password."
  }],
  ["ERROR_ACCOUNT_DONT_EXISTS", {
    serverText: "§cThis user isn't registered!",
    userText: "This account isn't registered.."
  }],
  ["SUCCESS_ACCOUNT_CREATED", {
    serverText: "§2Successfully registered!",
    userText: "Your account has been created successfully."
  }],
  ["SUCCESS_PASSWORD_CHANGER", {
    serverText: "§2Password changed successfully!",
    userText: "Your Password has changed created successfully."
  }],
  ["SUCCESS_ACCOUNT_DELETED", {
    serverText: "§cSuccessfully unregistered!",
    userText: "Your Account has Unregistered successfully."
  }],
]);

export function findErrorByText(text) {
  for (const [key, value] of errorMap.entries()) {
    if (value.serverText === text) return { key, userText: value.userText };
  }
  return null;
}
