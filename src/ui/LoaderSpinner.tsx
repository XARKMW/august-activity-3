import {ring} from 'ldrs'
import React from "react";
ring.register()



const LoaderSpinnerModal:React.FC = ()=>{

    return (
            <div className={'flex justify-center items-center h-full w-full'}>
                <l-ring
                    size="60"
                    stroke="5"
                    speed="2"
                    color="#A8A29E"
                ></l-ring>
            </div>
    );
}

export default LoaderSpinnerModal;