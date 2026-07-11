'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Input, Button, Chip, Card } from '@heroui/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { updateProfile } from '@/lib/action/user';

const departments = [
  "Computer Science", "Electrical Engineering", "Mechanical Engineering",
  "Civil Engineering", "Business Administration", "Economics", "English",
  "Mathematics", "Physics", "Chemistry", "Law", "Medicine", "Architecture", "Other",
];

const UpdateProfilePage = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [roll, setRoll] = useState(user?.roll || '');
  const [dept, setDept] = useState(user?.dept || '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [image, setImage] = useState(user?.image || '');
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCancel = () => {
    setEditing(false);
    setName(user?.name || '');
    setRoll(user?.roll || '');
    setDept(user?.dept || '');
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: 'POST', body: formData }
      );
      const data = await res.json();
      if (!data.success) throw new Error('Image upload failed');

      setImage(data.data.url);
      setImageError(false);
      toast.success('Image uploaded!');
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setImageUploading(false);
    }
  };

  const handleUpdate = async () => {
    if (!/^\d{6}$/.test(roll)) {
      toast.error('Roll number must be exactly 6 digits');
      setImage(user?.image || '');
      return;
    }
    setLoading(true);
    try {
     const res = await updateProfile(user._id, { name, roll, dept, image });
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

        {/* Avatar + name Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="relative">
            {image && !imageError ? (
              <Image
                src={image}
                alt={user?.name || 'Profile photo'}
                width={96}
                height={96}
                onError={() => setImageError(true)}
                className="w-24 h-24 rounded-full object-cover shadow-md ring-4 ring-[#E6F2DD]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-semibold text-white bg-[#659287] shadow-md ring-4 ring-[#E6F2DD]">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
            {editing && (
              <label
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-opacity hover:opacity-80"
                style={{ background: '#2d4f48' }}
              >
                {imageUploading ? (
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                />
              </label>
            )}
          </div>
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight text-[#2d4f48]">{user?.name}</h2>
            <Chip size="sm" variant="flat" className="bg-[#E6F2DD] text-[#659287] font-medium px-3">
              {user?.role}
            </Chip>
          </div>
        </div>

        <hr className="border-t border-[#B1D3B9]/30" />

        <div className="flex flex-col gap-6">

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#88BDA4]">Full Name</span>
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

          {/* Email — always read only */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#88BDA4]">Email Address</span>
            <p className="text-base font-medium text-[#2d4f48] bg-[#f9fbf9] px-4 py-2.5 rounded-xl border border-[#B1D3B9]/10">
              {user?.email}
            </p>
          </div>

          {/* Roll & Dept */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#88BDA4]">Roll No.</span>
              {editing ? (
                <Input
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  maxLength={6}
                  placeholder="123456"
                  size="md"
                  className="w-full border-[#B1D3B9] hover:border-[#659287] focus-within:border-[#659287] rounded-xl transition-colors"
                />
              ) : (
                <p className="text-base font-medium text-[#2d4f48] bg-[#f9fbf9] px-4 py-2.5 rounded-xl border border-[#B1D3B9]/10">
                  {user?.roll || '—'}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#88BDA4]">Department</span>
              {editing ? (
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none text-[#2d4f48]"
                  style={{ borderColor: '#B1D3B9', backgroundColor: '#fff' }}
                >
                  <option value="">Select dept</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              ) : (
                <p className="text-base font-medium text-[#2d4f48] bg-[#f9fbf9] px-4 py-2.5 rounded-xl border border-[#B1D3B9]/10">
                  {user?.dept || '—'}
                </p>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#88BDA4]">Member Since</span>
              <p className="text-sm font-medium text-[#2d4f48] px-1 pt-1">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
              </p>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#88BDA4]">Email Verified</span>
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
                onPress={handleCancel}
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