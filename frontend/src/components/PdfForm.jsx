import React, { useState } from 'react';
import axios from 'axios';

const PdfForm = () => {
    const [message, setMessage] = useState('');

    const handleGeneratePdf = async () => {
        try {
            const response = await axios.get('http://localhost:5000/generate-pdf', {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'generated.pdf');
            document.body.appendChild(link);
            link.click();
            setMessage('PDF generated successfully!');
        } catch (error) {
            setMessage('Error generating PDF');
        }
    };

    return (
        <div>
            <h2>Generate PDF</h2>
            <button onClick={handleGeneratePdf}>Generate PDF</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PdfForm;
