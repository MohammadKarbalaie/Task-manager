/* eslint-disable @next/next/no-img-element */
import React from 'react'

function Main() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center my-2 px-4 sm:px-8 md:px-12 lg:px-20">
      {/* بخش اصلی کارت */}
      <div className="bg-[#7748cc] w-full max-w-screen-xl px-8 sm:px-16 lg:px-24 py-6 flex flex-col items-center">
        {/* بخش بالای کارت */}
        <div className="flex gap-2 items-center sm:ml-3 xl:ml-0">
          <img src="./pic1.png" width={50} alt="Conference Room Icon" />
          <span className="text-center sm:text-left">
            <p className="text-white font-semibold text-xl">conference</p>
            <p className="text-white font-semibold text-xl">room</p>
          </span>
        </div>

        {/* بخش عنوان و تصویر */}
        <div className="flex flex-col xl:flex-row items-center xl:items-start xl:gap-40 mt-6 xl:mt-12">
          <span className="text-center xl:text-left">
            <h1 className="text-white font-semibold text-3xl md:text-4xl mt-4 xl:mt-10">
              To-do List
            </h1>
            <h1 className="text-white font-semibold text-3xl md:text-4xl">
              Template
            </h1>
          </span>
          <img
            src="./pic2.png"
            alt="To-do List Illustration"
            className="mt-6 xl:mt-0 xl:w-[600px] lg:w-[500px] md:w-[400px] w-full max-w-xs"
          />
        </div>

        {/* متن توضیحات */}
        <p className="w-full max-w-md text-center xl:text-left py-7 text-white font-sans">
          Enhance individual and team work operations by effectively organizing, prioritizing,
          and optimizing tasks using our To-Do List Template.
        </p>

        {/* دکمه بیشتر */}
        <p className="bg-yellow-500 rounded-2xl px-6 py-2 w-fit font-semibold text-purple-900 cursor-pointer">
          More templates
        </p>
      </div>

      {/* بخش پایین کارت */}
      <div className="bg-[#fff6ea] w-full max-w-screen-xl px-8 sm:px-14 py-6 flex flex-col items-center text-center sm:text-left">
        <div>
          <h1 className="font-semibold text-xl">For personal use only</h1>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <p>
            The template you’re checking out is only for personal use, and not meant for
            business or work-related projects. It’s important to remember that sharing or using
            the template for commercial purposes is not allowed.
          </p>
          <p>
            If you wish to utilize our templates for commercial purposes or require additional
            templates, please visit our website.
          </p>
        </div>
        <div className="border rounded-xl px-4 py-2 w-fit mt-6 border-[#7748cc] text-[#7748cc] font-semibold cursor-pointer">
          <p>templatesformanagers.com</p>
        </div>
      </div>
    </div>
  )
}

export default Main
