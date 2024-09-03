import { FormGroup } from "@angular/forms";
import { Initial } from "../card/CharacterMapper";

export interface MappedForm{
  key:string, title:string, inputType:string, value:string
}

export function mapperForm(form:FormGroup):MappedForm[] {
  return Object.keys(form.value) .map(key=>({
    key: key,
    title: Initial(key),
    inputType: InputType(key),
    value: form.value[key],
  }))  
}

function InputType(key:string):string {
  // username, email, password, confirm_password
  switch(key){
    case 'confirm_password': return 'password'
    case 'username': return 'text'
    default: return key
  }
}