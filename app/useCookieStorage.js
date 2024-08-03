
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const cookieStorageKey = 'game-storage-key';

const useCookieStorage = () => {

    const [loading, setLoading] = useState(true);
    const [cookies, setCookie] = useCookies([cookieStorageKey]);

    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 1000);
    }, []);


    const save = (data) => {
        const content = JSON.stringify(data);
        setCookie(cookieStorageKey, content);
    }

    const retrieve = () => cookies[cookieStorageKey] ?? {};

    return {
        loading,
        retrieve,
        save,
    }
}

export default useCookieStorage;