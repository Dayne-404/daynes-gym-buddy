import videoPlaceholder from "@/assets/video-placeholder.svg";

interface ContentContainerProps {
  mediaUrl?: string;
}

const VIDEO_EXTENSIONS = /\.(mp4|webm|ogg)$/i;

const ContentContainer = ({ mediaUrl }: ContentContainerProps) => {
  return (
    <div className="relative w-full rounded-xl overflow-hidden aspect-video flex items-center justify-center cursor-pointer">
      {mediaUrl ? (
        VIDEO_EXTENSIONS.test(mediaUrl) ? (
          <video
            src={mediaUrl}
            controls
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src={mediaUrl}
            alt="Exercise media"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )
      ) : (
        <img
          src={videoPlaceholder}
          alt="No media"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default ContentContainer;
