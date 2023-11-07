import { faker } from '@faker-js/faker'

export const modelUser = async (req,res) => {
  let users = []
  for (let i=0;i<10;i++){
      users.push(modelUser())
  }
  res.send({status:"succes",payload:users})
    return {
        _id: faker.database.mongodbObjectId(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        avatar: faker.image.avatar(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        gender: faker.person.gender(),
        birthdate: faker.date.birthdate(),
        phone: faker.phone.number(),
        country: faker.location.country()
    }
}

/* const createRandomUser = (cantUsers) => {
    const users = []

    for (let i = 0; i < cantUsers; i++) {
        users.push(modelUser())
    }

    return users
}

console.log(createRandomUser(60))
 */