import { DEFAULT_COUNTRY_CODE, DEFAULT_MASK, DEFAULT_PATTERN_SYMBOL, ALLOWED_TAGNAME, ALLOWED_MASK_ATTRIBUTE, Messages } from './const.js';

export default class JustPhoneMask {
  #patternSymbol = DEFAULT_PATTERN_SYMBOL;
  #defaultOptions = {
    countryCode: DEFAULT_COUNTRY_CODE,
    bodyMask: DEFAULT_MASK,
    setPlaceholder: false,
    selectors: null,
  };

  constructor( options ) {
    Object.defineProperties( this.#defaultOptions, {
      maskPatternSymbol: {
        value: this.#patternSymbol,
        writable: false,
        configurable: true
      },
      phoneMask: {
        get: function() {
          return `${this.countryCode}${this.bodyMask}`;
        }
      },
      literalPattern: {
        get: function() {
          return new RegExp( `[\\${this.maskPatternSymbol}]` );
        }
      },
      digitalPattern: {
        value: /[0-9]/,
        writable: false,
        configurable: false
      },
    } );

    this.options = Object.assign( this.#defaultOptions, options );

    this.options.selectors ? this.maskNumbers = document.querySelectorAll( `${this.options.selectors}` ) : this.maskNumbers = document.querySelectorAll( '[type="tel"]' );

    this.#check();
  }

  #check() {
    if ( this.maskNumbers.length === 0 ) return;
    if ( !Array.from( this.maskNumbers ).every( el => el.tagName === ALLOWED_TAGNAME ) ) {
      let el = Array.from( this.maskNumbers ).find( el => el.tagName !== ALLOWED_TAGNAME );
      console.error( Messages.IsWrongTagName(el.tagName) );
      return;
    }
    this.#init();
  }

  #init() {
    this.maskNumbers.forEach( ( el ) => {
      el.setAttribute( ALLOWED_MASK_ATTRIBUTE, this.options.phoneMask );
      this.options.setPlaceholder ? el.setAttribute( 'placeholder', this.options.phoneMask ) : '';
      el.addEventListener( 'input', ( evt ) => showMask( evt ) );
    } );
    const showMask = ( evt ) => {
      const input = evt.target;
      const value = input.value;
      const mask = input.dataset.mask;
      let newValue = '';

      try {
        const maskLength = mask.length;
        let valueIndex = 0;
        let maskIndex = 0;

        for ( ; maskIndex < maskLength; ) {
          if ( maskIndex >= value.length ) break;

          if ( mask[ maskIndex ] === `${this.options.maskPatternSymbol}` && value[ valueIndex ].match( this.options.digitalPattern ) === null ) break;

          while ( mask[ maskIndex ].match( this.options.literalPattern ) === null ) {
            if ( value[ valueIndex ] === mask[ maskIndex ] ) break;

            newValue += mask[ maskIndex++ ];
          }

          newValue += value[ valueIndex++ ];
          maskIndex++;
        }

        input.value = newValue;
      } catch ( err ) {
        console.error( err );
      }
    };
  }
}
