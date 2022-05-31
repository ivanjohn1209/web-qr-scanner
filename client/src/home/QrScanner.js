import React, { useContext, useEffect } from 'react'
import { QrReader } from 'react-qr-reader';
import { useState } from 'react';
import { Button, Layout, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { StudentService } from '../service/StudentService';
import { IsEmpty } from '../utility/ToolFtc';
const { Header, Sider, Content } = Layout;

function QrScanner() {
  const [data, setData] = useState(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    // setQrData("DDN601F44131")
  }, [])

  const setQrData = async (qrNum) => {
    // try {
    //   const rawResponse = await fetch('https://localhost:5001/api/qrscanner/check-qr', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ qrId: qrNum })
    //   });
    //   const newData = await rawResponse.json();
    //   setData(newData)
    // } catch (error) {
    //   setData(null)
    // }
    StudentService.checkStudentQR(qrNum)
      .then(res => {
        console.log(res)
      })
      .catch((ex) => {
        console.log(ex)
        notification.error({
          message: "Error Scanning!",
          description: ex.msg,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        })
      })
  }

  return (
    <>
      <Header>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 style={{ textAlign: "center", color: "white", margin: 0 }}>Domp QR Scanner</h4>
          <Button type="primary" style={{ float: "right" }} onClick={() => userContext.removeLoginData()}>Logout</Button>
        </div>
      </Header>
      <div className='container'>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
            <div style={{ height: 500, width: 500 }}>
              <QrReader

                onResult={(result, error) => {
                  if (!!result && result?.text) {
                    setQrData(result?.text);
                  }
                  if (!!error) {
                    // console.info(error);
                  }
                }}
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <div>
            {
              !IsEmpty(data) && <>
                <p style={{ textAlign: "center" }}>Name: {data.lastName}</p>
                <div className='cs-inline jc-center p-15'>
                  <Button type='primary' size='large' onClick={() => setQrData(null)}>Next</Button>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </>

  )
}

export default QrScanner