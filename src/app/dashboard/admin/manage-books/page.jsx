import { Table, Button, Chip } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import EditBookModal from '@/components/admin/EditBookModal ';
import DeleteBookModal from '@/components/admin/DeleteBookModal';
import { manageBooks } from '@/lib/api/book';

const ManageBooks = async () => {
  const books = await manageBooks();

  return (
    <div>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Manage books table">
            <Table.Header>
              <Table.Column isRowHeader>Book</Table.Column>
              <Table.Column>Author</Table.Column>
              <Table.Column>Genre</Table.Column>
              <Table.Column>Year</Table.Column>
              <Table.Column>Copies</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {books.map((book) => (
                <Table.Row key={book._id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        width={36}
                        height={48}
                        className="rounded object-cover"
                      />
                      <span className="font-medium text-[#2d4f48] text-sm">{book.title}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-[#2d4f48]">{book.author}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Chip size="sm" variant="flat" style={{ backgroundColor: '#E6F2DD', color: '#659287' }}>
                      {book.genre}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-[#2d4f48]">{book.publishedYear}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-[#2d4f48]">
                      {book.availableQuantity} / {book.totalQuantity}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <EditBookModal book={book} />
                      <DeleteBookModal book={book} />
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

export default ManageBooks;