import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import "./Ebooks.css";

const Ebooks = () => {
    const [ebooks, setEbooks] = useState([]);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_EBOOKS_API}/api/ebooks`) // Updated to use environment variable
            .then((res) => setEbooks(res.data))
            .catch((err) => console.error("Error fetching eBooks:", err));
    }, []);

    const handleUpload = async () => {
        if (!title || !file) {
            alert("Please enter a title and choose a file!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);

        try {
            const response = await axios.post(`${process.env.REACT_APP_EBOOKS_API}/api/ebooks/upload`, formData); // Updated to use environment variable
            alert("Ebook uploaded successfully!");
            setEbooks([...ebooks, response.data.ebook]); // Update list with new ebook
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload ebook.");
        }
    };

    return (
        <div className="ebooks-container">
            <h1 className="title">📚 <span>Ebook</span> Templates</h1>
            <p className="subtitle">Explore a collection of randomly generated eBook covers. Upload yours now!</p>

            {/* Upload Section */}
            <div className="upload-section">
                <label className="upload-box">
                    <FiUploadCloud className="upload-icon" />
                    <span>Click to Upload</span>
                    <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
                </label>
                <input type="text" placeholder="Enter eBook Title" value={title} onChange={(e) => setTitle(e.target.value)} className="title-input" />
                <button onClick={handleUpload} className="upload-btn">Upload</button>
            </div>

            {/* Ebooks Display Section */}
            <div className="ebooks-grid">
                {ebooks.map((ebook) => (
                    <div key={ebook.id} className="ebook-card">
                        <img src={ebook.thumbnail} alt={ebook.title} />
                        <h3>{ebook.title}</h3>
                        <div className="ebook-actions">
                            <a href={ebook.fileUrl} target="_blank" className="view-btn">📖 View</a>
                            <a href={ebook.fileUrl} download className="download-btn">📥 Download</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ebooks;