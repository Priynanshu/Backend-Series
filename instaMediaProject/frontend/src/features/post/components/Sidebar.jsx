import React from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { usePost } from '../hooks/usePost';
import { follow, unFollow } from '../services/post.api';

const Sidebar = () => {
    const {handleUnFollow, handleFollow} = usePost()
    const { user, setUser } = useAuth()

    if (!user) {
        return <p>Please login</p>;
    }


    return (
        <aside className="sidebar">

            {/* ================= Followers ================= */}
            <div className="sidebar-section">
                <h4>FOLLOWERS ({user.followers?.length || 0})</h4>

                <div className="user-list">
                    {user?.followers?.length > 0 ? (
                        user.followers.map((follower) => (
                            <div className="user-item" key={follower.username}>
                                <div className="user-info">
                                    <img
                                        src={follower.profileImage || "https://via.placeholder.com/40"}
                                        alt="user"
                                    />
                                    <span>{follower.username}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Followers</p>
                    )}
                </div>
            </div>


            {/* ================= Following ================= */}
            <div className="sidebar-section">
                <h4>FOLLOWING ({user.following?.length || 0})</h4>

                <div className="user-list">
                    {user?.following?.length > 0 ? (
                        user.following.map((followee) => (
                            <div className="user-item" key={followee.username}>
                                <div className="user-info">
                                    <img
                                        src={followee.profileImage || "https://via.placeholder.com/40"}
                                        alt="user"
                                    />
                                    <span>{followee.username}</span>
                                </div>

                                {/* 🔥 Unfollow Button */}
                                <button 
                                    className="side-btn unfollow"
                                    onClick={() => handleUnFollow(followee.username)}
                                >
                                    Unfollow
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No Followees</p>
                    )}
                </div>
            </div>


            {/* ================= Others ================= */}
            <div className="sidebar-section">
                <h4>OTHERS ({user.others?.length || 0})</h4>

                <div className="user-list">
                    {user?.others?.length > 0 ? (
                        user.others.map((other) => (
                            <div className="user-item" key={other.username}>
                                <div className="user-info">
                                    <img
                                        src={other.profileImage || "https://via.placeholder.com/40"}
                                        alt="user"
                                    />
                                    <span>{other.username}</span>
                                </div>

                                {/* 🔥 Follow Button */}
                                <button 
                                    className="side-btn follow"
                                    onClick={() => handleFollow(other.username)}
                                >
                                    Follow
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No Others User</p>
                    )}
                </div>
            </div>

        </aside>
    );
};

export default Sidebar;