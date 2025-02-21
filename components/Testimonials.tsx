import { Testimonials } from "@/components/ui/testimonials";

const testimonials = [
  {
    image:
      "avatars/Ellipse 13.svg",
    text: "I never thought I could own a home that felt this cozy and functional! My tiny home has changed the way I live—more freedom, less stress, and a space that truly feels like me.",
    name: "Alice Johnson",
    username: "San Francisco, USA",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image:
      "avatars/Ellipse 3.svg",
    text: "We were looking for an affordable, sustainable option, and our prefab home exceeded expectations. It's energy-efficient, stylish, and perfect for our growing family.",
    name: "David Smith",
    username: "London, UK",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "avatars/Ellipse 11.svg",
    text: "As someone who loves to travel, my mobile home is a dream come true! I get to explore new places without ever leaving home. Tiny Homes Limitless Living made the process seamless!",
    name: "Emma Brown",
    username: "Bangalore, India",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "avatars/Ellipse 10.svg",
    text: "I wanted a minimalist lifestyle, and my capsule home delivered! Every inch is thoughtfully designed, and I feel more connected to what truly matters in life.",
    name: "James Wilson",
    username: "Sydney, Australia",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "avatars/Ellipse 9.svg",
    text: "Buying a manufactured home from this company was the best decision I made. High-quality build, modern design, and super affordable!",
    name: "Sophia Lee",
    username: "Toronto, Canada",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "avatars/Ellipse 8.svg",
    text: "Living in my log cabin is a dream. It’s rustic yet modern, warm in winter, and cool in summer. The craftsmanship is outstanding!",
    name: "Michael Davis",
    username: "Dubai, UAE",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "avatars/Ellipse 7.svg",
    text: "Our farm house is everything we wanted. Spacious yet simple, it perfectly blends nature and comfort. Thank you for making homeownership this easy!",
    name: "Emily Chen",
    username: "Beijing, China",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "avatars/Ellipse 6.svg",
    text: "My prefab home is my peaceful oasis. It’s efficient, beautifully designed, and feels much bigger inside than I expected!",
    name: "Robert Lee",
    username: "New York, USA",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "avatars/Ellipse 5.svg",
    text: "Sustainability was my top priority, and my tiny home checked all the boxes. I reduced my carbon footprint and love my cozy, modern space!",
    name: "Sarah Taylor",
    username: "Madrid, Spain",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "avatars/Ellipse 4.svg",
    text: "We were amazed at how customizable our manufactured home was. Every detail was tailored to our needs, and the result is stunning!",
    name: "Kevin White",
    username: "Berlin, Germany",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "avatars/Ellipse 12.svg",
    text: "My capsule home is the perfect blend of futuristic design and smart space-saving solutions. Highly recommend!",
    name: "Adebayo Ayo",
    username: "Lagos, Nigeria",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "avatars/Ellipse 2.svg",
    text: "From start to finish, the buying process was smooth, and the team was incredibly helpful. My mobile home is everything I dreamed of!",
    name: "Brian Kim",
    username: "Singapore",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
];

export function TestimonialsList() {
  return (
    <div id="reviews" className="container py-10 px-5">
      <Testimonials testimonials={testimonials}  />
    </div>
  );
}
