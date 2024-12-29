import React, { useState } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  const generateQRCode = async () => {
    if (!url) {
      setError('Enter the URL');
      setTimeout(() => setError(''), 5000);
      return;
    }

    try {
      const qrCodeData = await QRCode.toDataURL(url);
      setQrCode(qrCodeData);
    } catch {
      setQrCode('Invalid URL');
    }
  };

  const clearQRCode = () => {
    setUrl('');
    setQrCode('');
  };

  return (
    <div className="qr-generator">
      <input
        type="url"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && generateQRCode()}
        className="url-input"
      />
      <div>
        <button onClick={generateQRCode}>Generate</button>
        <button onClick={clearQRCode}>Clear</button>
        {qrCode && (
          <button>
            <a download="qrCode.png" href={qrCode} className="w-full">
              Download
            </a>
          </button>
        )}
      </div>
      {error && <div className="mt-2 mb-1">{error}</div>}
      {qrCode && qrCode !== 'Invalid URL' ? (
        <img src={qrCode} alt="qr-code" />
      ) : qrCode === 'Invalid URL' ? (
        <div className="mt-2 mb-1">Invalid URL provided</div>
      ) : null}
    </div>
  );
};

export default QRCodeGenerator;
