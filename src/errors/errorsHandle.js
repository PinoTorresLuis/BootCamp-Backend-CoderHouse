import { logger } from "../utils/logger.js";
import { EErrors } from "./enums.js";

export default (error, req, res, next) => {
    logger.warning(error.message);
    switch (error.code) {
        case EErrors.MISSING_REQUIRED_FIELDS:
            res.status(400).send({ status: "error", error: error.name });
            break;
        default:
            res.status(500).send({ status: "error", error: "Unhandled error" });
    }
}