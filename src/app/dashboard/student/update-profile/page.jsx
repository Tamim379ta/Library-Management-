import UpdateProfilePage from '@/components/student/UpdateProfilePgae';
import { getProfile } from '@/lib/action/user';
import { getUserSession } from '@/lib/core/session';

const ProfilePage = async () => {
  const session = await getUserSession();
  const user = await getProfile(session?.id);

  return <UpdateProfilePage user={user} />;
};

export default ProfilePage;