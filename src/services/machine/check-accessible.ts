export function isRegisterable(user: any) {
  const role = user?.role?.alias;

  return role === 'am-admin' || role === 'am-manager';
}

export function getUrl(user: any, mid: any) {
  const role = user?.role?.alias;

  if (role === 'am-admin' || role === 'am-manager' || role === 'am-prod-team') {
    return `/api/machines/unassign/dealership/${mid}`;
  }

  if (role === 'dealership') {
    return `/api/machines/unassign/farm-manager/${mid}`;
  }
}
