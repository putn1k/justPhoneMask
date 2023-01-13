const maskDefault = new JustPhoneMask();

const maskFirst = new JustPhoneMask( {
  countryCode: '+375',
  bodyMask: ' (___) __ ___ __-__',
  setPlaceholder: true,
  selectors: '.first',
} )

const maskSecond = new JustPhoneMask( {
  countryCode: '+380',
  bodyMask: ' ___ __ ___ __ __',
  selectors: '.second',
} )
