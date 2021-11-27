import React from 'react';
import { testimonials } from '../../utils/testimonials';

const Testimonial = () => {

    const gridItem = (index) => {
        
        if (index + 1 === testimonials.length) {
            return "w-[300px] md:w-[360px] lg:w-[380px] 2xl:w-[450px] justify-self-center col-span-3 py-4 flex flex-grow flex-shrink overflow-hidden rounded-lg shadow-xl xl:shadow-md bg-gray-800 xl:hover:shadow-xl transition-shadow duration-300 ease-in-out";
        }

        return "w-[300px] md:w-[360px] lg:w-[380px] 2xl:w-[450px] py-4 flex flex-grow flex-shrink overflow-hidden rounded-lg shadow-xl xl:shadow-md bg-gray-800 xl:hover:shadow-xl transition-shadow duration-300 ease-in-out"
    };

    return (
        <div className="flex overflow-x-scroll no-scrollbar">
            <div className="flex mx-9 xl:mx-auto">
                <div className="flex space-x-4 xl:grid xl:auto-rows-fr xl:grid-cols-3 xl:justify-items-center xl:space-x-0 xl:gap-10">

                    {testimonials.map((testimonial, index) => {
                        const grid_class = gridItem(index);
                        
                        return (
                            <div key={index} className={grid_class}>
                                <div className="flex w-85 md:w-4/5 mx-auto flex-col space-y-6">
                                    <img className="w-20 h-20 2xl:w-28 2xl:h-28 mx-auto rounded-full object-cover" src={testimonial.photo} alt="Testimonial" />
                                    <p className="font-inter md:text-xl 2xl:text-2xl 2xl:leading-normal italic text-gray-200">"{testimonial.text}"</p>
                                    <p className="font-inter pt-8 pb-6 !mt-auto text-yellow-400 text-lg 2xl:text-xl text-center font-semibold">{testimonial.name}, {testimonial.age}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
