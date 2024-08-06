'use client';

import React from 'react';
import ReactPlayer from 'react-player/youtube';

interface VideoModalProps {
  videoId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoId, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black rounded-lg p-4 w-full max-w-3xl">
        <button className="float-right" onClick={onClose}>Close</button>
        {videoId && <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} playing controls width="100%" />}
      </div>
    </div>
  );
};

export default VideoModal;
