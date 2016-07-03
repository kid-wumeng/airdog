export function init(){
  global.$error = $error
}


function $error(error, suggest)
{
  console.error(`${error} ${suggest? suggest: ''}`)
  throw ''
}