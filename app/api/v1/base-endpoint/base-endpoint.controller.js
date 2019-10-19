const BaseController = require('../base').BaseController;
const BaseEndpointHandler = require('./base-endpoint.handler');

class BaseEndpointController extends BaseController{
    constructor(){
        super();
        this._BaseEndpointHandler = new BaseEndpointHandler();

    }
    getBaseEndpointInfo(req, res , next){
        this._BaseEndpointHandler.getBaseEndpointInfo(req, null, this._responseManager.getDefaultResponseHandler(res));
    }
    create(req, res){
        let responseManager = this._responseManager;
        this._BaseEndpointHandler.createNewBaseEndpoint(req, responseManager.getDefaultResponseHandler(res));
    }
    getAll(req, res, next){
            this._BaseEndpointHandler.getAllBaseEndpoint(req, this._responseManager.getDefaultResponseHandler(res));
    }
    update(req, res, next){
            this._BaseEndpointHandler.updateBaseEndpoint(req, this._responseManager.getDefaultResponseHandler(res));
    }
    remove(req, res, next){
            this._BaseEndpointHandler.deleteBaseEndpoint(req, this._responseManager.getDefaultResponseHandler(res));
    }

}

module.exports = BaseEndpointController;