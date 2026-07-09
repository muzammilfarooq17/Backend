import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // 1. useNavigate import karein

const CreatePost = () => {
  const navigate = useNavigate() // 2. hook ko initialize karein
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData()
    formData.append('image', image)
    formData.append('caption', caption)

    try {
      const response = await axios.post('http://localhost:3000/Create-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Success:', response.data);
      alert('Post created successfully! 🎉');

      // --- RESET THE FORM STATE & INPUTS ---
      setImage(null)         
      setCaption('')         
      e.target.reset()       

      // 3. 🟢 AUTOMATIC REDIRECT: Post successfully bante hi user feed par chala jayega
      navigate('/feed')

    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Check backend terminal.');
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        
        <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">Create post</h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          {/* File Input */}
          <div className="flex flex-col">
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-xl file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                cursor-pointer"
            />
          </div>

          {/* Caption Input */}
          <input 
            type="text" 
            name="caption" 
            placeholder="Write a caption..." 
            required 
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 text-sm"
          />

          {/* Buttons Layout */}
          <div className="flex flex-col gap-3 mt-2">
            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-sm transition duration-200"
            >
              Submit
            </button>

            {/* 4. 🟢 GO TO FEED BUTTON (Without submitting) */}
            <button 
              type="button" // type="button" lagana zaroori hai taake form submit na ho
              onClick={() => navigate('/feed')}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-semibold text-sm rounded-xl transition duration-200 text-center"
            >
              Go to Feed ➡️
            </button>
          </div>
          
        </form>
      </div>
    </section>
  )
}

export default CreatePost