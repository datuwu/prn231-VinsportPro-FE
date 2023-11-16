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
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/vinsport-logo.svg"
            alt="Vinsport Pro Field Booking Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className="grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left gap-8">
          <a
            href="/bookings"
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

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Powered by{" "}
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline dark:text-neutral-500"
            >
              Vercel
            </a>
          </p>
        </div>
      </main>
    </PageLayout>
  );
};

export default FirstPage;
