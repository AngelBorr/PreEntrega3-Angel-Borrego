import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Funcional con supertest', () => {
    describe('Testing de Sessions', () => {
        let cookie;
        it('El endpoint POST /api/sessions/register debe poder crear un usuario correctamente con los datos proporsionados', async function(){
            const user = {
                firstName: 'Lagarto',
                lastName: 'Juancho',
                email: 'juancho@gmail.com',
                age: 23,
                password: '1234',
                birth_date: '01/10/2000',
                role: 'admin'
            }            
            const { _body } = await requester.post('/api/sessions/register').send(user)
            console.log(_body.payload)
            expect(_body.payload).to.be.ok
        })
        it('El endpoint POST /api/sessions/login debera permitir el ingreso a la app de un usuario correctamente', async function() {
            const user = {
                email: 'angel_borr@hotmail.com',
                password: '1111'
            }
            const result = await requester.post('/api/sessions/login').send(user)            
            const cookieResult = result.headers['set-cookie'][0]
            console.log(cookieResult)
            expect(cookieResult).to.be.ok
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1],
                cookieCompleta: cookieResult
            }
            expect(cookie.name).to.be.ok.and.eql('cookieToken')
            expect(cookie.value).to.be.ok
        })
        /* it('El endpoint GET /api/sessions/current debe recibir la cookie del usuario y desestructurarla', async function(){
            console.log(cookie)
            const {_body} = await requester.get('/api/sessions/current').set('cookie', [`${cookie.cookieCompleta}`/*`${cookie.name}=${cookie.value}`])
            console.log(_body.payload)
            expect(_body.payload.email).to.be.eql('angel_borr@hotmail.com')
        }) */
        
    })
})