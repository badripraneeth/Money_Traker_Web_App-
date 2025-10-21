let expenses = [];
let totalAmount = 0;

// Load expenses from localStorage
function loadExpenses() {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
        totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
        totalAmountCell.textContent = totalAmount;
        expenses.forEach(expense => displayExpense(expense));
    }
}

// Save expenses to localStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to display a single expense
function displayExpense(expense) {
    const newRow = expenseTableBody.insertRow();
    
    const categoryCell = newRow.insertCell();
    const AmountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);
        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;
        expenseTableBody.removeChild(newRow);
        saveExpenses();
    });

    categoryCell.textContent = expense.category;
    AmountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}

const categorySelect = document.getElementById('category-select')
const amountInput = document.getElementById('amount-input')
const dateInput = document.getElementById('date-input')
const addBtn = document.getElementById('add-btn')
const expenseTableBody = document.getElementById('expense-table-body')
const totalAmountCell = document.getElementById('total-amount')

addBtn.addEventListener('click', function(){
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if(category === ''){
        alert('please select a category');
        return;
    }
    if(isNaN(amount) || amount <= 0){
        alert('please enter a valid amount');
        return;
    }
    if(date === ''){
        alert('please select a date');
        return;
    }

    const expense = {category, amount, date};
    expenses.push(expense);
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;
    
    displayExpense(expense);
    saveExpenses();
    
    // Clear input fields
    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';

});

// Load expenses when the page loads
document.addEventListener('DOMContentLoaded', loadExpenses);