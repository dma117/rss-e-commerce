import { isObject } from '@/utils/type-guards';

type RegExpKeys =
  | 'CAPITAL_LETTERS'
  | 'LOWERCASE_LETTERS'
  | 'NUMBERS'
  | 'SPECIAL_CHARACTERS'
  | 'ANY_LETTER'
  | 'SPACES'
  | 'EMAIL_LOCAL_PART'
  | 'EMAIL_SEPARATOR'
  | 'EMAIL_DOMAIN_PART';

const REG_EXP_LIST: Record<RegExpKeys, RegExp> = {
  CAPITAL_LETTERS: /[A-Z]/g,
  LOWERCASE_LETTERS: /[a-z]/g,
  NUMBERS: /\d/g,
  SPECIAL_CHARACTERS: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g,
  ANY_LETTER: /[a-zA-Z]/g,
  SPACES: /^\S+@\S+$/g,
  EMAIL_LOCAL_PART: /^[^\s@]+@/g,
  EMAIL_SEPARATOR: /\S+@\S+/g,
  EMAIL_DOMAIN_PART: /@[^\s@]+\.[^\s@]+$/g,
};

type RegExpTestFunction = (str: string) => RegExpMatchArray | null;

const matchCapitalLetters: RegExpTestFunction = (str) => str.match(REG_EXP_LIST.CAPITAL_LETTERS);

const matchLowerCaseLetters: RegExpTestFunction = (str) =>
  str.match(REG_EXP_LIST.LOWERCASE_LETTERS);

const matchNumbers: RegExpTestFunction = (str) => str.match(REG_EXP_LIST.NUMBERS);

const matchAnyLetter: RegExpTestFunction = (str) => str.match(REG_EXP_LIST.ANY_LETTER);

const matchSpecialCharacters: RegExpTestFunction = (str) =>
  str.match(REG_EXP_LIST.SPECIAL_CHARACTERS);

const matchTrailingSpaces: RegExpTestFunction = (str) => str.match(REG_EXP_LIST.SPACES);

const matchEmailLocalPart: RegExpTestFunction = (str) => str.match(REG_EXP_LIST.EMAIL_LOCAL_PART);

const matchEmailSeparator: RegExpTestFunction = (str) => str.match(REG_EXP_LIST.EMAIL_SEPARATOR);

const matchEmailDomainPart: RegExpTestFunction = (str) => str.match(REG_EXP_LIST.EMAIL_DOMAIN_PART);

type MinThresholdTestFunction = (strToCheck: string, minThreshold: number) => boolean;

export const checkCapitalLetters: MinThresholdTestFunction = (value, minCount) => {
  const matches = matchCapitalLetters(value);
  return isObject(matches) && matches.length >= minCount;
};

export const hasLowerCaseLetters: MinThresholdTestFunction = (value, minCount) => {
  const matches = matchLowerCaseLetters(value);
  return isObject(matches) && matches.length >= minCount;
};

export const hasNumbers: MinThresholdTestFunction = (value, minCount) => {
  const matches = matchNumbers(value);
  return isObject(matches) && matches.length >= minCount;
};

export const hasAnyLetter: MinThresholdTestFunction = (value, minCount) => {
  const matches = matchAnyLetter(value);
  return isObject(matches) && matches.length >= minCount;
};

export const hasSpecialCharacters: MinThresholdTestFunction = (value, minCount) => {
  const matches = matchSpecialCharacters(value);
  return isObject(matches) && matches.length >= minCount;
};

export const hasTrailingSpaces: MinThresholdTestFunction = (value, minCount) => {
  const matches = matchTrailingSpaces(value);
  return isObject(matches) && matches.length >= minCount;
};

export const hasEmailLocalPart: MinThresholdTestFunction = (value, minCount) => {
  const matches = matchEmailLocalPart(value);
  return isObject(matches) && matches.length >= minCount;
};

export const hasEmailSeparator: MinThresholdTestFunction = (value, minCount) => {
  const matches = matchEmailSeparator(value);
  return isObject(matches) && matches.length >= minCount;
};

export const hasEmailDomainPart: MinThresholdTestFunction = (value, minCount) => {
  const matches = matchEmailDomainPart(value);
  return isObject(matches) && matches.length >= minCount;
};

export const isStringLongEnough: MinThresholdTestFunction = (str, minLength) =>
  str.length >= minLength;

export const isAgeAboveMinimum: MinThresholdTestFunction = (dateStr, minAge) => {
  const [dayOfBirth, monthOfBirth, yearOfBirth] = dateStr.split('-').map(Number);
  const dateOfBirth = new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth);

  const currentDate = new Date();
  const [currentMonth, currentDay] = [currentDate.getMonth(), currentDate.getDate()];

  let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
  if (currentMonth < monthOfBirth || (currentMonth === monthOfBirth && currentDay < dayOfBirth)) {
    age -= 1;
  }

  return age >= minAge;
};

export const isEmail = (email: string): boolean => {
  // source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
};
