"use client";
import PageLayout from "@/layout/pageLayout";
import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FirstPage = () => {
  return (
    <PageLayout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex lg:flex-col">
          <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 dark:text-white">
            Welcome to Vinsport Pro Field Booking
          </h1>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300">
            Book your favorite sports field hassle-free with Vinsport Pro Field
            Booking.
          </p>
        </div>

        <div className="relative flex place-items-center mt-12 mb-16">
          <Image
            className="relative "
            src="/vinsport-logo.svg"
            alt="Vinsport Pro Field Booking Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className="grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left gap-8">
          <a
            href="/san-bong"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">Book a Field</h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-70">
              Reserve your preferred sports field for your next game.
            </p>
          </a>

          <a
            href="/schedule"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-green-500 hover:bg-green-50 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          >
            <h2 className="mb-3 text-2xl font-semibold">View Schedule</h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-70">
              Check the schedule for upcoming events and availability.
            </p>
          </a>
        </div>
      </main>
    </PageLayout>
  );
};

export default FirstPage;
