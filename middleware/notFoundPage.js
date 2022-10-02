const { StatusCodes } = require("http-status-codes")

const notFound = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).send(`Requested page does not exist`)
}

module.exports = notFound