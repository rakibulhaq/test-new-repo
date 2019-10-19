const BaseEndpointModel = require("./base-endpoint.model").BaseEndpoint;

class BaseEndpointHandler {
  constructor() {
    this._validator = require("validator");
  }

  getBaseEndpointInfo(req, BaseEndpointToken, callback) {
    return new Promise(function(resolve, reject) {
      let BaseEndpointId = req.params.id;

      sql.query(
        "Select * from base_endpoints where id = ? ",
        BaseEndpointId,
        function(err, res) {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    })
      .then(res => {
        callback.onSuccess(res);
      })
      .catch(error => {
        callback.onError(error);
      });
  }
  createNewBaseEndpoint(req, callback) {
    let data = req.body;

    let newBaseEndpoint = new BaseEndpointModel({
      custom_id: data.custom_id,
      some_name: data.some_name ? data.some_name : "",
      mobile_number: data.mobile_number ? data.mobile_number : 0
    });
    return new Promise(function(resolve, reject) {
          //create new entry
          sql.query(
            "INSERT INTO base_endpoints set ?",
            newBaseEndpoint,
            function(err, res) {
              if (err) {
                console.log("error: ", err);
                reject(err);
              } else {
                newBaseEndpoint["id"] = res.insertId;
                resolve(newBaseEndpoint);
              }
            }
          );
        })
      .then(saved => {
        callback.onSuccess(saved);
      })
      .catch(error => {
        callback.onError(error);
      });
  }
  updateBaseEndpoint(req, callback) {
    let data = req.body;
    let id = req.params.id;
    // console.log(id);

    return new Promise((resolve, reject) => {
      //update endpoint
      sql.query("UPDATE base_endpoints SET ? WHERE id = ?", [data, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
              reject(err);
           }
         else{   
           resolve(data);
              }
          }); 
    })
      .then(saved => {
        callback.onSuccess(saved);
      })
      .catch(error => {
        callback.onError(error);
      });
  }
  deleteBaseEndpoint(req, callback) {
    let id = req.params.id;
    return new Promise((resolve, reject) => {
      //delete endpoint entry
      sql.query("DELETE FROM base_endpoints WHERE id = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            reject(err);
        }
        else{
       
         resolve(res);
        }
    }); 
    })
      .then(deleted => {
        callback.onSuccess(deleted);
      })
      .catch(error => {
        callback.onError(error);
      });
  }
  getAllBaseEndpoint(req, callback) {
    return new Promise((resolve, reject) => {
      if (typeof req.query.operation != "undefined") {
      } else {
        //catch all BaseEndpoint get request
        sql.query("Select * from base_endpoints", function (err, res) {

            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
              console.log('BaseEndpoints : ', res);  

             resolve(res);
            }
        });
      }
    })
      .then(data => {
        callback.onSuccess(data);
      })
      .catch(error => {
        callback.onError(error);
      });
  }
}
module.exports = BaseEndpointHandler;
