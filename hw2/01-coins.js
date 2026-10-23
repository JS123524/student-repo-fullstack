/** Exercise 01 - Coins **/

// Add your function here
const calculateChange = function calculateChange(n) {
  if (n < 0) {
    return 'Error: the number cannot be negative';
  }

  if (n === 0) {
    return '0 pennies';
  }

  if (n > 100) {
    return 'Error: the number is too large';
  }

  const denominations = [
    { value: 100, singular: 'dollar', plural: 'dollars' },
    { value: 25, singular: 'quarter', plural: 'quarters' },
    { value: 10, singular: 'dime', plural: 'dimes' },
    { value: 5, singular: 'nickel', plural: 'nickels' },
    { value: 1, singular: 'penny', plural: 'pennies' },
  ];

  const change = [];

  let remainingCents = Math.round(n * 100);

  denominations.forEach(({ value, singular, plural }) => {
    const count = Math.floor(remainingCents / value);

    if (count > 0) {
      const name = count === 1 ? singular : plural;
      change.push(`${count} ${name}`);
      remainingCents %= value;
    }
  });

  return change.join(', ');
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(8.99));
console.log(calculateChange(0));
console.log(calculateChange(-0.12));
