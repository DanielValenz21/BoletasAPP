export const formatMoney = (n: unknown) =>
    n != null && !Number.isNaN(+n) ? `$${(+n).toFixed(2)}` : '—';
  
  export const formatDate = (iso: string | null | undefined) => {
    if (!iso) return '—';
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  