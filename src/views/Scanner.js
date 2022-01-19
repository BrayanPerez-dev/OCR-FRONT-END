import { createRef,useRef,useState,useEffect } from 'react';
import * as BlinkIDSDK from '@microblink/blinkid-in-browser-sdk';
import Swal from 'sweetalert2';
import styled from "styled-components";

const Scanner = () => {
    const refScreenInitial = useRef();
    const refScreenStart = useRef();
    const refStartScan = useRef();

    const [initialMessageEl,setInitialMessageEl] = useState('Cargando')
    const [progressEL,setProgressEl] = useState(0)

    const main = () => {
        if (!BlinkIDSDK.isBrowserSupported()) {
          setInitialMessageEl('Este navegador no es soportado!');
          return;
        }
        let licenseKey = 'sRwAAAYJbG9jYWxob3N0r/lOPk4/w35CpJlWLc09Zs/mjuGYKJq7GjtRvUpB50NLGDbNQfrme34VlyR9wNs/P4L6GtUVgiQ1Rahc34/rXvsi/ca+hsgPa6udsMam5GcIQBblkWcamv/qu2cYWmM8Tm9Uk2PwHy7Jw1jBRoK5tfvZgo7AiNWUmvJoR2JgkyCSH3ZZOZcGiOdOk5O86+LDIRCoLo//ARugB9Wh/3ym5JPQvYCyzyGpkJtlA4HTnRduma2oAT7Qw/XLjVX7t5Js7MeX59oY0pKA9EQUPIKFWYLcQKeKmTVdj1QVf17DBFJgHY3N587WALhyznh5CJTNMeSTgUikTAGvT48SSDonVqFc';
      
        if (window.location.hostname === 'intellityc-scanner-client.herokuapp.com') { licenseKey = 'sRwAAAYnaW50ZWxsaXR5Yy1zY2FubmVyLWNsaWVudC5oZXJva3VhcHAuY29tno8VB0kQaLk87+LdMffE5VPxR8vmgPCVsH9wm1gVENyvWO8SGyFKAiGH91fYN8/1706669mn3fnHHeRKOZwuWVGbY6Rk36i+G56740d1u7+1IxO9xRm+gW0eSjuGISH8QxLhBNuU2vcKw4Yb99eK5zf2YYUxRyhiPgA5K/4jzNKcc6SyaOwy9JfYjCp4OxPhJBcrKc4NxLPZhJdyJgWW4oVCzfvxNbSu894='; }
        const loadSettings = new BlinkIDSDK.WasmSDKLoadSettings(licenseKey);
      
        loadSettings.allowHelloMessage = true;
        loadSettings.loadProgressCallback = (progress) => (setProgressEl(progress));
        loadSettings.engineLocation = window.location.origin;
       
      };
      useEffect(()=>{
        main()

      },[])

  return (
    <Wrapper>
      <div ref={refScreenInitial} id="screen-initial">
        <h1 id="msg" >{initialMessageEl}</h1>
        <progress id="load-progress" value={progressEL} max="100"></progress>
      </div>
      <div   id="screen-start" className="hidden">
        <a className="button" ref={refStartScan} id="start-scan">
          Iniciar Escaneo
        </a>
      </div>
      <div id="screen-scanning" className="hidden">
        <video id="camera-feed" playsInline></video>
        <canvas id="camera-feedback"></canvas>
        <p id="camera-guides">
          Apunte la cámara hacia la parte frontal del documento.
        </p>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
}

html {
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 24px;
  font-family: sans-serif;
}

body {
  display: flex;
  min-height: 100%;
  margin: 0;
  padding: 1.5rem;
  justify-content: center;
  align-items: center;
}

#screen-scanning {
  display: block;
  width: 100%;
  height: 100%;
}

#screen-start{
  display: block;
  justify-content: center;
  text-align: center;
}

/* Rules for better readability */
img {
  display: block;
  width: 100%;
  max-width: 320px;
  height: auto;
}

video {
  width: 100%;
  height: 100%;
}

textarea {
  display: block;
}

/* Camera feedback */
#screen-scanning {
  position: relative;
}

#camera-feedback {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;
}

#camera-guides {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-weight: bold;
}

/* Auxiliary classes */
.hidden {
  display: none !important;
}

  .button{
    background-color: black;
    border-radius: 4em;
    font-size: 16px;
    color: white;
    padding: 0.8em 1.8em;
    cursor:pointer;
    user-select:none;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
  }
  
  .button:hover {
    background-color: #3A3A3A;
  }
`;
export default Scanner;
