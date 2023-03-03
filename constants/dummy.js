const hotels = [
  {
    id: 12,
    name: "Dubai",
    image:
      "https://th.bing.com/th/id/R.ed041b61d80635960008bb44b178d590?rik=l6qdGZrAUfcAzA&pid=ImgRaw&r=0",
    otherImages: [
      "https://stockphoto.com/samples/MDc1Mzg0MDcxMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/living-room-interior.jpg&size=1024",
      "https://stockphoto.com/samples/MTE3NzQ0MDUwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/bright-hotel-room-interior.jpg&size=1024",
      "https://stockphoto.com/samples/ODUyMDY2MzcxMDAxMWY1YmNmYjBlZA==/NDI1NTFmNWJjZmIwZWQ=/rolled-towels-and-bathrobe-on-bed.jpg&size=1024",
      "https://stockphoto.com/samples/NDIwMTQxMTAxMDAxMWY1YmNmYjBlZA==/OTM3NDExZjViY2ZiMGVk/entering-hotel-room.jpg&size=1024",
    ],
    price: 2300,
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    rating: "Excellent",
    star: 4.6,
    location: "Lagos State",
    address: "Block 12, House No 13B Fashore Osborne Estate, Okoyi",
    isFavorite: true,
  },
  {
    id: 122,
    name: "Dubai",
    image:
      "https://th.bing.com/th/id/R.ed041b61d80635960008bb44b178d590?rik=l6qdGZrAUfcAzA&pid=ImgRaw&r=0",
    otherImages: [
      "https://stockphoto.com/samples/MDc1Mzg0MDcxMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/living-room-interior.jpg&size=1024",
      "https://stockphoto.com/samples/MTE3NzQ0MDUwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/bright-hotel-room-interior.jpg&size=1024",
      "https://stockphoto.com/samples/ODUyMDY2MzcxMDAxMWY1YmNmYjBlZA==/NDI1NTFmNWJjZmIwZWQ=/rolled-towels-and-bathrobe-on-bed.jpg&size=1024",
      "https://stockphoto.com/samples/NDIwMTQxMTAxMDAxMWY1YmNmYjBlZA==/OTM3NDExZjViY2ZiMGVk/entering-hotel-room.jpg&size=1024",
    ],
    price: 2300,
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    rating: "Excellent",
    star: 4.6,
    location: "Lagos State",
    address: "Block 12, House No 13B Fashore Osborne Estate, Okoyi",
    isFavorite: false,
  },
  {
    id: 121,
    name: "Dubai",
    image:
      "https://th.bing.com/th/id/R.ed041b61d80635960008bb44b178d590?rik=l6qdGZrAUfcAzA&pid=ImgRaw&r=0",
    otherImages: [
      "https://stockphoto.com/samples/MDc1Mzg0MDcxMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/living-room-interior.jpg&size=1024",
      "https://stockphoto.com/samples/MTE3NzQ0MDUwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/bright-hotel-room-interior.jpg&size=1024",
      "https://stockphoto.com/samples/ODUyMDY2MzcxMDAxMWY1YmNmYjBlZA==/NDI1NTFmNWJjZmIwZWQ=/rolled-towels-and-bathrobe-on-bed.jpg&size=1024",
      "https://stockphoto.com/samples/NDIwMTQxMTAxMDAxMWY1YmNmYjBlZA==/OTM3NDExZjViY2ZiMGVk/entering-hotel-room.jpg&size=1024",
    ],
    price: 2300,
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    rating: "Excellent",
    star: 4.6,
    location: "Lagos State",
    address: "Block 12, House No 13B Fashore Osborne Estate, Okoyi",
    isFavorite: true,
  },
  {
    id: 123,
    name: "Dubai",
    image:
      "https://th.bing.com/th/id/R.ed041b61d80635960008bb44b178d590?rik=l6qdGZrAUfcAzA&pid=ImgRaw&r=0",
    otherImages: [
      "https://stockphoto.com/samples/MDc1Mzg0MDcxMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/living-room-interior.jpg&size=1024",
      "https://stockphoto.com/samples/MTE3NzQ0MDUwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/bright-hotel-room-interior.jpg&size=1024",
      "https://stockphoto.com/samples/ODUyMDY2MzcxMDAxMWY1YmNmYjBlZA==/NDI1NTFmNWJjZmIwZWQ=/rolled-towels-and-bathrobe-on-bed.jpg&size=1024",
      "https://stockphoto.com/samples/NDIwMTQxMTAxMDAxMWY1YmNmYjBlZA==/OTM3NDExZjViY2ZiMGVk/entering-hotel-room.jpg&size=1024",
    ],
    price: 2300,
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    rating: "Excellent",
    star: 4.6,
    location: "Lagos State",
    address: "Block 12, House No 13B Fashore Osborne Estate, Okoyi",
    isFavorite: false,
  },
];

const recentcars = [
  {
    id: "shhd6eyrf",
    f_img:
      "https://stockphoto.com/samples/MDIyMjE0NzQyMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/blue-suv-car-with-sport-and-modern-design-parked-on-concrete-road-by-the-sea-at-sunset-in-the-evening-hybrid-and-electric-car-technology-concept-automotive-industry-headlamp.jpg&size=1024",
    froLoc: "Abuja",
    froDur: "Jun 21, 12PM",
    toLoc: "Kagos",
    toDur: "Jun 22, 6PM",
  },
  {
    id: "shhdggt6ey65rf",
    f_img:
      "https://stockphoto.com/samples/MDIyMjE0NzQyMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/blue-suv-car-with-sport-and-modern-design-parked-on-concrete-road-by-the-sea-at-sunset-in-the-evening-hybrid-and-electric-car-technology-concept-automotive-industry-headlamp.jpg&size=1024",
    froLoc: "Abuja",
    froDur: "Jun 21, 12PM",
    toLoc: "Kagos",
    toDur: "Jun 22, 6PM",
  },
];
const cars = [
  {
    id: "shhd6eyrf",
    name: "Ford SUV",
    f_img:
      "https://stockphoto.com/samples/MDIyMjE0NzQyMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/blue-suv-car-with-sport-and-modern-design-parked-on-concrete-road-by-the-sea-at-sunset-in-the-evening-hybrid-and-electric-car-technology-concept-automotive-industry-headlamp.jpg&size=1024",
    otherImages: [
      "https://stockphoto.com/samples/NTM1MTI5MTUyMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/selective-focus-of-handsome-man-and-curly-cheerful-woman-looking-at-camera-while-sitting-in-automobile-.jpg&size=1024",
      "https://stockphoto.com/samples/MTI2NDAwMjAwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/interior-of-exclusive-car.jpg&size=1024",
      "https://stockphoto.com/samples/MjM2Mzk1MjIyMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/interior-of-beige-leather-new-car-with-sunlight.jpg&size=1024",
      "https://stockphoto.com/samples/OTQ3NjkxMDYwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/smart-multimedia-system-for-automobile.jpg&size=1024",
    ],
    price: 23000,
    features: ["Constitution Avenue|Non airport", "Enhanced cleaning"],
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    location: "Lagos State",
    doors: 4,
    passenger: 4,
    user: 2,
    isFavorite: true,
  },
  {
    id: "shhd6ey7dyfgrf",
    name: "Ford SUV",
    f_img:
      "https://stockphoto.com/samples/MDIyMjE0NzQyMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/blue-suv-car-with-sport-and-modern-design-parked-on-concrete-road-by-the-sea-at-sunset-in-the-evening-hybrid-and-electric-car-technology-concept-automotive-industry-headlamp.jpg&size=1024",
    otherImages: [
      "https://stockphoto.com/samples/NTM1MTI5MTUyMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/selective-focus-of-handsome-man-and-curly-cheerful-woman-looking-at-camera-while-sitting-in-automobile-.jpg&size=1024",
      "https://stockphoto.com/samples/MTI2NDAwMjAwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/interior-of-exclusive-car.jpg&size=1024",
      "https://stockphoto.com/samples/MjM2Mzk1MjIyMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/interior-of-beige-leather-new-car-with-sunlight.jpg&size=1024",
      "https://stockphoto.com/samples/OTQ3NjkxMDYwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/smart-multimedia-system-for-automobile.jpg&size=1024",
    ],
    price: 23000,
    features: ["Constitution Avenue|Non airport", "Enhanced cleaning"],
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    location: "Lagos State",
    doors: 4,
    passenger: 4,
    user: 2,
    isFavorite: true,
  },
  {
    id: "sh5654hd6eyrf",
    name: "Ford SUV",
    f_img:
      "https://stockphoto.com/samples/MDIyMjE0NzQyMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/blue-suv-car-with-sport-and-modern-design-parked-on-concrete-road-by-the-sea-at-sunset-in-the-evening-hybrid-and-electric-car-technology-concept-automotive-industry-headlamp.jpg&size=1024",
    otherImages: [
      "https://stockphoto.com/samples/NTM1MTI5MTUyMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/selective-focus-of-handsome-man-and-curly-cheerful-woman-looking-at-camera-while-sitting-in-automobile-.jpg&size=1024",
      "https://stockphoto.com/samples/MTI2NDAwMjAwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/interior-of-exclusive-car.jpg&size=1024",
      "https://stockphoto.com/samples/MjM2Mzk1MjIyMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/interior-of-beige-leather-new-car-with-sunlight.jpg&size=1024",
      "https://stockphoto.com/samples/OTQ3NjkxMDYwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/smart-multimedia-system-for-automobile.jpg&size=1024",
    ],
    price: 23000,
    features: ["Constitution Avenue|Non airport", "Enhanced cleaning"],
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    location: "Lagos State",
    doors: 4,
    passenger: 4,
    user: 2,
    isFavorite: true,
  },
];
export { hotels, recentcars, cars };
