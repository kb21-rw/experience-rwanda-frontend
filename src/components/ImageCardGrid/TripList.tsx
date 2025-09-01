"use client";
import { useMemo, useState } from "react";
import FilterAndSearch from "../FilterAndSearch";
import ImageCard from "./Card";
import { Trip } from "@/types/ImageCard";
import SearchNotFound from "../ui/SearchNotFound";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "../../utils/schemas/searchSchema";
import { z } from "zod";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const defaultFilters = {
  location: "",
  dateRange: undefined,
  price: {
    min: "",
    max: "",
  },
};

const TripList = ({ trips }: { trips: Trip[] }) => {
  const safeTrips = useMemo(() => (Array.isArray(trips) ? trips : []), [trips]);
  const [filters, setFilters] =
    useState<z.infer<typeof searchSchema>>(defaultFilters);

  const filteredTrips = useMemo(() => {
    return safeTrips.filter((data) => {
      const matchesLocation = data.destination
        .toLowerCase()
        .includes(filters.location.toLowerCase());
      const matchesTitle = data.title
        .toLowerCase()
        .includes(filters.location.toLowerCase());

      const matchesDate =
        filters.dateRange?.from !== undefined &&
        filters.dateRange?.to !== undefined
          ? new Date(data.departureTime) >= filters.dateRange?.from &&
            new Date(data.departureTime) <= filters.dateRange?.to
          : true;

      const matchesPrice =
        filters.price.min !== "" && filters.price.max !== ""
          ? Number(data.pricingOptions[0].amount) >=
              Number(filters.price.min) &&
            Number(data.pricingOptions[0].amount) <= Number(filters.price.max)
          : true;

      return (matchesLocation || matchesTitle) && matchesDate && matchesPrice;
    });
  }, [
    filters.dateRange?.from,
    filters.dateRange?.to,
    filters.location,
    filters.price.max,
    filters.price.min,
    safeTrips,
  ]);
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: defaultFilters,
  });
  const onSubmit = (values: z.infer<typeof searchSchema>) => {
    try {
      setFilters(values);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div>
      <FilterAndSearch form={form} onSubmit={onSubmit} />
      {filteredTrips.length >= 1 ? (
        <>
          <div className="hidden md:grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-10">
            {filteredTrips.map((data: Trip) => (
              <ImageCard key={data.id} {...data} />
            ))}
          </div>

          <div className="md:hidden mt-10">
            <Swiper
              modules={[Pagination, Autoplay]}
              grabCursor={true}
              slidesPerView={1}
              spaceBetween={20}
              centeredSlides={true}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              className="w-full"
              style={{ paddingBottom: "40px" }}
           >
              {filteredTrips.map((data: Trip) => (
                <SwiperSlide key={data.id}>
                  <div className="px-2">
                    <ImageCard {...data} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto mt-10">
          <SearchNotFound
            message="Try to use different keywords"
            title="Clear the search"
            onClearSearch={() => {
              form.reset();
              setFilters(defaultFilters);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TripList;
