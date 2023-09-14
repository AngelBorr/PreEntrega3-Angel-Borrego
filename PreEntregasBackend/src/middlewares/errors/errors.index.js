import EErrors from "../../services/errors/enums.js";

export default (error, req, res, next) => {
    req.logger.info('usando middleware de errores')
    req.logger.info(error)
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status: 'error', error: error});
            break;
        default:
            res.send({status: 'error', error: 'Internal Server Error'});
    }
};