
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