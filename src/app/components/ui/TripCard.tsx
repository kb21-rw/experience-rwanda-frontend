import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link';

type Props = {
    image: string | StaticImageData
    location: string;
    price: string;
    date: Date
}

export default function TripCard({image, location, price, date}: Props) {
  return (
    <div className='flex flex-col bg-white p-2 rounded-3xl gap-4'>
    <Image src={image} alt={location} width={370} height={260} />
    <div className='flex flex-col gap-2 justify-start p-5'>
      <h3 className='font-bold'>Place: {location}</h3>
      <p>Price: {price}$/day</p>
      <p>Date: {date.toLocaleDateString()}</p>
      <Link href={'#'} className='border border-black w-2/4 py-2 text-center rounded-lg'>More Details</Link>
      <button className='bg-black text-white rounded-full py-3 w-3/4'>Book Now</button>
    </div>
    </div>
  )
}