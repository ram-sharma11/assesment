const { errorResponse } = require("../utils/common");
const {
    usercreated,
    getusers
}= require("../service/user")


module.exports.postData = async (req, res) => {
    try {
        const response = await usercreated(req.body)
        return res.status(200).json(response);
      } catch (err) {
        return errorResponse(err, res);
      }
};

module.exports.getData = async (req, res) => {
    try {
        const response = await getusers()
        return res.status(200).json(response);
      } catch (err) {
        return errorResponse(err, res);
      }
};