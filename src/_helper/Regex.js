const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NAME_REGEX = /^[a-zA-Z ]+$/;
const FULL_NAME_REGEX = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/; // Full name with proper spacing
const MOBILE_REGEX = /^\d*[.]?\d*$/;
const INDIAN_PHONE_REGEX = /^[6-9][0-9]{9}$/; // Indian phone number starting with 6-9 and 10 digits
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;
const MAP_LINK =
  /^(https?:\/\/)?(www\.)?(google\.com\/maps|maps\.apple\.com|mapquest\.com)\/?[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/;
const CHARACTER = /^.{200}$/;
const DECIMALNUMBER = /^[1-9][\.\d]*(,\d+)?$/;
const EXP_REGEX = /^\d+-\d+$/;


const PASSWORD_LENGTH_REGEX = /.{8,}/;
const UPPERCASE_REGEX = /[A-Z]/;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;

// max length check
export const maxLengthCheck = (object) => {
  if (object.target.value.length > object.target.maxLength) {
    object.target.value = object.target.value.slice(0, object.target.maxLength);
  }
};

// Mobile number regex
export function validMobile(mobile) {
  return MOBILE_REGEX.test(mobile);
}

export function validCharacter(character) {
  return CHARACTER.test(character);
}

// User name regex
export function validName(name) {
  return NAME_REGEX.test(name);
}

// Full name validation (allows single or multiple words with proper spacing)
export function validFullName(fullName) {
  return FULL_NAME_REGEX.test(fullName);
}

// Indian phone number validation (10 digits starting with 6-9)
export function validIndianPhone(phone) {
  return INDIAN_PHONE_REGEX.test(phone);
}

// User email regex
export function validEmail(emailid) {
  return EMAIL_REGEX.test(String(emailid).trim());
}

// User password regex
export function validPassword(password) {
  return PASSWORD_REGEX.test(String(password));
}

// User url regex
export function validUrl(url) {
  return URL_REGEX.test(url);
}

// User map regex
export function validMapUrl(mapUrl) {
  return MAP_LINK.test(mapUrl);
}

export function validExperience(exp) {
  return EXP_REGEX.test(exp);
}

export function isValidDecimal(value) {
  const parsedValue = parseFloat(value);
  return !isNaN(parsedValue) && isFinite(parsedValue);
}


export function isValidPassword(password) {
  if (!PASSWORD_LENGTH_REGEX.test(password) ||
    !UPPERCASE_REGEX.test(password) ||
    !SPECIAL_CHAR_REGEX.test(password)) {
    return 'Password must be at least 8 characters long, with 1 uppercase letter and 1 number.';
  }
  return null;
}

export function isValidPasswordNew(password) {
  if (!PASSWORD_LENGTH_REGEX.test(password) ||
    !UPPERCASE_REGEX.test(password) ||
    !SPECIAL_CHAR_REGEX.test(password)) {
    return 'Password must contain atleast 1 uppercase, 1 lowercase, 1 special character and 1 numeric characters. Minimum 8 characters.';
  }
  return null;
}

// Export regex constants for use in validation schemas
export const REGEX_PATTERNS = {
  EMAIL: EMAIL_REGEX,
  NAME: NAME_REGEX,
  FULL_NAME: FULL_NAME_REGEX,
  MOBILE: MOBILE_REGEX,
  INDIAN_PHONE: INDIAN_PHONE_REGEX,
  PASSWORD: PASSWORD_REGEX,
  URL: URL_REGEX,
  MAP_LINK: MAP_LINK,
  CHARACTER: CHARACTER,
  DECIMAL_NUMBER: DECIMALNUMBER,
  EXPERIENCE: EXP_REGEX,
};