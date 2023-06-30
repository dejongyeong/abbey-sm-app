export const roles: any = {
  'am-admin': [
    'am-admin',
    'am-manager',
    'am-prod-team',
    'am-service-team',
    'dealership',
    'farm-manager',
  ],
  'am-manager': ['am-manager', 'am-prod-team', 'am-service-team', 'dealership'],
  'farm-manager': ['farmer'],
  dealership: ['farm-manager'],
};
