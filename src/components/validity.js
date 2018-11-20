export function validateString(nameControl, stringToValidate) {
  const trimmedStringToValidate = stringToValidate.trim();
  if (!trimmedStringToValidate.localeCompare("")) {
    return "Please introduce a " + nameControl;
  }
}
