import  { useState } from 'react'
const CreatePost = () => {
  // 1. Setup state to hold the form data
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')

  // 2. Handle what happens when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault() // Prevents the browser from reloading the page

    // Create a FormData object to handle files easily
    const formData = new FormData()
    formData.append('image', image)
    formData.append('caption', caption)

    // For testing: Check your browser console to see if it grabs the data
    console.log('Caption:', caption)
    console.log('Selected File:', image)

    // TODO: Send your formData to the backend using axios/fetch here
    // e.g., axios.post('/api/posts', formData)

    // --- RESET THE FORM STATE & INPUTS HERE ---
    setImage(null)         // Empties image state
    setCaption('')         // Empties caption state
    e.target.reset()       // Hard clears the HTML file picker input text from the screen
  }

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        
        {/* Heading */}
        <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">Create post</h1>

        {/* Form - hooked to handleSubmit */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          {/* File Input */}
          <div className="flex flex-col">
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              // Update state when a file is chosen
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
            // Update state when user types
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200 text-sm"
          />

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-sm transition duration-200 mt-2"
          >
            Submit
          </button>
          
        </form>
      </div>
    </section>
  )
}

export default CreatePost