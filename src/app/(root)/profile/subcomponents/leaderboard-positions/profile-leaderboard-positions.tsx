import React from 'react'
import { ProfileLeaderboardPosition } from './profile-leaderboard-position'

export const ProfileLeaderboardPositions = () => {
  return (
    <div className='flex gap-4'>
      {[0, 1, 2].map((elem, index) => (
        <ProfileLeaderboardPosition key={index} />
      ))}
    </div>
  )
}
