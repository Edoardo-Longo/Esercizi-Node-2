import express from "express";
import "express-async-errors";

import { validationErrorMiddleware } from "./lib/middleware/validation";
import { initCorsMiddleware } from "./lib/middleware/cors";

import planetsRoutes from "./routes/planets"
import { initSessionMiddleware } from "./lib/middleware/session";
import { passport } from "./lib/middleware/passport";
import authRouter from "./routes/auth";
import { notFoundMiddleware, initErrorMiddleware } from "./lib/middleware/error";

const app = express();

app.use(initSessionMiddleware(app.get("env")));
app.use(passport.initialize())
app.use(passport.session());

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/planets", planetsRoutes);
app.use("/auth", authRouter)
app.use(notFoundMiddleware);

app.use(validationErrorMiddleware);
app.use(initErrorMiddleware(app.get("env")))

export default app;