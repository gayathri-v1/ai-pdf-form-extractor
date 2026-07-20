const STORAGE_KEY = "pdf-form-data";

export function saveFormData(data: unknown) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getFormData(){
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return null;

    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function clearFormData() {
  localStorage.removeItem(STORAGE_KEY);
}