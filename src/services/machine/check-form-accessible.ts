export function isAccessible(user: any) {
  const role = user?.role?.alias;

  return (
    role === 'am-admin' || role === 'am-manager' || role === 'am-prod-team'
  );
}
