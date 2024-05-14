import { POSTAL_CODES_REG_EXP } from './postal-codes';

type RegExpKeys =
  | 'CAPITAL_LETTERS'
  | 'SMALL_LETTERS'
  | 'NUMBERS'
  | 'SPECIAL_CHARACTERS'
  | 'ANY_LETTER'
  | 'SPACES'
  | 'EMAIL_LOCAL_PART'
  | 'EMAIL_SEPARATOR'
  | 'EMAIL_DOMAIN_PART'
  | 'DATE'
  | 'EMAIL';

const REG_EXP_LIST: Record<RegExpKeys, RegExp> = {
  CAPITAL_LETTERS: /[A-Z]/g,
  SMALL_LETTERS: /[a-z]/g,
  NUMBERS: /\d/g,
  SPECIAL_CHARACTERS: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g,
  ANY_LETTER: /[a-zA-Z]/g,
  SPACES: /^\S+@\S+$/g,
  EMAIL_LOCAL_PART: /^[^\s@]+@/g,
  EMAIL_SEPARATOR: /\S+@\S+/g,
  EMAIL_DOMAIN_PART: /@[^\s@]+\.[^\s@]+$/g,
  DATE: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/g,
  EMAIL:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
};

type MatchTestFunction = (strToCheck: string) => boolean;

const createMatchTestFunction = (regex: RegExp): MatchTestFunction => {
  return (value) => {
    return regex.test(value);
  };
};

export const hasCapitalLetters: MatchTestFunction = createMatchTestFunction(
  REG_EXP_LIST.CAPITAL_LETTERS,
);

export const hasSmallLetters: MatchTestFunction = createMatchTestFunction(
  REG_EXP_LIST.SMALL_LETTERS,
);

export const hasNumbers: MatchTestFunction = createMatchTestFunction(REG_EXP_LIST.NUMBERS);

export const hasAnyLetter: MatchTestFunction = createMatchTestFunction(REG_EXP_LIST.ANY_LETTER);

export const hasSpecialCharacters: MatchTestFunction = createMatchTestFunction(
  REG_EXP_LIST.SPECIAL_CHARACTERS,
);

export const hasSpaces: MatchTestFunction = createMatchTestFunction(REG_EXP_LIST.SPACES);

export const hasEmailLocalPart: MatchTestFunction = createMatchTestFunction(
  REG_EXP_LIST.EMAIL_LOCAL_PART,
);

export const hasEmailSeparator: MatchTestFunction = createMatchTestFunction(
  REG_EXP_LIST.EMAIL_SEPARATOR,
);

export const hasEmailDomainPart: MatchTestFunction = createMatchTestFunction(
  REG_EXP_LIST.EMAIL_DOMAIN_PART,
);

export const isEmail: MatchTestFunction = createMatchTestFunction(REG_EXP_LIST.EMAIL);

type MinMatchTestFunction = (strToCheck: string, minMatchesCount: number) => boolean;

export const isStringLongEnough: MinMatchTestFunction = (str, minLength) => str.length >= minLength;

export const isAgeAboveMinimum: MinMatchTestFunction = (dateStr, minAge) => {
  const isDate = (date: string) => REG_EXP_LIST.DATE.test(date);

  if (!isDate(dateStr)) {
    console.error('Expected dd-mm-yyyy format, got ', dateStr);
    return false;
  }

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

export const isPostalCode = (postalCode: string, countryCode: string): boolean => {
  if (!(countryCode in POSTAL_CODES_REG_EXP)) {
    console.error('Got unknown country code: ', countryCode);
    return false;
  }

  const regex = POSTAL_CODES_REG_EXP[countryCode];
  return regex.test(postalCode);
};
