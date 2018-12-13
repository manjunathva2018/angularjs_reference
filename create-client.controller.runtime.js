"use strict";

define(function() {
    return CreateClientController;

    function CreateClientController(createClientService) {

        var vm = this;
        vm.events = {};


        vm.messages = createClientService.messages;
        vm.loaderMessages = createClientService.loaderMessages;
        vm.request = createClientService.request;
        vm.errors = createClientService.errors;
        vm.status = createClientService.status;
        vm.paths = createClientService.paths;
        vm.ajaxLoaderCreatingClientList = {
            msg: vm.messages.getMessage("creatingData"),
            loaderImg: vm.paths.ajaxLoaderImg
        };
        vm.ajaxLoaderFetchData = {
            msg: vm.loaderMessages.getMessage("loading"),
            loaderImg: vm.paths.ajaxLoaderImg
        };
        activate();

        function activate() {
            createClientService.init();
            vm.createClient = createClient;
            vm.ClientDetails = createClientService.ClientDetails;
            events();
        }

        function createClient(isValid) {
            console.log(isValid);
            if (isValid) {
                createClientService.createClient();
            }

        }

        function events() {
            vm.events.retry = retry;
        }

        function retry() {
            if (!vm.errors.creatingClientList) {
                createClient();
            }

            vm.request.creatingClientList = false;
            vm.errors.creatingClientList = null;
        }



    }


});