import React, { useEffect, useState } from "react";
import "./AdminEbooks.css";

const AdminEbooks = () => {
  const [ebooks, setEbooks] = useState([]);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(""); // Changed to string for URL
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    // Fetch ebooks from the backend
    fetch(`${process.env.REACT_APP_EBOOKS_API}/ebooks`) // Updated to use environment variable
      .then((response) => response.json())
      .then((data) => setEbooks(data))
      .catch((error) => console.error("Error fetching ebooks:", error));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !thumbnail || !pdf) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("thumbnail", thumbnail); // Send as URL string
    formData.append("pdf", pdf);

    try {
      const response = await fetch(`${process.env.REACT_APP_EBOOKS_API}/ebooks/upload`, { // Updated to use environment variable
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setEbooks([...ebooks, data.ebook]);
        setTitle("");
        setThumbnail(""); // Reset to empty string
        setPdf(null);
        alert("Ebook uploaded successfully!");
      } else {
        alert("Failed to upload ebook.");
      }
    } catch (error) {
      console.error("Error uploading ebook:", error);
      alert("Error uploading ebook.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ebook?")) {
      try {
        const response = await fetch(`${process.env.REACT_APP_EBOOKS_API}/ebooks/${id}`, { // Updated to use environment variable
          method: "DELETE",
        });

        if (response.ok) {
          setEbooks(ebooks.filter((ebook) => ebook._id !== id));
          alert("Ebook deleted successfully!");
        } else {
          alert("Failed to delete ebook.");
        }
      } catch (error) {
        console.error("Error deleting ebook:", error);
        alert("Error deleting ebook.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-heading">Admin Panel - Manage Ebooks</h1>
      <div className="upload-section">
        <input
          type="text"
          placeholder="Ebook Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Thumbnail Image URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)} // Changed to text input for URL
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
        />
        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
      <div className="ebook-list">
        {ebooks.map((ebook) => (
          <div key={ebook._id} className="admin-ebook-card">
            <img src={ebook.thumbnail} alt={ebook.title} className="ebook-img" /> {/* Use URL directly */}
            <h2>{ebook.title}</h2>
            <button className="delete-btn" onClick={() => handleDelete(ebook._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEbooks;