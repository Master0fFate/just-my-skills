export const grouped = (value: number) => Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const padded = (value: number, digits: number) => Math.round(value).toString().padStart(digits, "0");
