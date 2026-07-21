import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

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

    // 🔴 Delete Handler Function
    const handleDelete = async (id) => {
        if (window.confirm("Delete Permenantly?")) {
            try {
                await axios.delete(`http://localhost:3000/post/${id}`);
                
                // State se deleted post ko filter out kar dein taake page reload na karna pare
                setPosts(posts.filter(post => post._id !== id));
                alert("Post successfully delete ho gayi!");
            } catch (err) {
                console.error("Delete karne me error aaya:", err);
                alert("Post delete nahi ho saki. Dobara koshish karein.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 space-y-6 min-h-screen bg-gray-50">
            
            {/* Header Area with Create Post Button */}
            <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h2 className="text-xl font-bold text-gray-800">Latest Feed</h2>
                
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
                        
                        {/* Post Caption & Delete Button Area */}
                        <div className="p-4 bg-white flex items-start justify-between gap-4">
                            <p className="text-gray-900 text-sm font-semibold leading-relaxed flex-1">
                                {post.caption}
                            </p>
                            
                            {/* 🔴 🟢 FIX: Delete Button */}
                            <button
                                onClick={() => handleDelete(post._id)}
                                className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition duration-200"
                                title="Delete Post"
                            >
                                🗑️
                            </button>
                        </div>
                        
                    </div>
                ))
            )}
        </div>
    );
};

export default Feed;