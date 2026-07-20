export function formatDateValue(value: string) {
  if (!value) return "";

  // Already in HTML date format
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  // DD/MM/YYYY or DD/MM/YY
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{2}|\d{4})$/);

  if (match) {
    const [, day, month, extractedYear] = match;
    let year = extractedYear;
    // Convert 2-digit year to 4-digit year
    if (year.length === 2) {
      const y = Number(year);
      year = y >= 50 ? `19${year}` : `20${year}`;
    }

    return `${year}-${month}-${day}`;
  }

  return "";
}