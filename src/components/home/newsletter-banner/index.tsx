"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/shared/button";
import { Checkbox } from "@/components/shared/checkbox";
import { Container } from "@/components/shared/container";
import { Input } from "@/components/shared/input";

type Dictionary = {
  newsletter: {
    title: string;
    titleAmount: string;
    titleEnd: string;
    emailPlaceholder: string;
    joinButton: string;
    consentText: string;
  };
};

type NewsletterSignupProps = {
  dict: Dictionary;
};

export default function NewsletterSignup({ dict }: NewsletterSignupProps) {
  const [isChecked, setIsChecked] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Here you would typically send the data to your server
    console.log("Form submitted:", Object.fromEntries(formData));
  }

  return (
    <Container className="mt-6 small:mt-10 mx-auto px-4 overflow-hidden">
      <div className="bg-[#FAFAFB] flex flex-col gap-8 medium:flex-row medium:gap-x-10 medium:items-center p-4 small:p-6 medium:p-8">
        {/* Text and Form Section */}
        <div className="order-2 medium:order-1 medium:w-1/2 w-full">
          <div className="flex flex-col medium:justify-center">
            <h1 className="text-3xl font-semibold medium:text-4xl large:text-5xl">
              {dict.newsletter.title}{" "}
              <span className="whitespace-nowrap">
                {dict.newsletter.titleAmount}
              </span>{" "}
              {dict.newsletter.titleEnd}
            </h1>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4 w-full">
              <div className="flex items-center gap-3 w-full">
                <div className="w-full max-w-[300px] small:max-w-[320px] medium:max-w-[280px] large:max-w-[320px]">
                  <Input
                    type="email"
                    name="email"
                    placeholder={dict.newsletter.emailPlaceholder}
                    required
                    className="w-full rounded-none border-x-0 border-t-0 border-b-black bg-transparent px-0 placeholder:text-gray-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  />
                </div>
                <Button
                  type="submit"
                  variant="ghost"
                  className="p-0 whitespace-nowrap text-base small:text-lg underline transition-colors hover:bg-transparent small:text-[18px] flex-shrink-0"
                >
                  {dict.newsletter.joinButton}
                </Button>
              </div>
              <div className="flex items-start gap-2 w-full max-w-[500px]">
                <Checkbox
                  id="privacy"
                  name="privacy"
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    setIsChecked(checked as boolean)
                  }
                  className="mt-1 h-4 w-4 rounded-none flex-shrink-0"
                  required
                />
                <label
                  htmlFor="privacy"
                  className="text-xs small:text-sm font-light text-gray-700"
                >
                  {dict.newsletter.consentText}
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="order-1 medium:order-2 medium:w-1/2 w-full">
          <div className="relative aspect-[4/3] small:aspect-[3/2] w-full overflow-hidden">
            <Image
              src="https://gibbarosa.fra1.cdn.digitaloceanspaces.com/Elegant_sandals.png"
              alt="Elegant sandals"
              fill
              priority
              quality={90}
              className="object-cover object-center transform scale-[1.02] hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
