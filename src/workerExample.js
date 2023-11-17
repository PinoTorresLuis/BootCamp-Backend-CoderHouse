import cluster from 'node:cluster';
import {cpus} from 'node:os';


if(cluster.isPrimary){
    console.log('Tengo esta cantidad de cpus', cpus().length);
    console.log('Soy cluster primary');
    console.log(process.pid);
    cluster.fork()
}else {
    console.log(process.pid);
    console.log('Mi primera chamba');
}