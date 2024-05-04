import React, { useCallback, useEffect, useState } from 'react'

const sendHttpRequest = async (url, config) => {
    const response = await fetch(url, config);

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(
            resData.message || "Something went wrong, failed to send request"
        );
    }
    return resData;
}

const useHttp = (url, config, initialData) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState()
    
    const clearData = () => {
        setData(initialData)
    }

    const sendRequest = useCallback(
        async function sendRequest(data) {
            setisLoading(true)
            try {
                const resData = await sendHttpRequest(url, {...config, body: data});
                setData(resData)
            } catch (error) {
                setError(error.message || 'Something Went wrong')
            }
            setisLoading(false)
        },
        [url, config]
    )
    useEffect(() => {
        if (config && (config.method === "GET" || !config.method) || !config) {
            sendRequest();
        }
    }, [sendRequest, config])


    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}

export default useHttp
