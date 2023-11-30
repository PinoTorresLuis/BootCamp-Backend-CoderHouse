import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from 'swagger-ui-express';
import {__dirname} from '../path.js'; //Se utiliza para definir la carpeta dentro de una ruta

//Generamos las opciones de Swagger
const swaggerOptions = {
    definition:{
        openapi:'3.1.0', //Versión
        info:{
            title:'Documentación del Curso Backend',
            description:'API CoderHouse Backend'
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]//Los dos ** significan que hace ruta a cualquier subcarpeta
    //Cuando hay * sólo es cualquier nombre de archivo
};

const specs = swaggerJSDoc(swaggerOptions);

export default function swaggerConnect(){ 
 return [swaggerUiExpress.serve,swaggerUiExpress.setup(specs)]}
//En esta ruta me conecto a Swagger y el setup va a ir confingurado con las opciones de la variable que creamos. La documentación no va a hacer algo ajeno a mi APP sino que es un complemento ya que posee una ruta. De esta forma la documentación también forma parte del proyecto.


