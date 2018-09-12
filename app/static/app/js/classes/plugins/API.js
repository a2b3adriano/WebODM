import { EventEmitter } from 'fbemitter';
import ApiFactory from './ApiFactory';
import Map from './Map';
import Dashboard from './Dashboard';
import $ from 'jquery';
import SystemJS from 'SystemJS';

if (!window.PluginsAPI){
  const events = new EventEmitter();
  const factory = new ApiFactory(events);

  SystemJS.config({
    baseURL: '/plugins',
    map: {
      'css': '/static/app/js/vendor/css.js',
      'globals-loader': '/static/app/js/vendor/globals-loader.js'
    },
    meta: {
      '*.css': { loader: 'css' },

      // Globals always available in the window object
      'jQuery': { loader: 'globals-loader', exports: '$' },
      'leaflet': { loader: 'globals-loader', exports: 'L' },
      'ReactDOM': { loader: 'globals-loader', exports: 'ReactDOM' },
      'React': { loader: 'globals-loader', exports: 'React' }
    }
  });

  window.PluginsAPI = {
    Map: factory.create(Map),
    Dashboard: factory.create(Dashboard),

    SystemJS,
    events
  };
}

export default window.PluginsAPI;
