import React from "react";
import { UserCard } from "./subcomponents/user-card";
import { ProfileLeaderboardPositions } from "./subcomponents/leaderboard-positions/profile-leaderboard-positions";
import { ProfileWpmHistory } from "./subcomponents/profile-wpm-history";

const Profile = () => {
  return (
    <div className="sm:container">
      <div className="bg-muted/30 rounded-xl px-8 py-8 flex flex-col gap-8">
        <div className="flex justify-between gap-8">
          <UserCard />
          <ProfileLeaderboardPositions />
        </div>
        <div className="flex gap-8">
          <ProfileWpmHistory />
        </div>
      </div>
    </div>
  );
};

export default Profile;
