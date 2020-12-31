import { Router } from "../deps.ts";

/**
 * Own
 */
// models
import { validate } from "../middlewares/validate.middleware.ts";
import { loginValidation, refreshTokenValidation } from "../validations/auth.validation.ts";

// controllers
import AuthController from "../controllers/auth.controller.ts";

const router: Router = new Router();

router.post(
    "/api/auth/login",
    validate(loginValidation),
    AuthController.login,
);

router.post(
    "/api/auth/refresh-tokens",
    validate(refreshTokenValidation),
    AuthController.refreshTokens,
);

export default router;
