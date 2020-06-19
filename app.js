const budgetController = (function(){

  const Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }
  
  const Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  }

  return {
    addItem: function(type, des, val) {

      var newItem;

      // Creates a new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length -1].id + 1;
      } else {
        ID = 0
      };

      // Creates a new item based on the type.
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else 
      if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // Push it into data where it's supposed to go.
      data.allItems[type].push(newItem);

      // Return the new element.
      return newItem;

    },
    testing: function(){
      console.log(data);
    }
  }

})();





const userInterfaceController = (function(){

  let DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }

  return {

    getInput: function(){

      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will either be 'inc' or 'exp'
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }

    },

    getDOMstrings: function(){
      return DOMstrings;
    }
  }

})();





const controller = (function(budgetCtrl, UICtrl){

  const setupEventListeners = function () {

    const DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){

      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
      
    });

  }

  const ctrlAddItem = function () {

    let input, newItem;

    // 1. Get the field input data.
    input = UICtrl.getInput();

    // 2. Add the item to the budget controller.
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. Add the item to the UI.

    // 4. Calculate the budget.

    // 5. Display the budget.

  }

  return {
    init: function(){

      setupEventListeners();

    }
  }

})(budgetController, userInterfaceController);

controller.init();