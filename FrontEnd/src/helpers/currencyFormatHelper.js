export function displayAsCurrency(num) {
  return num?.toLocaleString("en", { style: "currency", currency: "USD" });
}
