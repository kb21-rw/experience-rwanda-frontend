"use client"
import React, { useEffect, useState } from 'react'
import HeaderContent from './HeaderContent'
import { HeaderProps } from '@/app/types/Header.types';



const Header = () => {
    const [headerData, setHeaderData] = useState<HeaderProps>({title:"", description:""});

    useEffect(()=>{
        fetch("/data/header.json")
        .then(response=> response.json())
        .then(data=> setHeaderData(data));
    }, []);
  return (
    <section className='px-20'>
        <HeaderContent title={headerData.title} description={headerData.description}/>
    </section>
  )
}

export default Header