export default function inputType(value:number |string |boolean, name='') {
  switch(name.toLowerCase()){
    case 'password': return 'password'
    case 'email': return 'email'
    default: return typeof value==='number' ?'number' 
                  : typeof value==='boolean' ?'checkbox'
                  : "text" 
  }
}