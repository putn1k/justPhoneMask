const maskDefault = new justPhoneMask();

const maskFirst = new justPhoneMask( {
  countryCode: '+375',
  bodyMask: ' (___) __ ___ __-__',
  setPlaceholder: true,
  selectors: '.first',
} )

const maskSecond = new justPhoneMask( {
  countryCode: '+380',
  bodyMask: ' ___ __ ___ __ __',
  selectors: '.second',
} )
