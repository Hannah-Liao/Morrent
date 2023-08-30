import { Dispatch, SetStateAction } from 'react';

import { close } from '../../assets/icons';

type ImageDisplayProps = {
  existImages: Array<string> | [];
  setExistImages: Dispatch<SetStateAction<Array<string>>>;
  selectedImages: Array<string> | [];
  setSelectedImages: Dispatch<SetStateAction<Array<string>>>;
};

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  existImages,
  setExistImages,
  selectedImages,
  setSelectedImages,
}) => {
  const editedImages = [...existImages];
  const displayImages =
    selectedImages.length > 0 ? selectedImages : existImages;

  return (
    <div className='flex gap-3 mb-3'>
      {displayImages.map((image, i) => (
        <div key={i} className='relative '>
          <img src={image} alt='user images' className='w-24 h-24 rounded-md' />
          <button
            className='absolute top-[-10px] right-[-8px] border-gray-500  border-2 rounded-full'
            onClick={() => {
              const index = editedImages.indexOf(image);
              editedImages.splice(index, 1);
              setExistImages([...editedImages]);
              setSelectedImages(selectedImages.filter((e) => e !== image));
            }}
          >
            <img src={close} alt='delete image icon' className='p-1' />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;
