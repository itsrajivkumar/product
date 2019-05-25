module.exports = {   
    dataErrors: (error, res) => {
        if (error.name == 'SequelizeDatabaseError' || error.name == 'SequelizeEagerLoadingError' || error.name == 'SequelizeUniqueConstraintError') {
        res.status(400).send({ message: 'The request cannot be fulfilled due to bad syntax.' });
        }
        else if (error.name == 'SequelizeValidationError'){
        res.status(400).send({ message: 'Validation error' });
        }
        else if(error.name == 'SequelizeConnectionError'){
        res.status(504).send({ message: 'Gateway timeout. Please check your internet connection' })
        }
        else {
        res.status(500).send({ message: 'An unexpected error occured' });
        }
     },

    authErrors: (error, res) => {
        if (error) {
            res.status(401).send({ message: 'Access token isn’t provided or is invalid' });
        }
        else {
            res.status(500).send({ message: 'An unexpected error occured' });
        }
    },

    result: (result, res) => {
        if (result != null) {
            res.status(200).send({ data: result });
        }
        else {
            res.status(204).send({ message: 'The server successfully processed the request, but is not returning any content.' });
        }
    },

   
}