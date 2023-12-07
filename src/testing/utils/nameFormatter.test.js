import Assert from 'assert';
import {nameFormatter} from '../../utils/nameFormatter.js'

const assert = Assert.strict

describe('nameFormatter', ()=>{
    //IT debería devolver un arreglo
    it('Should format the name c orrectly',()=>{
       const mockName = 'LUIS PINO'
       const formattedName = nameFormatter(mockName)
       assert.equal(formattedName, 'LUIS PINO') 
    })
})