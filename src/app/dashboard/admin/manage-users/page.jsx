import { Table, Button, Chip } from '@heroui/react';
import { getAllUser } from '@/lib/api/user';
import React from 'react';
import DeleteUserModal from '@/components/admin/DeleteUserModal';

const ManageUsers = async () => {
  const users = await getAllUser();

  return (
    <div>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Manage users table">
            <Table.Header>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Member Since</Table.Column>
              <Table.Column>Email Verified</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user._id}>
                  <Table.Cell>
                    <span className="font-medium text-[#2d4f48] text-sm">{user.name}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-[#2d4f48]">{user.email}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Chip size="sm" variant="flat" style={{ backgroundColor: '#E6F2DD', color: '#659287' }}>
                      {user.role}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-[#2d4f48]">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="dot"
                      color={user.emailVerified ? 'success' : 'warning'}
                    >
                      {user.emailVerified ? 'Verified' : 'Not verified'}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <DeleteUserModal user={user} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer />
      </Table>
    </div>
  );
};

export default ManageUsers;