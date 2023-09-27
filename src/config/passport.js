import local from 'passport' //Estrategia 
import passport from 'passport' //Manejador de las estrategias
import GithubStrategy from 'passport-github2'; //Estrategia de GitHub
import { createHash, validatePassword } from '../utils/bcrypt.js' ; //Los voy a implementar dentro de la estrategia
import { userModel } from '../models/users.model.js';

//Defino la estrategia a utilizar. Es la configuración de mi estrategia
const localStrategy = local.Strategy;

//Función de mi estrategia
export const initializePassport =()=>{
    //done es como si fuese un res.status(),el callback de respuesta. 
    //Acá defino qué y en qué ruta voy a utilizar mi estrategia
    
    passport.use('register', new localStrategy(//defino como voy a  registrar a mis usuarios con el new localstrategy
    //con passreqtolocal se devuelve el código como true y lo re defino con el usernamefield:"email" que es lo que nosotros tenemos en nuestra base de datos así no tengo que crear un nuevo campo 
    {passReqToCallBack:true, usernameField:"email"}, async(req,username,password,done) =>{
            //Defino como voy a registrar un usuario
        const {first_name,lastname,email,age} = req.body
        
        try {
            const user = await userModel.findOne({email:email})
            if (user){
                //es como si fuese un return de un callback
                return done(null,false);//Acá el null significa que si ya existe no lo puedo volver a crear
            }//Si no existe,lo creo
            const hashPassword = createHash(password);
            const userCreated = await userModel.create({
                first_name:first_name,
                lastname:lastname,
                email:email,
                password:hashPassword,
                age:age
            })
            console.log(userCreated);
            return done(null, userCreated);
        } catch (error) { //Acá el error sería por un error de conexión o un error de la base de datos
            return done(error);
        }
        }
    ))
     
     passport.use('login', new localStrategy({usernameField:'email'}, async(username,password,done)=>{
        try {
            const user = await userModel.findOne({email:email})
          //Consulto por un Login. Si éste no existe, retorno null y false
            if(!user){
                return done(null,false);
            }//SI existe el usuario, compruebo que la contraseña sea valida
            if(validatePassword(password,user.password)){
                return done(null,user)//Usuario y contraseña válidos
            }
            //Si el usuario existe pero la contraseña no lo es, retorno false
            return done(null,false)//Contraseña no valida

        } catch (error) {
            return done(error);
        }
    }))

       //Inicializar la sesión del usuario con serializeUser
        //En los parametros me pide un usuario y done en el caso que se devuelva algo
        passport.serializeUser((user,done)=>{
            done(null,user._id); //Est es para generar los id (Respeto el nombre id)
         })
         //Eliminar la sesión del usuario con DESerializeUser
         passport.deserializeUser(async(id,done)=>{
            const user = await userModel.findById(id);
            done(null,user)
         })
    
         //Acá abajo hago el login consultando por los atributos enviados
         //La estrategia se llama 'login'
         //usernameField va a ser email porque no tengo username en mi base de datos
         //Pido los datos dentro del async para después validarlos
         
    passport.use('github', new GithubStrategy({//En este caso ya github nos provee las estrategias, al igual que si lo haría con Google.
        //Me pide 3 elementos, esto es muy común en todas las estregias que no sean local
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    }, async(accessToken,refreshToken, profile,done)=>{
        try {
            console.log("Este es tu accesToken:", accessToken);
            console.log("Este es tu refreshToken:",refreshToken);
        //esto es para encontrar el usuario:
        const user = await userModel.findOne({email:profile._json.email})//como el email es un atributo único es la única forma de garantizarme si ya existe o no 
        if(!user){ //Si no existe el usuario, lo creo
            const userCreated = await userModel.create({
                first_name: profile._json.name,
                lastname :' ', //Lastname no puedo mandarlo vacio ya que es requerido por lo tanto tengo que enviarle aunque sea una CADENA para que me lo tome como válido
                email: profile._json.email,
                age:18, //Edad por defecto,
                password: 'password' //Creo una password sencilla para que después el usuario lo modifique
            })
          done(null,userCreated);
        }else { 
            done(null,user) //Si existe, lo retorno
        }     
        } catch (error) {
            done(error)
        }
       
    })) 

}
