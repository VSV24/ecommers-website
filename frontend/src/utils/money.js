export function formatMoney(moneyCentas){
  return `$${(moneyCentas / 100).toFixed(2)}`
}