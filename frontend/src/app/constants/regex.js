export const REGEX_FIRSTNAME = /^[a-zA-Z|\s\u00E0-\u00E2\u00E8-\u00EA'-]+$/;
export const REGEX_LASTNAME = /^[a-zA-ZÀ-ÿ-.|\s ]*$/;
export const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const REGEX_PASSWORD = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,128}$/;
export const REGEX_CITY = /^[a-zA-Z\s\-]+$/;
export const REGEX_ZIP = /^[0-9]/;
export const REGEX_STREET = /^[a-zA-Z\s\-0-9]+$/;
