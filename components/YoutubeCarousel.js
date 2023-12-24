// components/YouTubeCarousel.js
import React from 'react';

export default function YouTubeCarousel({ paddles }) {
  return (
    <div className="mt-6">
      {paddles.length > 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paddles.map((paddle, index) => (
            <div key={paddle.id} className="p-4 border border-gray-200 rounded">
              <h3 className="text-lg font-semibold mb-2">{paddle.name}</h3>
              {paddle.youtubeLink.map((link, linkIndex) => {
                // Extract video ID from the YouTube link
                const videoId = link.split('v=')[1];

                // Construct the thumbnail URL
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/default.jpg`;

                return (
                  <div key={linkIndex} className="mb-4">
                    <img
                      src={thumbnailUrl}
                      alt={`Thumbnail - ${paddle.name}`}
                      className="mb-2 w-full h-32 object-cover rounded"
                    />
                    <iframe
                      width="100%"
                      height="315"
                      src={link}
                      title={`YouTube Video - ${paddle.name} - ${
                        linkIndex + 1
                      }`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {paddles.map((paddle, index) => (
            <div key={paddle.id} className="p-4 border border-gray-200 rounded">
              <h3 className="text-lg font-semibold mb-2">{paddle.name}</h3>
              {paddle.youtubeLink.map((link, linkIndex) => {
                // Extract video ID from the YouTube link
                const videoId = link.split('v=')[1];

                // Construct the thumbnail URL
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/default.jpg`;

                return (
                  <div key={linkIndex} className="mb-4">
                    <img
                      src={thumbnailUrl}
                      alt={`Thumbnail - ${paddle.name}`}
                      className="mb-2 w-full h-32 object-cover rounded"
                    />
                    <iframe
                      width="100%"
                      height="315"
                      src={link}
                      title={`YouTube Video - ${paddle.name} - ${
                        linkIndex + 1
                      }`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
