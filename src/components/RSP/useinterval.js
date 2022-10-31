import { useRef, useEffect } from "react";

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if(delay !== null) {
            let id = setInterval(tick, delay);
            return () => {
                return clearInterval(id);
            }
        }
    }, [delay]);

    return savedCallback.current;
}

export default useInterval;