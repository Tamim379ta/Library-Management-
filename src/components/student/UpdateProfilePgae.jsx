'use client';

import { useState } from 'react';
import { Input, Button, Chip, Avatar, Card } from '@heroui/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { updateProfile } from '@/lib/action/user';

const UpdateProfilePage = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await updateProfile(user._id, { name });
      if (!res.success) throw new Error(res.error || 'Update failed');
      toast.success('Profile updated!');
      setEditing(false);
      router.refresh();
    } catch (err) {
      toast.error(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f9f5] to-[#e8f3ec] py-12 px-4 flex items-center justify-center">
      <Card className="w-full max-w-xl border border-[#B1D3B9]/40 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden p-8 sm:p-10 flex flex-col gap-8">

        {/* Avatar + name Header Section */}
        <div className="flex flex-col items-center text-center gap-4">
          <Avatar
            name={user?.name}
            src={user?.image || undefined}
            radius="full"
            className="w-24 h-24 text-2xl font-semibold text-white bg-[#659287] shadow-md ring-4 ring-[#E6F2DD]"
          />
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight text-[#2d4f48]">
              {user?.name}
            </h2>
            <Chip
              size="sm"
              variant="flat"
              className="bg-[#E6F2DD] text-[#659287] font-medium px-3"
            >
              {user?.role}
            </Chip>
          </div>
        </div>

        <hr className="border-t border-[#B1D3B9]/30" />

        {/* Info Form Area */}
        <div className="flex flex-col gap-6">
          {/* Full Name Row */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#88BDA4]">
              Full Name
            </span>
            {editing ? (
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="md"
                className="w-full border-[#B1D3B9] hover:border-[#659287] focus-within:border-[#659287] rounded-xl transition-colors"
              />
            ) : (
              <p className="text-base font-medium text-[#2d4f48] bg-[#f9fbf9] px-4 py-2.5 rounded-xl border border-[#B1D3B9]/10">
                {user?.name}
              </p>
            )}
          </div>

          {/* Email Row */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#88BDA4]">
              Email Address
            </span>
            <p className="text-base font-medium text-[#2d4f48] bg-[#f9fbf9] px-4 py-2.5 rounded-xl border border-[#B1D3B9]/10">
              {user?.email}
            </p>
          </div>

          {/* Two-Column Grid for Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#88BDA4]">
                Member Since
              </span>
              <p className="text-sm font-medium text-[#2d4f48] px-1 pt-1">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
              </p>
            </div>

            <div className="flex flex-col gap-2 items-start">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#88BDA4]">
                Email Verified
              </span>
              <Chip
                size="sm"
                variant="dot"
                color={user?.emailVerified ? 'success' : 'warning'}
                className="font-medium px-2.5 mt-0.5"
              >
                {user?.emailVerified ? 'Verified' : 'Not verified'}
              </Chip>
            </div>
          </div>
        </div>

        <hr className="border-t border-[#B1D3B9]/30 mt-2" />

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end items-center">
          {editing ? (
            <>
              <Button
                size="md"
                variant="light"
                onPress={() => { setEditing(false); setName(user?.name || ''); }}
                className="text-[#659287] hover:bg-[#E6F2DD]/50 font-medium px-5 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                size="md"
                isLoading={loading}
                onPress={handleUpdate}
                className="bg-[#659287] text-white font-medium px-6 shadow-sm hover:opacity-95 transition-opacity rounded-xl"
              >
                Save changes
              </Button>
            </>
          ) : (
            <Button
              size="md"
              onPress={() => setEditing(true)}
              className="bg-[#659287] text-white font-medium px-6 shadow-sm hover:opacity-95 transition-opacity rounded-xl"
            >
              Edit profile
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UpdateProfilePage;