import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { memberRouter } from './controller/member.routes';
import {paymentRouter} from './controller/payment.routes';
import {trainerRouter} from './controller/trainer.routes';
import { membershipRouter } from './controller/membership.routers';
import bodyParser from 'body-parser';
import { expressjwt } from 'express-jwt';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3001;

app.use(cors({ origin: "http://localhost:8080" }));
app.use(bodyParser.json());
// Middleware to parse JSON request bodies
app.use(express.json());

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
}

app.use(expressjwt({
    secret: process.env.JWT_SECRET ,  // Ensure this is treated as a string
    algorithms: ['HS256'],
}).unless({
    path: [
        '/api/docs',  // Corrected this path
        '/members/login',
        '/trainers/login'
    ]
}));
// Use the member router
app.use("/members", memberRouter);
app.use("/payments", paymentRouter);
app.use("/trainers", trainerRouter);
app.use("/memberships", membershipRouter);


app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Gym Management API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Global Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Invalid token' });
    }else{
    console.error(err.stack);
    res.status(err.status || 400).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
}});

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});

export default app;