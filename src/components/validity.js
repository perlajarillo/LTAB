export function validateString(nameControl, stringToValidate) {
  const trimmedStringToValidate = stringToValidate.trim();
  if (!trimmedStringToValidate.localeCompare("")) {
    if (nameControl === "stateCode") nameControl = "state";
    return "Please introduce a " + nameControl;
  }
}
