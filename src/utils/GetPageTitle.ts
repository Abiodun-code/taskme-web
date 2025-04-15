
export const getPageTitle = (pathname: string): string => {
  const path = pathname.split('/')[1] || 'home';
  return path.charAt(0).toUpperCase() + path.slice(1);
};
