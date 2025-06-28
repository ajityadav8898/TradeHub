import React, { useEffect, useState } from "react";
import "./UserEbooks.css";

const UserEbooks = () => {
  const [ebooks, setEbooks] = useState([]);

  useEffect(() => {
    // Fetch ebooks from the backend
    fetch(`${process.env.REACT_APP_EBOOKS_API}/ebooks`) // Updated to use environment variable
      .then((response) => response.json())
      .then((data) => setEbooks(data))
      .catch((error) => console.error("Error fetching ebooks:", error));
  }, []);

  const handleView = (ebookId) => {
    window.open(`${process.env.REACT_APP_EBOOKS_API}/ebooks/${ebookId}/pdf`, "_blank");
  };

  const handleDownload = (ebookId, title) => {
    fetch(`${process.env.REACT_APP_EBOOKS_API}/ebooks/${ebookId}/pdf`, { // Updated to use environment variable
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading PDF:", error));
  };

  return (
    <div className="user-container">
      <h1 className="user-heading">Trading EBooks</h1>
      <div className="ebook-list">
        {ebooks.map((ebook) => (
          <div key={ebook._id} className="user-ebook-card">
            <img src={ebook.thumbnail} alt={ebook.title} className="ebook-img" />
            <h2>{ebook.title}</h2>
            <div className="button-container">
              <button className="view-btn" onClick={() => handleView(ebook._id)}>
                View
              </button>
              <button className="download-btn" onClick={() => handleDownload(ebook._id, ebook.title)}>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserEbooks;