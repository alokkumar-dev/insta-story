import React, { useEffect, useState } from "react";
import { fetchStories } from "../services/storyService";
import StoryViewer from "./StoryViewer";
import "../App.css";

type Story = {
  id: number;
  userProfile: string;
};

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<number | null>(null);
  const [viewedStories, setViewedStories] = useState<Set<number>>(new Set());

  useEffect(() => {
    const data: any = fetchStories();
    if (data.length > 0) setStories(data);
  }, []);

  const handleStoryClick = (index: number) => {
    setViewedStories((prev) => new Set(prev).add(index));
    setCurrentStory(index);
  };

  return (
    <div className="stories-container scrollbar-hide">
      {stories.map((story, index) => (
        <img
          key={index}
          src={story.userProfile}
          className={`story-item ${viewedStories.has(index) ? "viewed" : ""}`}
          onClick={() => handleStoryClick(index)}
          alt="Story"
        />
      ))}

      {currentStory !== null && (
        <StoryViewer
          stories={stories}
          currentIndex={currentStory}
          onClose={() => setCurrentStory(null)}
        />
      )}
    </div>
  );
};

export default Stories;
