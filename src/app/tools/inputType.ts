export default function inputType(value:number |string |boolean, title='') {
  title =title.toLowerCase()
  switch(title){
    case 'password': return 'password'
    case 'email': return 'email'
    default: return typeof value==='number' ?'number' 
                  : typeof value==='boolean' ?'checkbox'
                  : "text" 
  }
}
