import jwtDecode from "jwt-decode";


export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? 
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? 
      { ...profile, following_count: profile.following_count + 1 }
    : 
      profile;
};

export const unfollowHelper = (profile, clickedProfile) => {
    return profile.id === clickedProfile.id
      ? 
        {
          ...profile,
          followers_count: profile.followers_count - 1,
          following_id: null,
        }
      : profile.is_owner
      ? 
        { ...profile, following_count: profile.following_count - 1 }
      : 
        profile;
  };

  export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
  };
  
  export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp");
  };
  
  export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
  };