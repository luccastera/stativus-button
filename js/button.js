function ButtonApp() {

  var thisApp = this;

  this.init = function() {
    console.log('initializing');
  };

  this.init();
}

var buttonApp;
jQuery(function() {
  buttonApp = new ButtonApp();
});
