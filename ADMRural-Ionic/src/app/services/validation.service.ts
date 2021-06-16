import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private DECIMAL_SEPARATOR = ".";
  private GROUP_SEPARATOR = ",";
  private pureResult: any;
  private maskedId: any;
  private val: any;
  private v: any;

  private parts: any;

  constructor() { }

  /* ------------------------------------------- UMFORMAT ONLY NUMBERS ----------------------------------------- */
  unFormat(val) {
    if (!val) {
      return '';
    }
    val = val.replace(/\D/g, '');

    if (this.GROUP_SEPARATOR === ',') {
      return val.replace(/,/g, '');
    } else {
      return val.replace(/\./g, '');
    }
  };
  /* ------------------------------------------- END UMFORMAT ONLY NUMBERS ----------------------------------------- */

  /* ------------------------------------------- MASK REAL (R) ----------------------------------------- */
  /* Bhai yeah function check krna ? kya issue h ye toh bta? */

  formatreal(valString: any, idComponent: any) {
    let mask: string;
    if (!valString) {
      return '';
    }
    let valTemp = valString.toString();
    valTemp = valTemp.replace(/\D/g, '');
    let val = "";

    for (let index = 0; index < valTemp.length; index++) {
      if (valTemp[index] != "0") {
        // val = val + valTemp[index];
        val = val + valTemp.substring(index, valTemp.length);
      }
    }
    switch (val.length) {
      case 1:
        val = '00' + val;
        break;
      case 2:
        val = '0' + val;
        break;
      default:
        break;
    }

    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);

    if (parts[0].length > 0 && parts[0].length <= 2) {
      mask = this.real1(parts[0]);
    }
    else if (parts[0].length >= 3 && parts[0].length <= 4) {
      mask = this.real2(parts[0]);
    }
    else if (parts[0].length >= 4 && parts[0].length <= 5) {
      mask = this.real3(parts[0]);
    }
    else if (parts[0].length >= 5 && parts[0].length <= 6) {
      mask = this.real4(parts[0]);
    }
    else {
      // This is to separate string, maybe you would like to use to make validations in the future
      mask = parts[0].substring(0, 6);
    }
    (<HTMLInputElement>document.getElementById(idComponent)).value = mask;
  }

  real1(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/(\d)/, '.$1'); //Coloca - entre o quinto e o sexto dígito
    return v;
  }
  real2(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/\B(?=(\d{2})+(?!\d))/g, '.'); //Coloca - entre o quinto e o sexto dígito
    return v;
  }
  real3(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{3})(\d)/, '$1.$2'); //Coloca - entre o quinto e o sexto dígito
    return v;
  }
  real4(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{4})(\d)/, '$1.$2'); //Coloca - entre o quinto e o sexto dígito
    return v;
  }
  /* ------------------------------------------- END MASK REAL (R) ------------------------------------------ */



  /* ------------------------------------------- MASK PESO (KG) ----------------------------------------- */

  formatquilo(valString: any, idComponent: any) {
    let mask: string;
    if (!valString) {
      return '';
    }
    let valTemp = valString.toString();
    valTemp = valTemp.replace(/\D/g, '');
    let val = "";

    for (let index = 0; index < valTemp.length; index++) {
      if (valTemp[index] != "0") {
        // val = val + valTemp[index];
        val = val + valTemp.substring(index, valTemp.length);
        break;
      }

    }
    switch (val.length) {
      case 1:
        val = '0000' + val;
        break;
      case 2:
        val = '000' + val;
        break;
      case 3:
        val = '00' + val;
        break;
      case 4:
        val = '0' + val;
        break;
      default:
        break;
    }

    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);

    if (parts[0].length > 0 && parts[0].length <= 3) {
      mask = this.gr1(parts[0]);
    }
    else if (parts[0].length > 3 && parts[0].length <= 5) {
      mask = this.gr2(parts[0]);
    }
    else {
      // This is to separate string, maybe you would like to use to make validations in the future
      mask = parts[0].substring(0, 5);
    }
    (<HTMLInputElement>document.getElementById(idComponent)).value = mask;
  }

  gr1(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/(\d)/, ',$1'); //Coloca - entre o quinto e o sexto dígito
    return v;
  }
  gr2(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ','); //Coloca - entre o quinto e o sexto dígito
    return v;
  }
  /* ------------------------------------------- END MASK PESO (KG) ------------------------------------------ */

}