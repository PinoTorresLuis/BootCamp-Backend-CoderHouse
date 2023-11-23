import { faker } from '@faker-js/faker';
import { productModel } from '../models/products.models.js';
import { logger } from '../utils/logger.js';

export const generateMockProducts = async (req, res) => {
    try {
        for (let i = 0; i < 100; i++) {
            const productData = {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                stock: faker.number.int({ min: 10, max: 100 }),
                category: faker.commerce.department(),
                status: true,
                code:faker.string.alphanumeric(10),
                thumbnails: [faker.image.avatar()]  
            };
            
            const newProduct = await productModel.create(productData);
            logger.info(newProduct)
        }   
        res.status(200).send({ message: 'Productos de prueba creados exitosamente'});
    } catch (error) {
        logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} Ha ocurrido un error: ${error.message}`)
        res.status(500).send({ error:error.message });
    }
};