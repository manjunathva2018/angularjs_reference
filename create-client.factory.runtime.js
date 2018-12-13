"use strict";

define(function() {
    return createClientService;


    function createClientService(promiseService, rest, eventService, routerHelperResolver, messageService, pathService) {

        var factory;
        var createClientPromise;
        return factory = {
            init: init,
            createClient: createClient,
            ClientDetails: {},
            request: getRequestInitializeObject(),
            errors: getErrorsInitializeObject(),
            status: getStatusInitializeObject(),
            messages: messageService.getComponentMessages("creatingMessages"),
            loaderMessages: messageService.getComponentMessages("loaderMessages"),

            paths: {
                ajaxLoaderImg: pathService.getPath("images.content-loader")
            },
        };

        function init() {
            factory.ClientDetails = getClientInitializeDetails();
        }

        function createClient() {
            return _promise();

            function _promise() {
                if (createClientPromise) {
                    if (createClientPromise.exist()) {
                        return createClientPromise;
                    }
                    createClientPromise.recreatePromise();
                } else {
                    createClientPromise = promiseService.createPromise();

                }
                return _fetchData();
            }

            function _fetchData() {
                factory.request.creatingClientList = true;
                rest.createClient({
                    client_name: factory.ClientDetails.ClientName,
                    client_description: factory.ClientDetails.ClientDescription,
                }).$promise.then(function(details) {
                    if (details) {
                        factory.request.creatingClientList = false;
                        _handleSuccess(details);
                        createClientPromise.resolve();
                        createClientPromise.destroy();
                    } else {
                        factory.status.creatingClientList = true;
                        factory.request.creatingClientList = false;
                        createClientPromise.reject();
                        createClientPromise.destroy();
                    }
                }, function(errorDetails) {
                    factory.request.creatingClientList = false;
                    factory.status.creatingClientList = true;
                    factory.errors.creatingClientList = _handleError(errorDetails);
                    createClientPromise.reject();
                    createClientPromise.destroy();
                });
                return createClientPromise;
            }

            function _handleSuccess(details) {
                createClientPromise.resolve();
                toastr.success(" Client Created Successfully");
                routerHelperResolver.addRedirectRoute("root.client", {});
                routerHelperResolver.redirectToRoute(true);
            }

            function _handleError(errorDetails) {
                toastr.error(errorDetails.data.error.message);
                var errorObj = {
                    error: true,
                    msg: ""
                };
                errorObj.msg = messageService.getComponentMessages("creatingMessages")
                    .getMessage("createFailed");
                return errorObj;
            }


        }

        function getClientInitializeDetails() {
            return {
                ClientName: "",
                ClientDescription: ""
            };
        }

        function getRequestInitializeObject() {
            return {
                creatingClientList: false
            };
        }

        function getErrorsInitializeObject() {
            return {
                creatingClientList: null
            };
        }

        function getStatusInitializeObject() {
            return {
                creatingClientList: false
            };
        }
    }
});