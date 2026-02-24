import fastify from "fastify";
import { z, ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { userRoutes } from "./http/controllers/users/routes";
import { gymRoutes } from "./http/controllers/gyms/routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(userRoutes);
app.register(gymRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, response) => {
  if (error instanceof ZodError) {
    return response.status(400).send({
      message: "Validation error.",
      issues: z.treeifyError(error),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return response.status(500).send({ message: "Internal Server Error" });
});
