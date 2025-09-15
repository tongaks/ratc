'use client'
import styles from './animation.module.css';
import { useEffect, useState } from 'react'
import Image from 'next/image';

type FanObject = {
  ID: string,
  Status: boolean,
}

export default function ControlPage() {
  const [fanObjects, setFanObjects] = useState<FanObject[]>([]); 

  // use effect for when the nodemcu 
  // connects to the vercel server via fetch
  // when fetching "connect" api, add new object to an array

  // this for fetching clients in firebase db
  useEffect(()=>{
  }, []);

  async function StopFan(event) {
    const parent = event.currentTarget.parentNode;
    const fan_image = parent?.querySelector('img');
    fan_image.id = (fan_image.id == "") ? styles.fan_logo : "";

    // create an api for updating status of fans
  }

  return (<>

    <div className="flex justify-evenly">
      <div className="text-center w-fit bg-stone-500">
        <Image id={styles.fan_logo} alt="fan logo" src="/tl.webp" width={100} height={100} />
        <h1>Fan 1</h1>
        <div onClick={StopFan} className="p-2 bg-red-400 text-black">Stop fan</div>
      </div>

      <div className="text-center w-fit bg-stone-500">
        <Image id={styles.fan_logo} alt="fan logo" src="/tl.webp" width={100} height={100} />
        <h1>Fan 1</h1>
        <div onClick={StopFan} className="p-2 bg-red-400 text-black">Stop fan</div>
      </div>
    </div>


  </>);
}
