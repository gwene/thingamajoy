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
          that.onDeviceReady();
        }, false);
      }
      
    };
    
    App.prototype.initPages = function(){
      // retrieve last page from web storage
      var i = localStorage.page_i || 0;
      this.$pages = $('.page');
      this.goToPage(parseInt(i));
    };
    
    App.prototype.initSwipes = function(){
      var that = this;
      Hammer($('body')[0]).on('swiperight', function(e) {
        that.goToPagePrev();
      });
      Hammer($('body')[0]).on('swipeleft', function(e) {
        that.goToPageNext();
      });
    };
    
    App.prototype.goToPage = function(i){
      this.options.debug && console.log('Going to page '+i);      
      this.current_page_i = i;
      if ( this.$page ) this.$page.removeClass('active');
      this.$page = this.$pages.eq(i);
      this.$page.addClass('active');
      // store in web storage
      localStorage.page_i = i;
    };
    
    App.prototype.goToPageNext = function(){
      var i = this.current_page_i + 1;
      if (i < this.$pages.length) {
        this.goToPage(i);
      } else {
        this.options.debug && console.log('End');
      }
    };
    
    App.prototype.goToPagePrev = function(){
      var i = this.current_page_i - 1;
      if (i >= 0) {
        this.goToPage(i);
      }
    };
    
    App.prototype.onDeviceReady = function(){
      this.options.debug && console.log('Device Ready!');      
      this.initPages();
      this.initSwipes();
    };

    return App;

  })();

  $(function() {
    return new App(config);
  });

}).call(this);
