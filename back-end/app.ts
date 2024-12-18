import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { memberRouter } from './controller/member.routes';
import {paymentRouter} from './controller/payment.routes';
import {trainerRouter} from './controller/trainer.routes';
import { membershipRouter } from './controller/membership.routers';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3001;

app.use(cors({ origin: "http://localhost:8080" }));

// Middleware to parse JSON request bodies
app.use(express.json());

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
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
});

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});

export default app;