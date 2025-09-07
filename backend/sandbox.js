// const today = new Date("2025-08-31"); // 31 Agustus 2025
// const date = new Date(today);
// date.setDate(today.getDate() + 1); // tambah 1 hari
// console.log(date.toDateString());

function getMonthNameFromDate(date) {
    return new Intl.DateTimeFormat("id-ID", { month: 'short' }).format(date);
}

// contoh penggunaan:
console.log(getMonthNameFromDate(new Date(2025, 0, 1)));  // January
console.log(getMonthNameFromDate(new Date(2025, 11, 1))); // December