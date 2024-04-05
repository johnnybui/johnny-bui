import {
  sum_to_n_iterative,
  sum_to_n_recursive,
  sum_to_n_closed_formula,
} from './functions';

// Get the command-line argument
const n = parseInt(process.argv[2]);

// Check if input is provided
if (isNaN(n)) {
  console.log('Usage: npm run prob4 <number>');
  process.exit(1);
}

// Test Max safe integer with the fastest method
let sum_to_n_closed_formula_result = 0;
if (sum_to_n_closed_formula(n) <= Number.MAX_SAFE_INTEGER) {
  sum_to_n_closed_formula_result = sum_to_n_closed_formula(n);
} else {
  console.log('Input value is too big');
  process.exit(1);
}

// Call the functions with the input value
console.log('Closed-form Formula:', sum_to_n_closed_formula_result);
console.log('Iterative Approach:', sum_to_n_iterative(n));
console.log('Recursive Approach:', sum_to_n_recursive(n));
