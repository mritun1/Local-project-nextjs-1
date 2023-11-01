"use client"
import React, { useState } from 'react'

const page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleFileUpload = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedFile){
            const formData = new FormData();
            formData.set("file",selectedFile)
            try {
                const response = await fetch('/api/test/', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    // Handle a successful upload
                    console.log('File uploaded successfully');
                } else {
                    // Handle an upload error
                    console.error('File upload failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
  return (
    <>
          <div>
              <h1>Upload a File</h1>
              <form onSubmit={handleFileUpload} method="post">
                  <input type="file" name="file" onChange={handleFileChange} />
                  <button>Upload</button>
              </form>
          </div>
    </>
  )
}

export default page