import {Product} from "../models/schemas/product.model";

export class ProductController {
    static async createProduct(req, res) {
        try {
            const user = req.decoded;
            if (user.role !== 'admin') {
                res.render('error');
                return;
            }
            const product = await Product.findOne({name: req.body.name});
            if (!product) {
                let productData = {
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category
                }
                await Product.create(productData);
                res.render('success');
            } else {
                res.json({err: 'Product existed!'});
            }
        } catch (err) {
            res.json({err: err});
        }
    }
}