'use client';

import { useState } from 'react';
import { Button, Input, Label, Modal, Surface, TextField } from '@heroui/react';
import { updateBook } from '@/lib/action/book';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const EditBookModal = ({ book }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    title: book?.title || '',
    author: book?.author || '',
    genre: book?.genre || '',
    publishedYear: book?.publishedYear || '',
    totalQuantity: book?.totalQuantity || '',
    description: book?.description || '',
  });
  const router = useRouter();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await updateBook(book._id, form);
      if (!res.success) throw new Error(res.error || 'Update failed');
      toast.success('Book updated!');
      router.refresh();
      setIsOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to update book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button size="sm" variant="flat" color="primary" onPress={() => setIsOpen(true)}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-lg">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Edit Book</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Update the book details below.
                </p>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <div className="flex flex-col gap-4">
                    <TextField className="w-full" variant="secondary">
                      <Label>Title</Label>
                      <Input value={form.title} onChange={handleChange('title')} placeholder="Book title" />
                    </TextField>
                    <TextField className="w-full" variant="secondary">
                      <Label>Author</Label>
                      <Input value={form.author} onChange={handleChange('author')} placeholder="Author name" />
                    </TextField>
                    <TextField className="w-full" variant="secondary">
                      <Label>Genre</Label>
                      <Input value={form.genre} onChange={handleChange('genre')} placeholder="Genre" />
                    </TextField>
                    <TextField className="w-full" type="number" variant="secondary">
                      <Label>Published Year</Label>
                      <Input value={form.publishedYear} onChange={handleChange('publishedYear')} placeholder="e.g. 1997" />
                    </TextField>
                    <TextField className="w-full" type="number" variant="secondary">
                      <Label>Total Quantity</Label>
                      <Input value={form.totalQuantity} onChange={handleChange('totalQuantity')} placeholder="Total copies" />
                    </TextField>
                    <TextField className="w-full" variant="secondary">
                      <Label>Description</Label>
                      <Input value={form.description} onChange={handleChange('description')} placeholder="Short description" />
                    </TextField>
                  </div>
                </Surface>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onPress={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button isLoading={loading} onPress={handleSave}>
                  Save changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default EditBookModal;