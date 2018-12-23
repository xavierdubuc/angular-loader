(function()
{
    'use strict';

    angular
        .module('xd-loader')
        .factory('loadingManager', loadingManager)
    ;

    /* @ngInject */
    function loadingManager()
    {
        return {instance: instance};

        ////////////////


        function instance(scope, key)
        {
            return new LoadingManager(scope, key);
        }

        function LoadingManager(scope, key){
            var manager = this;
            var default_loader_key = 'loader';
            var default_loading_id = 'default';
            var loader_key = isUndefined(key) ? default_loader_key : key;
            var loadings = {};

            manager.loading = loading;
            manager.loaded = loaded;
            manager.is_loading = is_loading;
            manager.is_loaded = is_loaded;
            init();

            ////////////////

            function init(){
                scope[loader_key] = {
                    is_loading: is_loading,
                    is_loaded: is_loaded
                };
            }

            function loading(key){
                key = isUndefined(key) ? default_loading_id : key;
                loadings[key] = true;
            }

            function loaded(key){
                key = isUndefined(key) ? default_loading_id : key;
                loadings[key] = false;
            }

            function is_loading(key){
                key = isUndefined(key) ? default_loading_id : key;
                return is_defined(key) && loadings[key];
            }

            function is_loaded(key){
                key = isUndefined(key) ? default_loading_id : key;
                return is_defined(key) && !is_loading(key);
            }

            function is_defined(key){
                key = isUndefined(key) ? default_loading_id : key;
                return !isUndefined(loadings[key]);
            }
        }

        function isUndefined(value){
            return typeof value === 'undefined' || value === undefined;
        }
    }
})();
