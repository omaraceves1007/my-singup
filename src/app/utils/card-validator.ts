import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

interface ICard {
  type: string,
  length: string,
  prefixes: string,
}

export function cardValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const cardsType: ICard[] = [
      {
        type: 'Visa',
        length: '13,16',
        prefixes: '4'
      },
      {
        type: 'MasterCard',
        length: '16',
        prefixes: '51,52,53,54,55'
      },
      {
        type: 'Discover',
        length: '16',
        prefixes: '6011,622,64,65'
      },
      {
        type: 'American',
        length: '15',
        prefixes: '34,37'
      },
    ];
    let validLength = false;
    let validPrefix = false;

    const onlyDigits = control.value.replaceAll(' ', '');
    // valid card number
    if (!validateCardNumber(onlyDigits)) {
      return { CreditCardNumber: 'Error en número de tarjeta.' };
    }

    // valid prefix and length by type

    cardsType.forEach((type: ICard) => {
      const prefixes = type.prefixes.split(',');
      prefixes.forEach((prefix: string) => {
        const regex = new RegExp(`^${prefix}`);
        if (regex.test(onlyDigits) && !validPrefix) {
          validPrefix = true;
        }
      });
      if (validPrefix && !validLength) {
        const lengths = type.length.split(',');
        lengths.forEach((lng: string) => {
          if (onlyDigits.length === parseInt(lng)) {
            validLength = true;
          }
        });
      }
    });

    if (!validLength || !validPrefix) {
      return { CreditCardNumber: 'Error en prefijo o tamaño de tarjeta.' };
    }

    return null;

  }
}


function validateCardNumber(number: string): boolean {
  const regex = new RegExp('^[0-9]{13,16}$');
  if (!regex.test(number)) {
    return false;
  }
  return luhnCheck(number);
}

function luhnCheck(number: string): boolean {
  let checksum = 0;
  let j = 1;

  for (let i = number.length - 1; i >= 0; i--) {
    let calc = 0;
    calc = Number(number.charAt(i)) * j;

    if (calc > 9) {
      checksum = checksum + 1;
      calc = calc - 10;
    }

    checksum = checksum + calc;

    if (j == 1) {
      j = 2;
    } else {
      j = 1;
    }
  }

  return (checksum % 10) == 0;
}
