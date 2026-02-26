import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/food",
          { withCredentials: true }
        )

        console.log("API Response:", response.data)

        const foodItems = response.data.foodItems

        // 🔥 SAFETY FIX — ensure array always
        if (Array.isArray(foodItems)) {
          setVideos(foodItems)
        } else if (foodItems) {
          setVideos([foodItems])  // wrap single object into array
        } else {
          setVideos([])
        }

      } catch (error) {
        console.log("Error fetching videos", error)
        setVideos([])
      }
    }

    fetchVideos()
  }, [])

  async function likeVideo(item) {

        const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
        
    }

  async function saveVideo(item) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      )

      setVideos(prev =>
        prev.map(v =>
          v._id === item._id
            ? {
                ...v,
                savesCount: response.data.save
                  ? (v.savesCount || 0) + 1
                  : (v.savesCount || 0) - 1
              }
            : v
        )
      )

    } catch (err) {
      console.log("Save error", err)
    }
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage="No videos available."
    />
  )
}

export default Home