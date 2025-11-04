/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect } from "react";

import pricing from "../../public/whyChooseUs/money.png";
import business from "../../public/whyChooseUs/businessman.png";
import travel from "../../public/whyChooseUs/passport.png";
import hotel from "../../public/whyChooseUs/hotel.png";
import Image from "next/image";

const reasons = [
  {
    title: "Tailored Travel Packages",
    image: business,
    description:
      "We create customized travel experiences that match your interests, budget, and schedule, ensuring a seamless and personalized journey, whether you seek adventure, relaxation, or cultural exploration",
  },
  {
    title: "Premium Accommodations ",
    image: hotel,
    description:
      "Enjoy top-rated hotels, resorts, and homestays, ensuring a comfortable and luxurious stay. We offer a range of options, from budget-friendly stays to five-star luxury, tailored to your needs.",
  },
  {
    title: "Experienced Travel Experts",
    image: travel,
    description:
      "Our seasoned travel professionals provide expert guidance, local insights, and seamless planning to ensure a hassle-free, well-curated travel experience, making your journey smooth and enjoyable.",
  },
  {
    title: "Affordable Pricing ",
    image: pricing,
    description:
      "Enjoy high-quality travel at competitive prices with no hidden costs. We offer the best deals and transparent pricing, ensuring an unforgettable experience that fits your budget.",
  },
];
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default function WhyChooseUs() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 40);
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why we are the best choice for your next travel adventure.
          </p>
        </div>

        <motion.div
          ref={ref}
          style={{ y: y }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="text-center transition-all hover:scale-110"
            >
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Image
                    src={reason.image}
                    alt={reason.title}
                    height={100}
                    width={100}
                    className="w-6 h-6 text-emerald-600"
                  />
                </div>
                <CardTitle className="text-lg">{reason.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
      {/* <CountingNumbers /> */}
      <div className="flex flex-col sm:flex-row justify-center mt-20 sm:mt-10 gap-10">
        {[
          { text: "Trips and Tours", value: 1500 },
          { text: "Outdoor Activities", value: 50 },
          { text: "Countries", value: 40 },
          { text: "Happy Customers", value: 10000 },
        ].map((item) => (
          <CountUpWrapper
            key={item.text}
            symbol="+"
            text={item.text}
            from={0}
            to={item.value}
            duration={1}
            className="count-up-text"
          />
        ))}
      </div>
    </section>
  );
}

export function CountUpWrapper({
  symbol = "+",
  text = "",
  from = 0,
  to = 1,
  duration = 1,
  className = "",
}) {
  return (
    <>
      <div className="flex flex-col gap-5  items-center font-sans ">
        <p>
          <span className="text-4xl font-bold">{symbol}</span>
          <CountUp
            from={from}
            to={to}
            separator=","
            direction="up"
            duration={duration}
            className={`count-up-text text-4xl font-bold ${className}`}
          />
        </p>
        <p className="text-xl font-serif ">{text}</p>
      </div>
    </>
  );
}

export function CountUp({
  to = 1,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 3,
  className = "",
  startWhen = true,
  separator = "",
  onStart = () => {},
  onEnd = () => {},
}) {
  const ref = useRef<HTMLElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const isInView = useInView(ref, { once: true, margin: "0px" });

  const getDecimalPlaces = (num: any) => {
    const str = num.toString();

    if (str.includes(".")) {
      const decimals = str.split(".")[1];

      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }

    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;

      const options = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      };

      const formattedNumber = Intl.NumberFormat("en-US", options).format(
        latest
      );

      return separator
        ? formattedNumber.replace(/,/g, separator)
        : formattedNumber;
    },
    [maxDecimals, separator]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === "down" ? to : from);
    }
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === "function") onStart();

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(() => {
        if (typeof onEnd === "function") onEnd();
      }, delay * 1000 + duration * 1000);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [
    isInView,
    startWhen,
    motionValue,
    direction,
    from,
    to,
    delay,
    onStart,
    onEnd,
    duration,
  ]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
}
