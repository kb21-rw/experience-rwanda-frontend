"use client";

import { ReactElement, useState, useRef } from "react";
import { InfoCard as InfoCardType } from "@/types/ImageCard";
import InfoCard from "./InfoCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface InfoCardGridProps {
	cards: InfoCardType[];
	title?: string;
	description?: string;
	className?: string;
}

const InfoCardGrid = ({ 
	cards, 
	title = "Discover Rwanda's Highlights",
	description = "Explore the unique features and experiences that make Rwanda a must-visit destination",
	className 
}: InfoCardGridProps): ReactElement => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const swiperRef = useRef<SwiperRef>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSlideChange = (swiper: { activeIndex: number }) => {
    setCurrentIndex(swiper.activeIndex);
  };

	const scrollToIndex = (index: number) => {
		setCurrentIndex(index);
		if (scrollContainerRef.current) {
			const cardWidth = scrollContainerRef.current.scrollWidth / cards.length;
			scrollContainerRef.current.scrollTo({
				left: index * cardWidth,
				behavior: 'smooth'
			});
		}
	};

	const nextSlide = () => {
		const nextIndex = (currentIndex + 1) % cards.length;
		scrollToIndex(nextIndex);
	};

	const prevSlide = () => {
		const prevIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
		scrollToIndex(prevIndex);
	};

	return (
		<section className={`py-16 ${className || ""}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						{title}
					</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">
						{description}
					</p>
				</div>

				<div className="hidden md:block relative">
					<div 
						ref={scrollContainerRef}
						className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth items-stretch"
						style={{ 
							scrollSnapType: 'x mandatory',
							scrollBehavior: 'smooth'
						}}
					>
						{cards.map((card, index) => (
							<div 
								key={card.id} 
								className="flex-shrink-0 w-80 transform transition-all duration-500 ease-in-out"
								style={{ 
									scrollSnapAlign: 'start',
									transform: `translateX(${(index - currentIndex) * 20}px)`,
									opacity: Math.abs(index - currentIndex) <= 1 ? 1 : 0.7
								}}
							>
								<InfoCard card={card} />
							</div>
						))}
					</div>
					
					<button
						onClick={prevSlide}
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 z-10 hover:scale-110 hover:shadow-xl"
						aria-label="Previous slide"
					>
						<ChevronLeft className="w-6 h-6 text-gray-700" />
					</button>
					<button
						onClick={nextSlide}
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 z-10 hover:scale-110 hover:shadow-xl"
						aria-label="Next slide"
					>
						<ChevronRight className="w-6 h-6 text-gray-700" />
					</button>
				</div>

				<div className="md:hidden" style={{ backgroundColor: '#011627', margin: '0 -1rem', padding: '1rem' }}>
					<div className="text-center mb-8">
						<h2 className="text-2xl font-bold text-white mb-2">
							{title}
						</h2>
						<p className="text-base text-gray-300 max-w-2xl mx-auto">
							{description}
						</p>
					</div>
					
					<Swiper
						ref={swiperRef}
						modules={[Pagination, Autoplay]}
						grabCursor={true}
						slidesPerView={1}
						spaceBetween={20}
						centeredSlides={true}
						loop={true}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						pagination={{
							clickable: true,
							dynamicBullets: true,
						}}
						onSlideChange={handleSlideChange}
						className="w-full"
						style={{ paddingBottom: '60px' }}
					>
						{cards.map((card) => (
							<SwiperSlide key={card.id}>
								<div className="px-2">
									<InfoCard card={card} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default InfoCardGrid; 