/** 
 * Formatea un nombre con mayúsculas en la primera letra después de cada espacio y el resto de las letras en minúsculas.
 * @params [string] name - El nombre que se desea formatear
 * @returns [string] El nombre formateado.
 * @exampleconst inputName = "juan perez";
 * const formattedName = nameFormatter(inputname);
 * console.log(formattedName); 'Devuelve Juan Perez'
*/


export function nameFormatter (name){
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice().toLowerCase()).join(' ');
}