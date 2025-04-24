import React, { useEffect, useRef, useState } from "react";
import "./index.css";

export default function App() {
  // Reference for the video element
  const videoRef = useRef(null);

  // State to store intervals of watched video time, loaded from localStorage if available
  const [watchedIntervals, setWatchedIntervals] = useState(() => {
    const saved = localStorage.getItem("watchedIntervals");
    return saved ? JSON.parse(saved) : [];
  });

  // State to store the start time of the current watching interval
  const [currentStart, setCurrentStart] = useState(null);

  // State to store the percentage of the video watched, loaded from localStorage if available
  const [progress, setProgress] = useState(() => {
    return parseFloat(localStorage.getItem("progress")) || 0;
  });

  // State to store the total duration of the video
  const [duration, setDuration] = useState(0);

  // State to store and manage the video playback speed
  const [playbackRate, setPlaybackRate] = useState(1.0);

  // Function to merge overlapping or adjacent intervals into a single interval
  const mergeIntervals = (intervals) => {
    if (intervals.length === 0) return [];
    const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
    const merged = [sorted[0]];
    
    // Iterate through sorted intervals and merge where necessary
    for (let i = 1; i < sorted.length; i++) {
      const last = merged[merged.length - 1];
      const curr = sorted[i];
      if (curr[0] <= last[1]) {
        last[1] = Math.max(last[1], curr[1]); // Merge overlapping intervals
      } else {
        merged.push(curr); // Add non-overlapping interval
      }
    }
    return merged;
  };

  // Function to calculate the watched progress as a percentage
  const calculateProgress = (intervals) => {
    const uniqueSeconds = intervals.reduce(
      (sum, [start, end]) => sum + (end - start),
      0
    );
    return ((uniqueSeconds / duration) * 100).toFixed(2); // Calculate percentage of watched time
  };

  // Function to handle time updates on the video element
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;

    // If it's the start of a new interval, set the start time
    if (currentStart === null) {
      setCurrentStart(currentTime);
    }

    // If video reaches or exceeds the duration, set progress to 100%
    if (currentTime >= duration) {
      setProgress(100);
    }
  };

  // Function to handle pause or video ended events
  const handlePauseOrEnded = () => {
    if (currentStart !== null && videoRef.current) {
      const endTime = videoRef.current.currentTime;

      // Only record intervals if the video has progressed past the start time
      if (endTime > currentStart) {
        const newIntervals = mergeIntervals([...watchedIntervals, [currentStart, endTime]]);
        const newProgress = calculateProgress(newIntervals);

        // Update watched intervals and progress state
        setWatchedIntervals(newIntervals);
        setProgress(newProgress);

        // Save intervals and progress to localStorage for persistence
        localStorage.setItem("watchedIntervals", JSON.stringify(newIntervals));
        localStorage.setItem("progress", newProgress);
        localStorage.setItem("lastPosition", endTime); // Save the last watched position
      }
      
      // Reset the start time for the next interval
      setCurrentStart(null);
    }
  };

  // Function to handle playback rate change
  const handlePlaybackRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);

    // Apply the new playback rate to the video element
    if (videoRef.current) {
      videoRef.current.playbackRate = newRate;
    }
  };

  // useEffect hook to set up event listeners and handle video state management
  useEffect(() => {
    const video = videoRef.current;

    // Event listener to update video duration when metadata is loaded
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("loadedmetadata", updateDuration); // Loaded metadata event
    video.addEventListener("timeupdate", handleTimeUpdate); // Time update event
    video.addEventListener("pause", handlePauseOrEnded); // Pause event
    video.addEventListener("ended", handlePauseOrEnded); // Ended event

    // Resume video from the last watched position, if available
    const lastPosition = parseFloat(localStorage.getItem("lastPosition")) || 0;
    video.currentTime = lastPosition;

    // Clean up event listeners when the component is unmounted
    return () => {
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("pause", handlePauseOrEnded);
      video.removeEventListener("ended", handlePauseOrEnded);
    };
  }, [currentStart, watchedIntervals, duration]);

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">🎓 EduTrack: Intelligent Learning Progress</h1>
      
      <video
        ref={videoRef}
        width="100%"
        controls
        className="rounded-lg shadow mb-4"
        style={{ maxHeight: "600px" }}
      >
        <source src="/PalPalSample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Display the current watched progress as a percentage */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-blue-600 font-medium">
          Watched Progress: {progress}%
        </span>
      </div>
    </div>
  );
}
