import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allUsers, deleteUser } from '../../modules/users';
import RenderOnRole from '../../components/RenderOnRole';

const UserList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);

  useEffect(() => {
    dispatch(allUsers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <RenderOnRole roles={['user-list']}>
      <div style={{ marginTop: '1rem' }}>
        <div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 190, 0.1)',
            }}
          >
            <div style={{ flex: 1 }}>Users</div>
            <RenderOnRole roles={['user-create']}>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <button onClick={() => null}>Create User</button>
              </div>
            </RenderOnRole>
          </div>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Name</th>
                <th style={{ textAlign: 'left' }}>User Name</th>
                <th style={{ textAlign: 'left' }}>Email Verified</th>
                <th style={{ textAlign: 'left' }}>Enabled</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>
                      {user.firstName} {user.lastName}
                    </Link>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.emailVerified ? 'Yes' : 'No'}</td>
                  <td>{user.enabled ? 'Yes' : 'No'}</td>
                  <td style={{ textAlign: 'right' }}>
                    <RenderOnRole roles={['user-delete']}>
                      <button onClick={() => dispatch(deleteUser(user))}>
                        Delete User
                      </button>
                    </RenderOnRole>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RenderOnRole>
  );
};

export default UserList;
