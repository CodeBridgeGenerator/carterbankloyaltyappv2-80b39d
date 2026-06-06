
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
email: faker.internet.email(),
username: faker.lorem.sentence(1),
password: "asdf123",
isActive: faker.lorem.sentence(1),
points: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
