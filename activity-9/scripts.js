console.log("=== Activity 9: Contact Form Validation ===");

// Part A: Form Access Demonstrations
console.log("\n=== FORM ACCESS DEMONSTRATIONS ===");

const contactForm = document.getElementById("contactForm");
const formElements = contactForm.elements;

console.log("Contact form:", contactForm);
console.log("Form elements collection:", formElements);
console.log("Form elements count:", formElements.length);

console.log("\nDifferent ways to access form elements:");
console.log("By ID:", document.getElementById("name"));
console.log("By name (form.elements):", formElements["name"]);
console.log("By index:", formElements[0]);

console.log("\nAll form elements:");
for (let i = 0; i < formElements.length; i++) {
  const element = formElements[i];
  console.log(
    `${i}: ${element.tagName} - name: "${element.name}", type: "${element.type}"`
  );
}

// Part B: Form Event Handling and Validation State
console.log("\n=== FORM EVENT HANDLING ===");

const validationState = {
  name: false,
  email: false,
  subject: false,
  message: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Part C: Input Validation Functions
function validateName(value) {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return {
      isValid: false,
      message: "Name is required.",
    };
  }

  console.log("Validating name: \u2713 Valid");
  return {
    isValid: true,
    message: "",
  };
}

function validateEmail(value) {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return {
      isValid: false,
      message: "Email address is required.",
    };
  }

  if (!emailPattern.test(trimmedValue)) {
    return {
      isValid: false,
      message: "Please enter a valid email address.",
    };
  }

  console.log("Validating email: \u2713 Valid");
  return {
    isValid: true,
    message: "",
  };
}

function validateSubject(value) {
  if (value === "") {
    return {
      isValid: false,
      message: "Please select a subject.",
    };
  }

  console.log("Validating subject: \u2713 Valid");
  return {
    isValid: true,
    message: "",
  };
}

function validateMessage(value) {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return {
      isValid: false,
      message: "Message is required.",
    };
  }

  if (trimmedValue.length < 10) {
    return {
      isValid: false,
      message: "Message must be at least 10 characters long.",
    };
  }

  console.log("Validating message: \u2713 Valid");
  return {
    isValid: true,
    message: "",
  };
}

// Part D: Real-time Validation Feedback
function showValidationMessage(fieldName, validation) {
  const errorElement = document.getElementById(`${fieldName}Error`);
  const inputElement = document.getElementById(fieldName);

  errorElement.classList.remove("show");
  inputElement.classList.remove("valid", "invalid");

  if (!validation.isValid && validation.message) {
    errorElement.textContent = validation.message;
    errorElement.classList.add("show");
    inputElement.classList.add("invalid");
  } else if (validation.isValid) {
    inputElement.classList.add("valid");
  }
}

function validateField(fieldName, value) {
  let validation;

  switch (fieldName) {
    case "name":
      validation = validateName(value);
      break;
    case "email":
      validation = validateEmail(value);
      break;
    case "subject":
      validation = validateSubject(value);
      break;
    case "message":
      validation = validateMessage(value);
      break;
    default:
      console.warn(`Unknown field: ${fieldName}`);
      return false;
  }

  validationState[fieldName] = validation.isValid;
  showValidationMessage(fieldName, validation);
  updateSubmitButton();

  return validation.isValid;
}

function updateSubmitButton() {
  const submitBtn = document.getElementById("submitBtn");
  const isFormValid = Object.values(validationState).every(
    (isValid) => isValid
  );

  submitBtn.disabled = !isFormValid;

  console.log("Form validation state:", validationState);
  console.log("Form is valid:", isFormValid);
}

function setupValidationListeners() {
  console.log("Setting up validation event listeners...");

  ["name", "email", "message"].forEach((fieldName) => {
    const element = document.getElementById(fieldName);

    element.addEventListener("input", (e) => {
      console.log(`Input event on ${fieldName}:`, e.target.value);
      validateField(fieldName, e.target.value);
    });

    element.addEventListener("blur", (e) => {
      console.log(`Blur event on ${fieldName}:`, e.target.value);
      validateField(fieldName, e.target.value);
    });
  });

  document.getElementById("subject").addEventListener("change", (e) => {
    console.log("Subject changed:", e.target.value);
    validateField("subject", e.target.value);
  });
}

// Part E: Form Submission Handling
function handleFormSubmit(e) {
  e.preventDefault();
  console.log("\n=== FORM SUBMISSION ATTEMPT ===");

  document.getElementById("formSuccess").classList.add("hidden");
  document.getElementById("formError").classList.add("hidden");

  const formData = new FormData(contactForm);
  const isFormValid = validateAllFields(formData);

  if (isFormValid) {
    console.log("\u2713 Form validation successful!");

    console.log("Form data:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    showFormSuccess();

    setTimeout(() => {
      resetForm();
    }, 2000);
  } else {
    console.log("\u2717 Form validation failed!");
    showFormError("Please fix the errors above and try again.");
  }
}

function validateAllFields(formData) {
  console.log("Validating all fields before submission...");

  const fieldsToValidate = {
    name: formData.get("name") || "",
    email: formData.get("email") || "",
    subject: formData.get("subject") || "",
    message: formData.get("message") || "",
  };

  let isValid = true;

  Object.entries(fieldsToValidate).forEach(([fieldName, value]) => {
    const fieldValid = validateField(fieldName, value);
    if (!fieldValid) {
      isValid = false;
    }
  });

  return isValid;
}

function showFormSuccess() {
  const successElement = document.getElementById("formSuccess");
  successElement.classList.remove("hidden");
}

function showFormError(message) {
  const errorElement = document.getElementById("formError");
  const errorMessageElement = document.getElementById("formErrorMessage");

  errorMessageElement.textContent = message;
  errorElement.classList.remove("hidden");
}

function resetForm() {
  console.log("Resetting form...");

  contactForm.reset();

  Object.keys(validationState).forEach((field) => {
    validationState[field] = false;
  });

  document.querySelectorAll(".error-message").forEach((element) => {
    element.classList.remove("show");
  });

  document.querySelectorAll("input, select, textarea").forEach((element) => {
    element.classList.remove("valid", "invalid");
  });

  document.getElementById("formSuccess").classList.add("hidden");
  document.getElementById("formError").classList.add("hidden");

  updateSubmitButton();
}

function initializeApp() {
  console.log("Initializing Contact Form Validation application...");

  contactForm.addEventListener("submit", handleFormSubmit);
  document.getElementById("resetBtn").addEventListener("click", resetForm);

  setupValidationListeners();

  updateSubmitButton();

  console.log("Contact Form Validation application initialized successfully!");
  console.log(
    "Try filling out the form and see real-time validation in action!"
  );
}

initializeApp();

document.getElementById("output").innerHTML = `
    <h3>Contact Form Validation Features</h3>
    <p>&#9989; Real-time validation as you type</p>
    <p>&#9989; Email format validation with regex</p>
    <p>&#9989; Form submission handling with preventDefault()</p>
    <p>&#9989; Success and error message display</p>
    <p>&#9989; Visual feedback with valid/invalid states</p>
    <p>Check the console for detailed form handling demonstrations!</p>
`;