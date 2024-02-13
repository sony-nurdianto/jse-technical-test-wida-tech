import {Request , Response} from 'express';
import Products from '../models/products';
import { Op } from 'sequelize';
import { FillterInterface } from '../constants/fillter-constant';
import { ProductInterface } from '../constants/products-constant';

class ProductController {
    static async getProductsAll(req: Request, res: Response) {
        try {
            const products = await Products.findAll();
            res.status(200).json(products);
        } catch (error) {
            console.error('Error get products:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async getProducts(req: Request, res: Response) {
        try {
            const dataProduct: FillterInterface = req.body.data;
            const newProduct = {...dataProduct};

            const products = await Products.findAll(
                {
                    where: newProduct.start_date && newProduct.end_date ? {
                        created_at: {
                            [Op.between]: [newProduct?.start_date, newProduct?.end_date]
                        },
                    } : {},
                    limit: newProduct?.limit || 5,
                    offset: newProduct?.page || 0,
                }
            );
            res.status(200).json(products);
        } catch (error) {
            console.error('Error get products:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async inputProduct(req:Request, res: Response) {
        try {
            const dataProduct: ProductInterface = req.body.data;
            const newProduct = {...dataProduct};

            const product = await Products.create(newProduct);
            res.status(200).json(product)
        } catch (error) {
            console.error('Error input products:', error);
            res.status(500).send('Internal Server Error');
        }
    }


    static async updateProduct(req: Request, res: Response) {
        try {
            const dataProduct: ProductInterface = req.body.data;
            const newProduct = {...dataProduct};

            for(let k in newProduct) {
                const key = k as keyof typeof newProduct;
                if(newProduct[key] === undefined || newProduct[key] === null) {
                    delete(newProduct[key]);
                }
            }

            const product = await Products.update(newProduct, {
                where: {
                    product_id: newProduct.product_id
                }
            });
            res.status(200).json({
                message: 'success update row',
                update_count: product
            })
        } catch (error) {
            console.error('Error input products:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async deleteProduct(req:Request, res: Response) {
        try {
            const dataProduct: ProductInterface = req.body.data;
            const newProduct = {...dataProduct};

            const product = await Products.destroy({where: {
                product_id: newProduct.product_id
            }});
            res.status(200).json({
                message: 'success delete row',
                delete_count: product
            })
        } catch (error: any) {
            console.error('Error input products:', error?.name);
            res.status(500).send(error?.name);
        }
    }
}

export default ProductController;