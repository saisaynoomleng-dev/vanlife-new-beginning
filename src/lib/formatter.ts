export const formatTitle = (title: string) => {
  return `${title.slice(0, 1).toUpperCase()}${title.slice(1)}`;
};

export const formatCurrency = (currency: number) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'usd',
  }).format(currency);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDash = (text: string) => {
  return text.replace(/-/g, ' ');
};
