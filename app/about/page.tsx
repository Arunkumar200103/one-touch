"use client";

import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/breadcrumb";
import { InfoCard } from "@/components/info-card";
import { BackToHome } from "@/components/back-to-home";
import { getPageColor } from "@/lib/page-colors";
import Image from "next/image";
import Link from "next/link";

const colors = getPageColor("about");

export default function About() {

  const features = [
    {
      title: "Verified Businesses",
      description:
        "All businesses listed on our platform go through a verification process to ensure authenticity and reliability.",
      icon: "🛡️",
    },
    {
      title: "Authentic Customer Reviews",
      description:
        "Real customer feedback helps you evaluate services and make confident decisions.",
      icon: "⭐",
    },
    {
      title: "User-Friendly Platform",
      description:
        "Our simple and intuitive interface allows anyone to find services easily.",
      icon: "✨",
    },
    {
      title: "Support for Local Businesses",
      description:
        "We empower local service providers by giving them a platform to reach more customers.",
      icon: "🤝",
    },
    {
      title: "Customer-First Approach",
      description:
        "Your satisfaction and safety are at the center of everything we build.",
      icon: "❤️",
    },
    {
      title: "Completely Free",
      description:
        "Search, compare, and contact businesses without any subscription or hidden charges.",
      icon: "💚",
    },
  ];

  const stats = [
    { number: "500+", label: "Verified Businesses" },
    { number: "10K+", label: "Happy Customers" },
    { number: "7+", label: "Service Categories" },
    { number: "24/7", label: "Platform Availability" },
  ];

  return (
    <main className={`min-h-screen bg-gradient-to-b ${colors.bgGradient}`}>
      <Navbar />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-4 mt-[-5rem]">
        <BackToHome />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "About Us" },
          ]}
          accentColor={colors.primary}
        />

        {/* Mission Section */}
        <section className="mb-24">

          <h2
            className="text-4xl font-bold mb-8"
            style={{ color: colors.primary }}
          >
            Our Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            <div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At <strong>One Touch</strong>, our mission is to make finding local
                services simple, safe, and trustworthy. We connect customers
                with verified businesses so they can easily discover reliable
                services within their community.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Whether you need construction services, electrical repairs,
                education support, home maintenance, or professional services,
                our platform helps you compare options and contact the right
                provider quickly.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                We aim to create a platform that works for everyone — from
                tech-savvy users to people who simply want a quick and easy way
                to find trusted local businesses.
              </p>

            </div>

            <div
              className="relative rounded-2xl h-80 overflow-hidden shadow-xl"
              style={{ backgroundColor: colors.light }}
            >
              <Image
                src={colors.banner}
                alt="Our Mission"
                fill
                className="object-cover"
              />
            </div>

          </div>

        </section>

        {/* Why Choose Us */}
        <section className="mb-24">

          <h2
            className="text-4xl font-bold mb-12"
            style={{ color: colors.primary }}
          >
            Why Choose One Touch?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <InfoCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  backgroundColor={colors.light}
                  borderColor={colors.primary}
                  iconColor={colors.primary}
                />
              </div>
            ))}

          </div>

        </section>

        {/* Statistics */}
        <section
          className="mb-24 rounded-3xl p-14"
          style={{ backgroundColor: colors.primary }}
        >

          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Our Impact
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

            {stats.map((stat, index) => (
              <div key={index} className="text-center">

                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>

                <p className="text-white/80 font-medium">
                  {stat.label}
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* Core Values */}
        <section className="mb-24">

          <h2
            className="text-4xl font-bold mb-12"
            style={{ color: colors.primary }}
          >
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div
              className="p-8 border-2 rounded-2xl"
              style={{ borderColor: colors.primary }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: colors.primary }}
              >
                Transparency
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We believe in honest communication and transparent information.
                Business listings, ratings, and reviews are genuine and clearly
                displayed to help users make informed decisions.
              </p>
            </div>

            <div
              className="p-8 border-2 rounded-2xl"
              style={{ borderColor: colors.primary }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: colors.primary }}
              >
                Accessibility
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our platform is designed for everyone regardless of technical
                experience. Clear navigation and simple language ensure a smooth
                experience for all users.
              </p>
            </div>

            <div
              className="p-8 border-2 rounded-2xl"
              style={{ borderColor: colors.primary }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: colors.primary }}
              >
                Community Growth
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We help local businesses grow by connecting them with customers
                in their region, strengthening the local economy.
              </p>
            </div>

            <div
              className="p-8 border-2 rounded-2xl"
              style={{ borderColor: colors.primary }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: colors.primary }}
              >
                Safety & Trust
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Protecting user data and ensuring reliable business listings
                are our top priorities. We maintain strict quality standards
                across the platform.
              </p>
            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="text-center">

          <h2
            className="text-4xl font-bold mb-6"
            style={{ color: colors.primary }}
          >
            Ready to find the service you need?
          </h2>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Explore verified local businesses and connect with trusted service
            providers near you.
          </p>

          <Link href="/">
            <button
              className="text-white font-bold py-4 px-10 rounded-full text-lg transition-all hover:shadow-xl hover:scale-105"
              style={{ backgroundColor: colors.primary }}
            >
              Explore Services
            </button>
          </Link>

        </section>

      </div>
    </main>
  );
}