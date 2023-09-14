export const getLoggers = async (req, res) => {
    req.logger.debug('Esto es una prueba del Log debug');
    req.logger.http('Esto es una prueba del Log http');
    req.logger.info('Esto es una prueba del Log info');
    req.logger.warning('Esto es una prueba del Log warning');
    req.logger.error('Esto es una prueba del Log error');
    req.logger.fatal('Esto es una prueba del Log fatal');
    res.send({ message: 'Prueba de Logger!' });    
}