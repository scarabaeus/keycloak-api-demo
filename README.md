# KeyCloak Administration API Demo (POC)

Quick and dirty POC for integrating KeyCloak User/Role administration in external apps.

It is possible to integrate KeyCloak's User and Role Mapping functions externally using the KeyCloak Administration API. The following KeyCloak Administration APIs are available to support known user/role management requirements:

**View a list of users**

- *v15*
    - [https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_getusers](https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_getusers)
- *v14*
    - [https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_getusers](https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_getusers)

**Create a user**

- *v15*
    - [https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_createuser](https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_createuser)
- *v14*
    - [https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_createuser](https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_createuser)

**Update a user’s Realm role mapping**

- *v15*
    - Get available Realm Role Mappings not assigned to user
        - [https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_getavailablerealmrolemappings](https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_getavailablerealmrolemappings)
    - Get Realm Role Mappings assigned to user
        - [https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_getrealmrolemappings](https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_getrealmrolemappings)
    - Add/Remove Role Mappings assigned to user
        - [https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_addrealmrolemappings](https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_addrealmrolemappings)
- *v14*
    - Get available Realm Role Mappings not assigned to user
        - [https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_getavailablerealmrolemappings](https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_getavailablerealmrolemappings)
    - Get Realm Role Mappings assigned to user
        - [https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_getrealmrolemappings](https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_getrealmrolemappings)
    - Add/Remove Role Mappings assigned to user
        - [https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_addrealmrolemappings](https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_addrealmrolemappings)

**Delete a user**

- *v15*
    - [https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_deleteuser](https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_deleteuser)
- *v14*
    - [https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_deleteuser](https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_deleteuser)

**Update a user profile**

- *v15*
    - Update Endpoint
        - [https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_updateuser](https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_updateuser)
    - Model
        - [https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_userrepresentation](https://www.keycloak.org/docs-api/5.0/rest-api/index.html#_userrepresentation)
- *v14*
    - Endpoint
        - [https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_updateuser](https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_updateuser)
    - Model
        - [https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_userrepresentation](https://www.keycloak.org/docs-api/14.0/rest-api/index.html#_userrepresentation)

In order to allow user and role administration using the KeyCloak Administration APIs listed above, the managing user must have the following Client Roles assigned for the `realm-management` client with Service Accounts enabled for the Realm:

- `manage-realm`
- `manage-users`
- `query-realms`
- `view-clients`
- `view-realms`
- `view-users`
