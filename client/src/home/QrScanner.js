import React, { useEffect } from 'react'
import { QrReader } from 'react-qr-reader';
import { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
function QrScanner() {
  const [data, setData] = useState({
    lastName: "",
    gender: "",
    qrId: "",
    id: ""
  });
  const navigate = useNavigate();
  useEffect(() => {
    // setQrData("DDN601F44131")
  }, [])

  const setQrData = async (qrNum) => {
    // let studentQR = dataStudent.qrId;
    // console.log(qrNum.toString() === studentQR.toString())
    //  if(qrNum.toString() === studentQR.toString())
    //     return false;
    const rawResponse = await fetch('https://localhost:5001/api/qrscanner/check-qr', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ qrId: qrNum })
    });
    const newData = await rawResponse.json();
    setData(newData)
    alert("Scanned!")
  }

  const onRegisterQr = () => {
    navigate("register-student");
  }
  return (
    <div className='container'>
      <h1 style={{ textAlign: "center" }}>QR Scanner</h1>
      <div style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
        <div style={{ height: 500, width: 500 }}>
          <QrReader

            onResult={(result, error) => {
              if (!!result) {
                setQrData(result?.text, data);
              }
              if (!!error) {
                // console.info(error);
              }
            }}
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <p style={{ textAlign: "center" }}>Name: {data.lastName}</p>
      <div className='cs-inline jc-center p-15'>
        <Button type='primary'>Scan</Button>
      </div>
      <div className='cs-inline jc-center'>
        <Button type='primary' onClick={onRegisterQr}>Register Qr</Button>
      </div>
    </div>
  )
}

export default QrScanner