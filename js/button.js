function ButtonApp() {

  var self = this;

  this.init = function() {
    self.initializeStatechart();
    self.captureEvents();
  };

  this.action = function() {
    $('ul#log').append('<li>Clicked at ' + new Date() + '</li>');
  };

  this.initializeStatechart = function() {
    self.statechart = Stativus.createStatechart();

    self.statechart.addState('initial', {
      enterState: function() {
        var isOverButton = $('#stativus-button').is(':hover');
        if (isOverButton) {
          this.goToState('mouseOverMouseUp');
        } else {
          this.goToState('mouseOutMouseUp');
        }
      }
    });

    self.statechart.addState('mouseOutMouseUp', {
      enterState: function() {
        $('#stativus-button').removeClass('active');
      },
      mouseEntered: function() {
        this.goToState('mouseOverMouseUp');
      }
    });

    self.statechart.addState('mouseOverMouseUp', {
      enterState: function() {
        $('#stativus-button').addClass('active');
      },
      mouseExited: function() {
        this.goToState('mouseOutMouseUp');
      },
      mouseDown: function() {
        this.goToState('mouseOverMouseDown');
      }
    });

    self.statechart.addState('mouseOverMouseDown', {
      enterState: function() {
        $('#stativus-button').addClass('active');
      },
      mouseUp: function() {
        self.action();
        this.goToState('mouseOverMouseUp');
      },
      mouseExited: function() {
        this.goToState('mouseOutMouseDown');
      }
    });

    self.statechart.addState('mouseOutMouseDown', {
      enterState: function() {
        $('#stativus-button').removeClass('active');
      },
      mouseEntered: function() {
        this.goToState('mouseOverMouseDown');
      },
      mouseUp: function() {
        this.goToState('mouseOutMouseUp');
      }
    });

    // start statechart after a timeout to give us time to get
    // the cursor on the button and test the initial state
    window.setTimeout(function() {
      self.statechart.initStates('initial');
    }, 2000);
  };

  this.captureEvents = function() {
    $('#stativus-button').on('hover', function(evt) {
      if (evt.type === 'mouseenter') {
        self.statechart.sendEvent('mouseEntered');
      } else if (evt.type === 'mouseleave') {
        self.statechart.sendEvent('mouseExited');
      }
    });
    $('body').on('mousedown', function(evt) {
      self.statechart.sendEvent('mouseDown');
    });
    $('body').on('mouseup', function(evt) {
      self.statechart.sendEvent('mouseUp');
    });
  };

  this.init();
}

var buttonApp;
jQuery(function() {
  buttonApp = new ButtonApp();
});
