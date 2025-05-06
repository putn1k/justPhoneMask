const DEFAULT_COUNTRY_CODE = '+7';
const DEFAULT_MASK = ' ___ ___ __ __';
const DEFAULT_PATTERN_SYMBOL = '_';
const ALLOWED_TAGNAME = 'INPUT';
const ALLOWED_MASK_ATTRIBUTE = 'data-mask';

const Messages = {
  IsWrongTagName: ( tagName ) => `Found element tagname ${tagName}. Element tagname must be only INPUT`,
};

export {
  DEFAULT_COUNTRY_CODE,
  DEFAULT_MASK,
  DEFAULT_PATTERN_SYMBOL,
  ALLOWED_TAGNAME,
  ALLOWED_MASK_ATTRIBUTE,
  Messages,
};
