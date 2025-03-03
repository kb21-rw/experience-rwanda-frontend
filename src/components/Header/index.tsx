"use client"
import React from 'react'
import HeaderContent from './HeaderContent'
// import { HeaderProps } from '@/app/types/Header.types';
import { aboutUsData } from '../../../public/data/header';



const Header = () => {
    // const [headerData, setHeaderData] = useState<HeaderProps>({title:"", description:""});

    // useEffect(()=>{
    //     fetch("/data/header.json")
    //     .then(response=> response.json())
    //     .then(data=> setHeaderData(data));
    // }, []);
    const {title, description} = aboutUsData
  return (
    <section className='px-20'>
        <HeaderContent title={title} description={description}/>
    </section>
  )
}

export default Header