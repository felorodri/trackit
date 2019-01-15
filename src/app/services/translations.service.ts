import { Injectable } from '@angular/core';
// Translations files
import { esCo } from '../../translations/es-co';
// import enUsLang from '../../translations/en-us';

@Injectable()

export class TranslationsService {
	private enUsLang: any;
	private esLang: any;
	private languageBase : Object;

  constructor() { 
  	this.esLang = esCo;
  	this.languageBase = {
  		'es': this.esLang
  	}
  }

  getLanguageBase(){
  	return this.languageBase;
  }
}
