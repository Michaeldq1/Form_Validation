import _ from "lodash";
import "./style.css";

const email = document.getElementById("email");
const emailValidation = document.querySelector("#email + span.validation");

const country = document.getElementById("country");
const countryValidation = document.querySelector("#country + span.validation");

const zipcode = document.getElementById("zipcode");
const zipcodeValidation = document.querySelector("#zipcode + span.validation");

const password = document.getElementById("password");
const passwordValidation = document.querySelector(
  "#password + span.validation"
);

const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordValidation = document.querySelector(
  "#confirm-password + span.validation"
);

const inputNameValidationDescriptions = [
  { inputName: "email", inputDescription: "an email address." },
  { inputName: "country", inputDescription: "a country." },
  { inputName: "zipcode", inputDescription: "a valid zipcode." },
  { inputName: "password", inputDescription: "a valid password" },
];

const submitButton = document.getElementById("submit-button");
submitButton.disabled = true;

email.addEventListener("input", () => {
  validationCheck(email, emailValidation);
  checkValidations();
});

country.addEventListener("input", () => {
  validationCheck(country, countryValidation);
  checkValidations();
});

zipcode.addEventListener("input", () => {
  validationCheck(zipcode, zipcodeValidation);
  checkValidations();
});

password.addEventListener("input", () => {
  validationCheck(password, passwordValidation);
  checkValidations();
});

confirmPassword.addEventListener("input", () => {
  checkConfirmPassword();
  checkValidations();
});

const showValidation = (inputElement, validationElement) => {
  inputElement.classList.remove("valid");
  inputElement.classList.add("invalid");
  if (inputElement.validity.valueMissing) {
    validationElement.textContent = `Field must contain ${getInputDescription(
      inputElement
    )}`;
  } else if (
    inputElement.validity.typeMismatch ||
    inputElement.validity.patternMismatch ||
    inputElement.validity.tooShort
  ) {
    validationElement.textContent = `Please enter ${getInputDescription(
      inputElement
    )}`;
  }
};

const resetValidation = (inputElement, validationElement) => {
  validationElement.textContent = "";
  validationElement.className = "validation";
  inputElement.classList.remove("invalid");
};

const validationCheck = (inputElement, validationElement) => {
  if (inputElement.validity.valid) {
    resetValidation(inputElement, validationElement);
    inputElement.classList.add("valid");
  } else {
    showValidation(inputElement, validationElement);
  }
};

const checkConfirmPassword = () => {
  if (confirmPassword.value === password.value) {
    confirmPassword.classList.remove("invalid");
    confirmPassword.classList.add("valid");
  } else {
    confirmPassword.classList.remove("valid");
    confirmPassword.classList.add("invalid");
  }
};

const getInputDescription = (inputElement) => {
  const inputName = inputElement.getAttribute("name");
  const descriptionObject = inputNameValidationDescriptions.find(
    (obj) => obj.inputName === inputName
  );
  return descriptionObject ? descriptionObject.inputDescription : "";
};

const checkValidations = () => {
  const inputs = [email, country, zipcode, password, confirmPassword];
  const isValid = inputs.every((input) => input.classList.contains("valid"));
  submitButton.disabled = !isValid;
};
