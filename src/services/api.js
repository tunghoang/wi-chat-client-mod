let name = 'api';
const URL = 'http://chat.sflow.me';
// const URL = 'http://api.chat.dev.i2g.cloud/'
// const URL = 'http://127.0.0.1:5001';
// const URL = 'http://192.168.11.109:5001';
const LOGIN = URL + '/login';
const REGISTER = URL + '/register';
const GET_LIST_CONVERSATION = URL + '/api/list/conversation';
const GET_CONVERSATION = URL + '/api/conversation';
const POST_MESSAGE = URL + '/api/message/new';
const SEEN_MESSAGE = URL + '/api/seenMessage'
const UPLOAD = URL + '/api/upload';
const THUMB = URL + '/api/thumb';
// angular.module(moduleName, []).service(serviceName, );

service.$inject = ['$http', 'Upload']
function service ($http, Upload) {
    let doPost = function(URL, token, data, cb) {
        $http({
            method: 'POST',
            url: URL,
            headers: {
                'Authorization': token
            },
            data: data
        }).then(function successCallback(response) {
                if (response.data.code != 200) {
                    console.error(response.data.reason);
                    cb();
                } else {
                    cb(response.data.content);
                }
        }, function errorCallback(response) {
            console.error(response);
            // if(toastr) toastr.error(response);
            cb();
        });
    }
    this.URL = URL;
    this.register = function(data, cb) {
        $http({
            method: 'POST',
            url: REGISTER,
            data: data
        }).then(function successCallback(response) {
            if (response.data.code != 200) {
                console.error(response.data.reason);
                cb();
            } else {
                cb(response.data.content);
            }
        }, function errorCallback(response) {
            console.error(response);
            if(toastr) toastr.error(response);
            cb();
        });
    }
    this.login = function(data, cb) {
        $http({
            method: 'POST',
            url: LOGIN,
            data: data
        }).then(function successCallback(response) {
            if (response.data.code != 200) {
                console.error(response.data.reason);
                cb();
            } else {
                cb(response.data.content);
            }
        }, function errorCallback(response) {
            console.error(response);
            if(toastr) toastr.error(response);
            cb();
        });
    }
    this.getConversation = function(token, data, cb){
        doPost(GET_CONVERSATION, token, data, cb);
    }
    this.getListConversation = function(token, data, cb) {
        doPost(GET_LIST_CONVERSATION, token, data, cb);
    }
    this.postMessage = (data, token, cb) => {
        doPost(POST_MESSAGE, token, data, cb);
    }
    this.seenMessage = (data, token, cb) => {
        doPost(SEEN_MESSAGE, token, data, cb);
    }
    this.upload = (data, token, cb) => {
        Upload.upload({
            url: UPLOAD,
            headers: {
                'Authorization': token
            },
            file: data.file,
            fields: data.fields
        }).then(
            (response) => {
                if (response.data.code != 200) {
                    console.error(response.data.reason);
                    cb();
                } else {
                    cb(response.data.content);
                }
            },
            (error) => {
                console.error(error);
                cb();
            });
    }
    this.thumb = (data, token, cb) => {
        doPost(THUMB, token, data, cb);
    };
    return this;
}

export default {
    name,
    options: service
}