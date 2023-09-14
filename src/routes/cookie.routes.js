import { Router } from "express";
import auth from "../auth.js";

const cookiesRouter = Router();

cookiesRouter.get('/setCookies', (req,res)=>{

    res.cookie('CookieCookie', 'Este es el valor de una cookie', {maxAge:60000, signed:true}).send('Cookie creada'); //Cookie de un minuto firmada

})

cookiesRouter.get('/getCookies', (req,res)=>{
    res.send(req.signedCookies); //Consulta SOLAMENTE las cookies que sí fueron firmadas
//  res.cookie(req.cookies); Consulta TODAS las cookies
})

cookiesRouter.get('/session', (req,res)=>{
    if(req.session.counter){ /* Counter es la variable  que creo yo para almacenar la sesión.
    Comrpuebo si existe la variable counter en la sesión 

     éste código hace que la sesión dure mientras estoy navegando en la aplicación. Una vez que cierro la página se termina la sesión. Si vuelvo a ingresar, se crea un nuevo identificador
     req.session.counter ++ //aumento en 1
     res.send(`Has entrado esta cantidad de veces:${req.session.counter} en la página`); */
    }else { 
        req.session.counter = 1; //Si es la primera vez que ingresa, creo la sesión y la inicializo en 1
        res.send("Hola por primera vez");
    }    
})

cookiesRouter.get('/login', (req,res)=>{
    const {email, password} = req.body;

    if (email === "admin@admin.com" && password === "1234"){
        req.session.email = email;
        req.session.password = password;
        console.log(email,password);

        return res.send("Usuario logueado");
    }else { 
    "Usuario o contraseña incorrectas"  
    }
    return res.send("No se pudo iniciar sesión");
})

cookiesRouter.get('/logout', (req,res)=>{
    req.session.destroy(()=>{
        res.send("Logout ok!");
    })
})

cookiesRouter.get('/admin', auth ,(req,res)=>{
    res.send("Sos admin")
})

export default cookiesRouter;