export function getInitials(name: string) {
  const split = name.split('');
  if (split.length >= 2) {
    return split[0].toUpperCase() + split[1].toUpperCase();
  }
  if (name.length >= 2) {
    return name[0].toUpperCase() + name[1].toUpperCase();
  }
  if (name.length >= 1) {
    return name.toUpperCase();
  }

  return 'UK';
}
