import React, { useState } from 'react';
import '../components/Uploader.css';

// @ts-ignore
import SimpleFileUpload from 'react-simple-file-upload';

const Uploader: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  function handleFile(url: string) {
    console.log('The URL of the file is ' + url);

    setUploadedFile(url);
  }

  return (
    <div className='upload-form'>
      <header className='upload-title'>
        <h2>Upload your best photo</h2>
      </header>
      <div className='upload-wrapper'>
        <SimpleFileUpload
          apiKey='96791e75c8d52ce4723813baa04d0d6b' //todo move this in env file
          onSuccess={handleFile}
          preview={false}
        />
      </div>
    </div>
  );
};

export default Uploader;
