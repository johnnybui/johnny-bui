export function sum_to_n_recursive(n: number): number {
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_recursive(n - 1);
}
