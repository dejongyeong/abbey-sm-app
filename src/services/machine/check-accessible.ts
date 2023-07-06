export function isRegisterable(user: any) {
  const role = user?.role?.alias;

  return role === 'am-admin' || role === 'am-manager';
}
