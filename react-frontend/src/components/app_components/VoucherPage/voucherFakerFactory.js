import { faker } from "@faker-js/faker";
export default (user, count, categoryIdIds) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      categoryId: categoryIdIds[i % categoryIdIds.length],
      points: faker.lorem.sentence(1),
      title: faker.lorem.sentence(1),
      image: faker.lorem.sentence(1),
      description: faker.lorem.sentence(1),

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
