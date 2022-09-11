class justPhoneMask {
  constructor( options ) {
    const baseOptions = {
      countryCode: '+7',
      bodyMask: ' ___ ___ __ __',
      setPlaceholder: false,
      selectors: null,
    }

    Object.defineProperties( baseOptions, {
      maskPatternSymbol: {
        value: '_',
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

    this.options = Object.assign( baseOptions, options );

    this.options.selectors ? this.maskNumbers = document.querySelectorAll( `${this.options.selectors}` ) : this.maskNumbers = document.querySelectorAll( '[type="tel"]' );

    this.check();
  }

  check() {
    if ( this.maskNumbers.length === 0 ) return;
    if ( !Array.from( this.maskNumbers ).every( element => element.tagName === 'INPUT' ) ) {
      let el = Array.from( this.maskNumbers ).find( element => element.tagName !== 'INPUT' );
      console.error( `Found element tagname ${el.tagName}. Element tagname must be only INPUT` );
      return;
    }
    this.init();
  }

  init() {
    this.maskNumbers.forEach( ( el ) => {
      el.setAttribute( 'data-mask', this.options.phoneMask );
      this.options.setPlaceholder ? el.setAttribute( 'placeholder', this.options.phoneMask ) : '';
      el.addEventListener( 'input', ( evt ) => showMask( evt ) );
    } );
    const showMask = ( e ) => {
      let input = e.target;
      let value = input.value;
      let mask = input.dataset.mask;
      let newValue = '';

      try {
        let maskLength = mask.length;
        let valueIndex = 0;
        let maskIndex = 0;

        for ( ; maskIndex < maskLength; ) {
          if ( maskIndex >= value.length ) break;

          if ( mask[ maskIndex ] === `${this.options.maskPatternSymbol}` && value[ valueIndex ].match( this.options.digitalPattern ) === null ) break;

          while ( mask[ maskIndex ].match( this.options.literalPattern ) === null ) {
            if ( value[ valueIndex ] === mask[ maskIndex ] ) break;

            newValue += mask[ maskIndex++ ];
          } //end while

          newValue += value[ valueIndex++ ];
          maskIndex++;
        } //end for

        input.value = newValue;
      } catch ( err ) {
        console.error( err );
      }
    }
  }
}
