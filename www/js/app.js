(function() {
  var App;

  App = (function() {
    function App(options) {
      var defaults = {
        debug: false
      };
      this.options = $.extend(defaults, options);
      this.init();      
    }   
    
    App.prototype.init = function(){
      var that = this;
      
      this.options.debug && console.log('Initializing...');
      
      // Don't listen for device if debugging
      if ( this.options.debug ) {
        this.onDeviceReady();
      
      // Wait for device to be ready
      } else {
        document.addEventListener('deviceready', function(){
          that.onDeviceReady()
        }, false);
      }
      
    };
    
    App.prototype.onDeviceReady = function(){
      this.options.debug && console.log('Device Ready!');
      
      
    };

    return App;

  })();

  $(function() {
    return new App({
      debug: true
    });
  });

}).call(this);
