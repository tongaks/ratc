'use client'
import styles from './animation.module.css';
import { useEffect, useState } from 'react'
import Image from 'next/image';

type FanObject = {
  ID: string,
  status: boolean,
}

export default function ControlPage() {
  const [fanObjects, setFanObjects] = useState<FanObject[]>([]); 
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
        setFanObjects(prev => [...prev, {ID: doc.ID, status: doc.status}]);
      });
      console.log('Clients retrieved.');

    } else console.log('Error on retrieving clients: ', clientJson.error);
  }

    getClients();
  }, []);

  async function StopFan(event: React.MouseEvent<HTMLDivElement>, fan: FanObject) {
    const parent = event.currentTarget.parentNode;

    const fan_image = parent?.querySelector('img');
    fan_image.id = (fan_image.id == "") ? styles.fan_logo : "";

    const resUpdate = await fetch('/api/update?ID=12343&status=' + ((fan.status == 'ON') ? 'OFF' : 'ON'));
    const output = await resUpdate.text();

    if (output == 'OK') {
     setFanObjects(prev =>
        prev.map(f =>
          f.ID === fan.ID ? { ...f, status: f.status === "ON" ? "OFF" : "ON" } : f
        )
      );
    }

  }

  return (
    <div className="flex justify-center gap-8 p-8">
      {fanObjects.map(fan => (
          <div key={fan.ID} className="text-center w-fit bg-stone-500 rounded-lg shadow-lg p-4">
            <Image id={(fan.status == 'ON') ? styles.fan_logo : ''} alt="fan logo" src="/tl.webp" width={100} height={100} />
            <h1 className="mt-2 font-bold">Fan</h1>
            <div 
              onClick={(e)=>{StopFan(e, fan)}} 
              className="mt-2 cursor-pointer rounded p-2 text-black select-none"
              style={{
                backgroundColor: (fan.status == 'OFF') ? 'lightgreen' : 'red',
              }}
            ><p>{(fan.status == 'OFF') ? 'ON' : 'OFF'}</p>
            </div>

          </div>
    ))}
    </div>
  );
}
