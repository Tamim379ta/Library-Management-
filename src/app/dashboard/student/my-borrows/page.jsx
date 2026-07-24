import { Table, Chip } from '@heroui/react';
import { getBorrowedBooks } from '@/lib/api/borrow';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import DeleteBorrowModal from '@/components/student/DeleteBorrowModal';
import ReturnButton from '@/components/student/ReturnButton';

const MyBorrowBooks = async () => {
  const borrowedBooks = await getBorrowedBooks();
  const user = await getUserSession();
  const userId = user?.id;
  const filteredBooks = borrowedBooks.filter((borrow) => borrow.userId === userId);


  return (
    <div>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Borrowed books table">
            <Table.Header>
              <Table.Column isRowHeader>Title</Table.Column>
              <Table.Column>Borrow Date</Table.Column>
              <Table.Column>Due Date</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {filteredBooks.map((borrow) => (
                <Table.Row key={borrow._id}>
                  <Table.Cell>{borrow.title}</Table.Cell>
                  <Table.Cell>
                    {new Date(borrow.borrowDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(borrow.dueDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Chip
                      color={borrow.status === 'borrowed' ? 'warning' : 'success'}
                      variant="flat"
                      size="sm"
                    >
                      {borrow.status}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      {borrow.status === 'borrowed' && (
                        <ReturnButton borrowId={borrow._id} />
                      )}
                      <DeleteBorrowModal borrow={borrow} />
                    </div>
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

export default MyBorrowBooks;