import Assert from 'assert';
import {nameFormatter} from '../../src/utils/nameFormatter.js'

const assert = Assert.strict

describe('nameFormatter', ()=>{
    it('Should format the name c orrectly',()=>{
       const mockName = 'LUIS PINO'
       const formattedName = nameFormatter(mockName)
       assert.equal(formattedName, 'LUIS PINO') 
    })
})