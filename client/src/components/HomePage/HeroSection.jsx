import React from 'react'
import { useStore } from '../../store/AppContext'
import {Link} from "react-router-dom"

const HeroSection = () => {
    const {isLoggedIn} = useStore()
  return (
     <section>
        <div className="relative py-12 bg-indigo-600 overflow-hidden sm:py-16 lg:py-20">
          <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-6xl mx-auto">
              <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16 xl:gap-x-24">
                <div className="max-w-lg mx-auto text-center lg:max-w-none lg:mx-0 lg:order-2 lg:text-left">
                  <p className="text-base font-medium text-gray-200">
                    Book smarter. Read better.
                  </p>
                  <h1 className="mt-5 text-3xl font-bold text-gray-50 lg:mt-8 sm:text-4xl xl:text-5xl xl:leading-tight">
                    Discover books that <br className="hidden sm:block" />
                    change your world 🌍
                  </h1>

                  <div className="mt-10 lg:mt-14">
                    <p className="text-base font-bold text-gray-100">
                      Join TurnPage to explore, learn, and get hand-picked
                      recommendations based on your interests.
                    </p>

                    <div className="mt-4 lg:mt-5">
                      <div className="mt-3">
                        <Link to = {isLoggedIn ? "/register" : "/books"}
                          className=" inline-flex w-full lg:w-auto items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-600 focus:ring-offset-[#FFE942] "
                        >
                          Join Us Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative lg:order-1">
                  <div className="absolute -inset-24">
                    <img
                      className="w-full h-full"
                      src="/images/textHero.png"
                      alt=""
                    />
                  </div>

                  <div className="relative">
                    <img
                      className="w-full max-w-xs mx-auto xl:max-w-sm"
                      src="/images/hero.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HeroSection