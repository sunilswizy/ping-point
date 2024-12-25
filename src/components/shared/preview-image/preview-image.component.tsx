import { Image } from "antd";
import React from "react";

interface PreviewImageProps {
  image: string;
  previewOpen: boolean;
  setPreviewOpen: (previewOpen: boolean) => void;
}

const PreviewImage: React.FC<PreviewImageProps> = ({
  image,
  previewOpen,
  setPreviewOpen,
}) => {
  return (
    <Image
      wrapperStyle={{ display: "none" }}
      preview={{
        visible: previewOpen,
        onVisibleChange: (visible) => setPreviewOpen(visible),
        afterOpenChange: (visible) => !visible,
      }}
      src={image}
    />
  );
};

export default PreviewImage;
