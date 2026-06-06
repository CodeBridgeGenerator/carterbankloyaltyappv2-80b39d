
import { faker } from "@faker-js/faker";
export default (user,count,userIds,voucherIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
user: userIds[i % userIds.length],
voucher: voucherIds[i % voucherIds.length],
quantity: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
