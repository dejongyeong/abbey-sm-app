export async function filterRoleList(user: any, roles: any) {
  const alias = user?.role.alias;

  switch (alias) {
    case 'am-admin':
      return roles;
    case 'am-manager':
      return roles?.filter(
        (v: any) =>
          !['am-admin', 'am-manager', 'farm-manager', 'farmer'].includes(
            v.alias
          )
      );
    case 'dealership':
      return roles?.filter(
        (v: any) =>
          ![
            'am-admin',
            'am-manager',
            'am-prod-team',
            'am-service-team',
            'dealership',
            'farmer',
          ].includes(v.alias)
      );
    case 'farm-manager':
      return roles?.filter(
        (v: any) =>
          ![
            'am-admin',
            'am-manager',
            'am-prod-team',
            'am-service-team',
            'dealership',
          ].includes(v.alias)
      );
    default: // all  other roles
      return [];
  }
}
