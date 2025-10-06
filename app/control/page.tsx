'use client'
import styles from './animation.module.css';
import { useEffect, useState } from 'react'
import Image from 'next/image';

type ClientObject = {
  ID: string,
  status: boolean,
  type: string,
}

export default function ControlPage() {
  const [fanObjects, setFanObjects] = useState<ClientObject[]>([]); 
  const [computerObjects, setComputerObjects] = useState<ClientObject[]>([]); 
  const [currentStatus, setCurrentStatus] = useState('');

  // use effect for when the nodemcu 
  // connects to the vercel server via fetch
  // when fetching "connect" api, add new object to an array

  // this for fetching clients in firebase db
  useEffect(()=>{
    const getClients = async ()=> {
      const resUpdate = await fetch('/api/get_client');
      const clientJson = await resUpdate.json();

      if (!clientJson.error) {

        clientJson.forEach(doc => {

          // seperate "fan" from "computers"
          console.log("client: " + doc.ID +" is connected: " + doc.connected);

          if (doc.type == "fan" && doc.connected) {
            setFanObjects(prev => [...prev, {ID: doc.ID, status: doc.status, type: doc.type}]);
          } else {
            if (doc.connected) {
              console.log(doc.type);
              setComputerObjects(prev => [...prev, {ID: doc.ID, status: doc.status, type: doc.type}]);
            }
          }

        });
        console.log('Clients retrieved.');

      } else console.log('Error on retrieving clients: ', clientJson.error);
    }

    getClients();
  }, []);

  async function StopFan(event: React.MouseEvent<HTMLDivElement>, fan: ClientObject) {
    // get the fan object icon 
    const parent = event.currentTarget.parentNode;
    const fan_image = parent?.querySelector('img');
    fan_image.className = (fan_image.className == "") ? styles.fan_logo : "";

    const resUpdate = await fetch('/api/update?ID=' + fan.ID + '&status=' + ((fan.status == 'ON') ? 'OFF' : 'ON'));
    const output = await resUpdate.text();

    if (output == 'OK') {
     setFanObjects(prev =>
        prev.map(f =>
          f.ID === fan.ID ? { ...f, status: f.status === "ON" ? "OFF" : "ON" } : f
        )
      );
    }
  }

  // sd = shutdown
  // rt = restart 
  // lc = lock

  async function HandlePowerButtons(cmd: string, id: ClientObject) {
    const resUpdate = await fetch('/api/update?ID=' + id.ID + '&status=' + cmd);
    const output = await resUpdate.text();
    console.log("result from HandlePowerButtons: " + output);
  }    

  return (
<div className="flex justify-center gap-12 p-8 flex-wrap">

  {/* Fans Section */}
  <div className="bg-stone-700 p-6 rounded-2xl shadow-xl min-w-[400px] min-h-[400px] w-fit h-fit">
    <h2 className="text-center text-white text-xl font-bold mb-4">Fans</h2>

    {(!fanObjects || fanObjects.length === 0) ? (
      <div className="flex items-center justify-center h-[300px]">
        <h1 className="text-white text-center">No connected device</h1>
      </div>
    ) : (
      <div className="flex flex-wrap justify-center gap-4">
        {fanObjects.map(fan => (
          <div key={fan.ID} id={fan.ID} className="text-center w-fit bg-stone-500 rounded-lg shadow-lg p-4">
            <Image className={fan.status === 'ON' ? styles.fan_logo : ''} alt="fan logo" src="/tl.webp" width={100} height={100} />
            <h1 className="mt-2 font-bold text-white">Fan</h1>
            <div onClick={(e) => { StopFan(e, fan); }}
              className="mt-2 cursor-pointer rounded p-2 text-black select-none"
              style={{
                backgroundColor: (fan.status === 'OFF') ? 'lightgreen' : 'red',
              }} >
              <p>{(fan.status === 'OFF') ? 'ON' : 'OFF'}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Computers Section */}
  <div className="bg-stone-700 p-6 rounded-2xl shadow-xl min-w-[400px] min-h-[400px] w-fit h-fit">
    <h2 className="text-center text-white text-xl font-bold mb-4">Computers</h2>

    {(!computerObjects || computerObjects.length === 0) ? (
      <div className="flex items-center justify-center h-[300px]">
        <h1 className="text-white text-center">No connected device</h1>
      </div>
    ) : (
      <div className="flex flex-wrap justify-center gap-4">
        {computerObjects.map(computer => (
          <div key={computer.ID}
            className="bg-stone-500 p-4 w-[135px] rounded-lg text-center shadow-lg" >
            <Image src="/computer-icon.png" alt="computer logo" width={100} height={100} />
            <p id="computer_status" className="text-white mt-1">{computer.status}</p>

            <div onClick={(e) => { HandlePowerButtons("sd", computer); }}
              className="text-center bg-red-500 p-2 cursor-pointer rounded select-none mt-2" >
              Shutdown
            </div>

            <div onClick={(e) => { HandlePowerButtons("rs", computer); }}
            className="text-center bg-orange-400 p-2 cursor-pointer rounded select-none mt-2">
              Restart
            </div>

            <div onClick={(e) => { HandlePowerButtons("lk", computer); }}
            className="text-center bg-blue-400 p-2 cursor-pointer rounded select-none mt-2" >
              Lock
            </div>

          </div>
        ))}
      </div>
    )}
  </div>

</div>

  );
}
