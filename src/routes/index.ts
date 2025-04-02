import {Router } from 'express';
import userRouter from './user.route';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: "Welcome to User API",
    });
}
);

//User Routes
router.use('/user', userRouter);

export default router;