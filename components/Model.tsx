import { Suspense } from 'react';
import Spline from '@splinetool/react-spline/next';

const Model = ({ setIsLoaded }: {setIsLoaded: (value: boolean) => void;}) => {
    return (
        <div className="fixed w-[100dvw] h-[100dvh] z-0">
            <Suspense fallback={false}>
                <Spline scene="/scene.splinecode"  onLoad={() => { setIsLoaded && setIsLoaded(true) }} />
            </Suspense>
        </div>
    )
}

export default Model
