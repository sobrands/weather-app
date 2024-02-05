'use client'

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from 'date-fns'
import Container from "@/components/Container";

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

interface WeatherData {
  location: Location;
  current: CurrentWeather;
}

export default function Home() {
  const { isPending, error, data } = useQuery<WeatherData>({
    queryKey: ['weatherData'],
    queryFn: async () => {
      const { data } = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}&q=London&aqi=no`)
      return data;
    }
  })

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-bounce">Loading...</p>
      </div>
    )
  }

  // console.log(format(data.location.localtime, 'EEEE'))

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar/>
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* Today's data */}
        <section>
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(data.location.localtime ?? "", 'EEEE')}</p>
              <p className="text-lg">({format(data.location.localtime ?? "", "dd.MM.yyyy")})</p>
            </h2>
            <Container/>
          </div>
        </section>

        {/* Forecast data */}
        <section></section>
      </main>
    </div>
  );
}
