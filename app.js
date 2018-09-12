// Budget Controller
var budgetController = (function () {

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var data = {
      allItems : {
        expense: [],
        income: []
      },
      totals: {
        expense: 0,
        income : 0
      }
  }

  return {
    addItem: function(type, description, amount){
      var newItem, ID;
      if (data.allItems[type].length > 0){
        //  Creating an ID for transactions, example : expense[lastElement].id + 1 
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item based on transaction type
      if (type === 'expense') {
        newItem = new Expense(ID, description, amount) 
      } else if (type === 'income') {
        newItem = new Income(ID, description, amount) 
      }
      
      // Add item to the datastructure based on its type
      data.allItems[type].push(newItem);      
      
      // return the new element
      return newItem;
    },
    testing: function(){
       return console.log(data);
      }
    }
})();

// UI controller
var UIcontroller = (function (){
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return {
    getInput: function(){
      return  {
        type : document.querySelector(DOMstrings.inputType).value, // Will be either income or expense
        description : document.querySelector(DOMstrings.inputDescription).value,
        value : document.querySelector(DOMstrings.inputValue).value
      };
    },
    
    addListItems: function(obj, type) {
      var html, newHTML, element;
      // create,  HTML string with placeholder data
      if (type === 'expense') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if (type === 'income') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
      // Replace placeholder data with real data
      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', obj.value);

      // Insert HTML into the DOM
      debugger;
      document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
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
    var input, newItem;
    //  1 Get the field input data
    var input = UIctrl.getInput();
    //  2 add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    //  3 add the item to the UI
    UIctrl.addListItems(newItem, input.type);
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