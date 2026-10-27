const cedi = new Intl.NumberFormat("en-GH", { maximumFractionDigits: 0 });
const cediExact = new Intl.NumberFormat("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** GH₵ 12,500 */
export function ghs(amount: number) {
  return `GH₵ ${cedi.format(amount)}`;
}

/** GH₵ 380.00 */
export function ghsExact(amount: number) {
  return `GH₵ ${cediExact.format(amount)}`;
}
