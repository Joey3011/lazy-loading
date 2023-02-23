import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Form } from 'reactstrap'
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from '@mui/material';
import InfiniteScroll from "react-infinite-scroll-component";
import './page.css'
import './formSearch.css'


export const Page = () => {
    const [hasMore, setHasMore] = useState(true)
    const [crypto, setCrypto] = useState(Array.from({ length: 10 })) 
    const [data, fetchedData] = useState([])
    const [search, setSearch] = useState('')

    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/exchange_rates',{       
        }).then(res => {
            setCrypto(res.data.rates)
        })
    },[])
          
    const searchData = (value) => {
        setSearch(value)
        if( search.length > 1){
            const filterData = Object.entries(crypto).filter(item =>{
                return Object.values(item[1].name).join('').toLowerCase().includes(search.toLowerCase()) || Object.values(item[1].unit).join('').toLowerCase().includes(search.toLowerCase())  
            })
            fetchedData(filterData)
        }else{
            fetchedData(crypto.concat(Array.from({ length: 10 })))    
        }
    }
   const fetchMoreData = () => {
    let dataLength = crypto.length
        if (crypto.length <= dataLength) {
            setTimeout(() => {
                setCrypto(crypto.concat(Array.from({ length: 10 })))
              }, 2500);
        }else{
            setHasMore(false)
        }
      };

    if(crypto !== null){
        return (
            <InfiniteScroll
            dataLength={crypto.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h3 className='ms-5'>Loading...</h3>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
                </p>
            }
            >
        <Col className='wrapper'>
            <section className='search-wrapper'>
                <Form id='searchbar' className='search'>
                    <div className='search-box'>
                    <TextField
                        style={{ width:'600px' }}
                        label="Search"
                        id='search'
                        name='search'
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="start">
                                <IconButton>
                                <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                        required
                        onChange={(e) => searchData(e.target.value)}
                        /> 
                    </div>
                </Form>
            </section>
      
                    { data.length === 0 || search.length === 0 ? (
                          Object.entries(crypto).map((crypto, key) => {
                            return(
                            <section key={key}>
                                <div className="data-wrapper show">
                                    <div className="parent-holder col-md-6">
                                        <div className="div"> 
                                           <p>Currency</p>
                                        </div>
                                    </div>
                                    <div className="data-holder col-md-6">
                                        <span id="rate" className="rate">Rate: {key + 1}</span>
                                        <span id="name" className="name">Crypto Name: {crypto[1]?.name}</span>
                                        <span id="unit" className="unit">Crypto Unit: {crypto[1]?.unit}</span>
                                    </div>
                                </div>
                            </section>
                            )
                          })
                    ):(
                        Object.values(data).map((crypto, key) => {
                        return(
                        <section key={key} style={{ display: crypto[0] === undefined ? "none" : "block" }}>
                            <div className="data-wrapper show">
                                <div className="parent-holder col-md-6">
                                    <div className="div"> 
                                       <p>Currency</p>
                                    </div>
                                </div>
                                <div className="data-holder col-md-6">
                                        <span id="rate" className="rate">Rate: rate</span>
                                        <span id="name" className="name">Crypto Name: {crypto[1]?.name}</span>
                                        <span id="unit" className="unit">Crypto Unit: {crypto[1]?.unit}</span>
                                </div>
                            </div>
                        </section>
                        )
                       })
                       )
                     }
               
            </Col>
            </InfiniteScroll>
           )
    }
}

export default Page
