const ENDPOINTS = {
  USERS: ({ realm = 'UserManager' } = {}) =>
    `http://localhost:8080/auth/admin/realms/${realm}/users`,
  USER: ({ userId, realm = 'UserManager' }) =>
    `http://localhost:8080/auth/admin/realms/${realm}/users/${userId}`,
  USER_GROUPS: ({ userId, realm = 'UserManager' }) =>
    `http://localhost:8080/auth/admin/realms/${realm}/users/${userId}/groups`,
  CLIENT_ROLES_AVAILABLE: ({ userId, clientId, realm = 'UserManager' }) =>
    `http://localhost:8080/auth/admin/realms/${realm}/users/${userId}/role-mappings/clients/${clientId}/available`,
  CLIENT_ROLES_ASSIGNED: ({ userId, clientId, realm = 'UserManager' }) =>
    `http://localhost:8080/auth/admin/realms/${realm}/users/${userId}/role-mappings/clients/${clientId}`,
  REALM_ROLES_AVAILABLE: ({ userId, realm = 'UserManager' }) =>
    `http://localhost:8080/auth/admin/realms/${realm}/users/${userId}/role-mappings/realm/available`,
  REALM_ROLES_ASSIGNED: ({ userId, realm = 'UserManager' }) =>
    `http://localhost:8080/auth/admin/realms/${realm}/users/${userId}/role-mappings/realm`,
  CLIENTS: ({ realm = 'UserManager' } = {}) =>
    `http://localhost:8080/auth/admin/realms/${realm}/clients`,
};

export default ENDPOINTS;
