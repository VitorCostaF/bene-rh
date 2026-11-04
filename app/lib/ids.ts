/** Transforma um texto em um trecho seguro para usar em `id` (minúsculas, sem acento, separado por hífen). */
export function slugId(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
