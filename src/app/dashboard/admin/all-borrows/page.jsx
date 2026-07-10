import { Table } from '@heroui/react';
import { getBorrowedBooks } from '@/lib/api/borrow';
import React from 'react';

const AllBorrowPage = async () => {
  const borrows = await getBorrowedBooks();

  return (
    <div>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="All borrowed books">
            <Table.Header>
              <Table.Column isRowHeader>Title</Table.Column>
              <Table.Column>User ID</Table.Column>
              <Table.Column>Borrow Date</Table.Column>
              <Table.Column>Due Date</Table.Column>
              <Table.Column>Status</Table.Column>
            </Table.Header>
            <Table.Body>
              {borrows.map((borrow) => (
                <Table.Row key={borrow._id}>
                  <Table.Cell>
                    <span className="font-medium text-[#2d4f48] text-sm">{borrow.title}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-[#2d4f48] font-mono">{borrow.userId}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-[#2d4f48]">
                      {new Date(borrow.borrowDate).toLocaleDateString()}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-[#2d4f48]">
                      {new Date(borrow.dueDate).toLocaleDateString()}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: borrow.status === 'borrowed' ? '#FEF3C7' : '#E6F2DD',
                        color: borrow.status === 'borrowed' ? '#92400E' : '#659287',
                      }}
                    >
                      {borrow.status}
                    </span>
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

export default AllBorrowPage;