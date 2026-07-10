'use client';

import React, { useState } from 'react';
import { Button, Modal } from '@heroui/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { deleteBook } from '@/lib/action/book';

export default function DeleteBookModal({ book }) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await deleteBook(book?._id);
      if (!res?.success) {
        throw new Error(res?.error || res?.message || 'Failed to delete');
      }

      toast.success(`"${book?.title}" deleted successfully`);
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button size="sm" variant="flat" color="danger" onPress={() => setIsOpen(true)}>
        Delete
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[380px]">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading className="text-xl font-bold text-danger">
                Delete Book
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <p className="text-sm text-default-500">
                Are you sure you want to delete <span className="font-semibold text-foreground">{book?.title}</span>? This action cannot be undone.
              </p>
            </Modal.Body>

            <Modal.Footer className="flex gap-2">
              <Button
                variant="light"
                className="flex-1"
                disabled={loading}
                onPress={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                className="flex-1"
                isLoading={loading}
                onPress={handleDelete}
              >
                Confirm Delete
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}