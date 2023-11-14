let totalExpense = 0;

function addExpense() {
    const categoryInput = document.getElementById('categoryInput');
    const expenseInput = document.getElementById('expenseInput');
    const expenseList = document.getElementById('expenseList');
    const totalExpenseDisplay = document.getElementById('totalExpense');

    if (categoryInput.value !== '' && expenseInput.value !== '') {
        const expenseAmount = parseFloat(expenseInput.value);

        if (isNaN(expenseAmount) || expenseAmount < 0) {
            alert('Please enter a valid positive number for the expense amount.');
            return;
        }

        const newExpense = document.createElement('li');
        newExpense.textContent = `${categoryInput.value}: ₹${expenseAmount.toFixed(2)}`;
        expenseList.appendChild(newExpense);

        totalExpense += expenseAmount;
        totalExpenseDisplay.textContent = `Total Expense: ₹${totalExpense.toFixed(2)}`;

        categoryInput.value = '';
        expenseInput.value = '';
    } else {
        alert('Please enter both category and expense.');
    }
}
