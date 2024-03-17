export function trimIdFromPath(path: string) {
  const parts = path.split('/');
  parts.pop();
  return parts.join('/');
}
