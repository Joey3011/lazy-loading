
import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'

export const Data = () => {
    const [crypto, setCrypto] = React.useState([])
    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/exchange_rates',{       
        }).then(res => {
            setCrypto(res.data.rates)
        })
    },[])
    console.log(crypto)
}
export default Data