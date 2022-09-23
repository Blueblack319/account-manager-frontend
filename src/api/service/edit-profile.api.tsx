import { CoreResponse } from '../../utils/types/common.interface';
interface EditProfileResponse extends CoreResponse {}

const editProfile = async (
  name: string,
  email: string
): Promise<EditProfileResponse> => {
  try {
    const data = JSON.stringify({ name, email });
    const response = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    if (response && response.status === 200) {
      const responseData = await response.json();
      if (responseData) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'Response data not found',
        };
      }
    }
    return {
      ok: false,
      error: 'Fetch api failed',
    };
  } catch (e: Error | any) {
    return {
      ok: false,
      error: e.message || 'Edit an user failed',
    };
  }
};

export default editProfile;
