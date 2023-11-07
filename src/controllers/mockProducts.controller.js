import faker from 'faker';
import { productModel } from '../models/products.models';

export const generateMockProducts = async (req, res) => {
    try {
        for (let i = 0; i < 50; i++) {
            const productData = {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                stock: faker.datatype.number({ min: 10, max: 100 }),
                category: faker.commerce.department(),
                status: true,
                code: faker.random.alphaNumeric(10),
                thumbnails: [faker.image.imageUrl()]
            };
            
            const newProduct = await productModel.create(productData);
        }
        res.json({ message: 'Productos de prueba creados exitosamente', newProduct});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};