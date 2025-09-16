let balance = 1000;

function updateUI(message = '') {
  document.getElementById('balance').textContent = `$${balance}`;
  document.getElementById('amount').value = '';
  document.getElementById('message').textContent = message;
}

function deposit() {
  const amount = Number(document.getElementById('amount').value);
  if (amount > 0) {
    balance += amount;
    updateUI('Deposit successful!');
  } else {
    updateUI('Enter a valid deposit amount!');
  }
}

function withdraw() {
  const amount = Number(document.getElementById('amount').value);
  if (amount > 0 && amount <= balance) {
    balance -= amount;
    updateUI('Withdrawal successful!');
  } else {
    updateUI('Invalid withdrawal amount!');
  }
}
