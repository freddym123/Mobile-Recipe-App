import React from "react";
import { useEffect, useState } from "react"
import key from "./key";

const useFetch = (searchVal)=>{
    const [data, setData] = useState(searchVal)

    useEffect(()=>{
        const interval = setTimeout(()=>{
            setData(searchVal)
        },500)
        return clearTimeout(interval)
    }, [searchVal])

    return data
}

export default useFetch