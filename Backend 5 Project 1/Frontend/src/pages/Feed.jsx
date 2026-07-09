import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // 1. useNavigate import karein

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate(); // 2. Hook ko initialize karein

    useEffect(() => {
        axios.get("http://localhost:3000/posts")
        .then((res) => {
            console.log("Data from backend:", res.data);
            const fetchedPosts = Array.isArray(res.data) ? res.data : res.data.posts || [];
            setPosts(fetchedPosts); 
        })
        .catch((err) => {
            console.error("Error fetching data: ", err);
        });
    }, []);

    return (
        <div className="max-w-md mx-auto p-4 space-y-6 min-h-screen bg-gray-50">
            
            {/* 3. 🟢 Header Area with Create Post Button */}
            <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h2 className="text-xl font-bold text-gray-800">Latest Feed</h2>
                
                {/* Create Post Button */}
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl shadow-sm transition duration-200"
                >
                    <span>➕</span> Create Post
                </button>
            </div>
            
            {posts.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No posts available.</p>
            ) : (
                posts.map((post) => (
                    // Card standard container
                    <div key={post._id} className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                        
                        {/* Post Image Container */}
                        <div className="w-full bg-gray-100 flex items-center justify-center min-h-[250px]">
                            <img 
                                src={post.image || post.Image} 
                                alt={post.caption} 
                                className="w-full h-auto object-cover max-h-[400px]"
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = "https://placehold.co/600x400?text=Image+Not+Found";
                                }}
                            />
                        </div>
                        
                        {/* Post Caption/Content Area */}
                        <div className="p-4 bg-white">
                            <p className="text-gray-900 text-sm font-semibold leading-relaxed">
                                {post.caption}
                            </p>
                        </div>
                        
                    </div>
                ))
            )}
        </div>
    );
};

export default Feed;