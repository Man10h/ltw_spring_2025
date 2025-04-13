import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import models from '../../modelData/models'; // Giả sử bạn có model dữ liệu ở đây

const UserList = () => {
  const users = models.userListModel(); // Lấy danh sách người dùng từ model

  return (
    <div>
      
      
      {/* Danh sách người dùng */}
      <List component="nav">
        {users.map((item) => (
          <div key={item._id}>
            <ListItem  component={Link} to={`/users/${item._id}`}>
              <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      
      
    </div>
  );
};

export default UserList;
