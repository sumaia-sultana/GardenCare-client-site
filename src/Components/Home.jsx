 
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
 
import Counter from './counter';
import TrendingTips from '../pages/TrendingTips';
import ActGardener from './ActGardener';
import GardenTools from './GardenTools';
 
const Home = () => {
 
    return (
        <div className='bg-white dark:bg-gray-800 text-black dark:text-white'>
             <Swiper
         
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 3000,  
          disableOnInteraction: false,  
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1 ,
          },
        }}
      >
        {[
          'https://i.ibb.co/PZ6V2xrb/woodygarden-ed.jpg',
           
          'https://i.ibb.co/5X3mfvGH/grass.jpg',
           'https://i.ibb.co/MxhpXJHK/bagaanbilas.jpg',
           
        ].map((imgUrl, index) => (
          <SwiperSlide key={index}>
            <div className="h-96 overflow-hidden rounded-lg shadow-2xl">
              <img 
                src={imgUrl} 
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom arrow styles (optional) */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #000;
          background: rgba(255, 255, 255, 0.8);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 1.2rem;
        }
      `}</style>

       <ActGardener/>
      <TrendingTips></TrendingTips>
      <GardenTools/>
      <div>
        <Counter/>
      </div>
        </div>
         
    );
    
};

export default Home;