import {Router} from "express";
import {auth} from "../middlewares/auth";
import {Product} from "../models/schemas/product.model";
import {AuthController} from "../controllers/auth.controller";
import {ProductController} from "../controllers/product.controller";

const router = Router();

router.use('/product', auth);

router.get('/user/login', async (req, res) => {
    res.render('login');
});

router.get('/home', async (req, res) => {
    res.render('home');
});

router.get('/list', async (req, res) => {
    let products = await Product.find();
    res.render('list', {products});
});

router.get('/create', async (req, res) => {
    res.render('create');
});

router.post('/user/register', AuthController.register);

router.post('/user/login', AuthController.login);

router.post('/product/create', ProductController.createProduct);

export default router;