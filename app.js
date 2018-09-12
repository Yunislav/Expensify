// Budget Controller
var budgetController = (function () {
  // code


})();


// UI controller
var UIcontroller = (function (){
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn'
  };

  return {
    getInput: function(){
      return  {
        type : document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description : document.querySelector(DOMstrings.inputDescription).value,
        value : document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };

})();


// Global App controller
var controller = (function(budgetCtrl, UIctrl) {
 
  var setupEventListeners = function() {   
    
    var DOM = UIctrl.getDOMstrings();
    var button = document.querySelector(DOM.inputButton);
    button.addEventListener('click', ctrlAddItem);
    
    document.addEventListener('keypress', function(e){
      if (e.keyCode === 13 || e.which === 13){
        ctrlAddItem();
      }
    })
  };
  
  var ctrlAddItem = function(){
    var input = UIctrl.getInput();
      console.log(input);

        //  1 Get the field input data
        //  2 add the item to the budget controller
        //  3 add the item to the UI
        //  4 calculate the budget
        //  5 display the budget on the UI
  };

  return {
    init: function() {
      console.log('App has started.')
      setupEventListeners();
    }
  }

// I pass these two parameters to make the code more independent in case of changing the
// Controller names, to avoid changing it in multiple places in my code.
})(budgetController, UIcontroller); 

controller.init();