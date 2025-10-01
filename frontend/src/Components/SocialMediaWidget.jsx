// src/Components/SocialMediaWidget.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaFacebookF, FaPlay, FaHeart, FaComment, FaShare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMediaWidget = ({ variant = "default" }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const socialMediaLinks = {
    instagram: "https://instagram.com/sultanmabi_market",
    tiktok: "https://tiktok.com/@sultanmabi_market", 
    facebook: "https://facebook.com/sultanmabi",
    x: "https://x.com/sultanmabi"
  };

  // Sample social media content
  const socialContent = [
    {
      platform: "instagram",
      type: "video",
      thumbnail: "/images/social/cooking-tips.jpg",
      title: "Perfect Steak Grilling Tips",
      views: "2.3k",
      likes: "187",
      duration: "0:45"
    },
    {
      platform: "tiktok", 
      type: "video",
      thumbnail: "/images/social/meat-prep.jpg",
      title: "Quick Meat Prep Hacks",
      views: "5.1k",
      likes: "432",
      duration: "0:30"
    },
    {
      platform: "instagram",
      type: "reel",
      thumbnail: "/images/social/recipe-demo.jpg", 
      title: "Beef Wellington Recipe",
      views: "1.8k",
      likes: "156",
      duration: "1:20"
    }
  ];

  const handleVideoPlay = (index) => {
    setActiveVideo(index);
    setIsPlaying(true);
  };

  if (variant === "compact") {
    return (      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
        <h3 className="text-lg font-bold text-[#102542] mb-3">Follow Us</h3>
        <div className="flex gap-2">
          {Object.entries(socialMediaLinks).map(([platform, link]) => (
            <motion.a
              key={platform}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full text-white ${getPlatformColor(platform)}`}
            >
              {getPlatformIcon(platform)}
            </motion.a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#e5e5e5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#A31621] to-[#102542] p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Connect With Us</h3>
        <p className="text-white/90">Fresh content daily from our kitchen to yours</p>
      </div>

      <div className="p-6">
        {/* Featured Video Section */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-[#102542] mb-4">Latest Content</h4>
          <div className="grid gap-3">
            {socialContent.map((content, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleVideoPlay(index)}
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-[#A31621] to-[#102542] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaPlay className="text-white text-lg" />
                  {/* Platform indicator */}
                  <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${getPlatformColor(content.platform)}`}>
                    {getPlatformIcon(content.platform, "text-xs")}
                  </div>
                </div>

                {/* Content Info */}
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-[#102542] truncate">{content.title}</h5>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <FaHeart className="text-red-500" />
                      {content.likes}
                    </span>
                    <span>{content.views} views</span>
                    <span>{content.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Social Media Buttons */}
        <div className="space-y-3">          <motion.a
            href={socialMediaLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <FaInstagram className="text-2xl" />
              <div>
                <div className="font-semibold">Instagram</div>
                <div className="text-sm text-white/80">@sultanmabi_market</div>
              </div>
            </div>
          </motion.a>

          <motion.a
            href={socialMediaLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-between p-4 bg-black text-white rounded-xl hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <FaTiktok className="text-2xl" />
              <div>
                <div className="font-semibold">TikTok</div>
                <div className="text-sm text-white/80">@sultanmabi_market</div>
              </div>
            </div>
          </motion.a>

          <div className="grid grid-cols-2 gap-2">
            <motion.a
              href={socialMediaLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-3 bg-blue-600 text-white rounded-lg hover:shadow-md transition-all"
            >
              <FaFacebookF className="text-lg mb-1" />
              <span className="text-xs">Facebook</span>
            </motion.a>

            <motion.a
              href={socialMediaLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-3 bg-black text-white rounded-lg hover:shadow-md transition-all"
            >
              <FaXTwitter className="text-lg mb-1" />
              <span className="text-xs">X</span>
            </motion.a>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-800 font-medium">
                We're posting fresh content daily!
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors"
            >
              Turn on notifications
            </motion.button>
          </div>
        </div>        {/* Engagement Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-[#A31621]">300+</div>
            <div className="text-xs text-gray-600">Posts</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-[#A31621]">Daily</div>
            <div className="text-xs text-gray-600">Updates</div>
          </div>
        </div>
      </div>

      {/* Video Modal/Player would go here in a real implementation */}
      {activeVideo !== null && isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setActiveVideo(null);
            setIsPlaying(false);
          }}
        >
          <div className="bg-white rounded-lg p-4 max-w-md w-full">
            <h4 className="font-semibold mb-2">{socialContent[activeVideo]?.title}</h4>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Video player would be embedded here</p>
            </div>
            <button
              onClick={() => {
                setActiveVideo(null);
                setIsPlaying(false);
              }}
              className="mt-3 w-full bg-[#A31621] text-white py-2 rounded-lg hover:bg-[#8a1220] transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Helper functions
const getPlatformIcon = (platform, className = "text-lg") => {
  const iconProps = { className };
  
  switch (platform) {
    case "instagram":
      return <FaInstagram {...iconProps} />;
    case "tiktok":
      return <FaTiktok {...iconProps} />;
    case "facebook":
      return <FaFacebookF {...iconProps} />;
    case "x":
      return <FaXTwitter {...iconProps} />;
    default:
      return <FaShare {...iconProps} />;
  }
};

const getPlatformColor = (platform) => {
  switch (platform) {
    case "instagram":
      return "bg-gradient-to-r from-purple-500 to-pink-500";
    case "tiktok":
      return "bg-black";
    case "facebook":
      return "bg-blue-600";
    case "x":
      return "bg-black";
    default:
      return "bg-gray-600";
  }
};

export default SocialMediaWidget;
