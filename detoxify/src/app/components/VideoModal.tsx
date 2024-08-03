import React from 'react';
import { Video } from '@/app/types';  // Ensure this type is defined properly in your project

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-2xl w-full">
        <div className="relative pb-9/16">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.snippet.title}
          ></iframe>
        </div>
        <div className="p-4 text-right">
          <button onClick={onClose} className="text-red-500 hover:text-red-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
