// Static data — used as fallback/primary source when API is unavailable (Vercel serverless)

export const STATIC_ACTIVITIES = [
    {
        id: 1,
        title: "Raj Mahal",
        description:
            "Built in the 16th century by Rudra Pratap Singh, the Raja Mahal was later completed by Madhukar Shah. The palace is a square structure with five floors on three sides and four floors on one. The royal bedrooms, private audience hall, and emperor's cabin reflect Bundela grandeur. The ceiling and walls feature paintings of Ramayana and court scenes. Stone-carved grills provide ventilation, while Sheesh Mahal, now a heritage hotel, offers a regal stay. The majestic architecture, mirror-adorned interiors, and historical significance make it a key attraction in the Orchha Fort complex, drawing visitors to its architectural and cultural splendor.",
        imageUrl: "/images/raja-mahal-orchha.jpg",
        images: ["/images/raja-mahal-orchha.jpg"],
    },
    {
        id: 2,
        title: "Laxmi Narayan Temple",
        description:
            "Built by Veer Singh Deo in 1622, the Laxmi Narayan Temple features window-like carvings, battlements, and open galleries. The courtyard's central sanctum is octagonal, and its walls and ceilings are adorned with murals. These depict Ramayana episodes, Lord Vishnu's incarnation, and secular themes. A remarkable painting shows Chungi Chirya, a giant bird carrying an elephant. The temple's unique architecture and Bundela frescoes make it a historical masterpiece. The well-preserved murals reflect the artistic heritage of Orchha, making it a must-visit site for tourists interested in history, mythology and Bundela artistry",
        imageUrl: "/images/laxmi-narayan-temple.jpg",
        images: ["/images/laxmi-narayan-temple.jpg"],
    },
    {
        id: 3,
        title: "Chhatris",
        description:
            "Fifteen Chhatris (cenotaphs) on the Betwa River's right bank honor Bundela rulers. These square-structured monuments house cremated remains of royal family members. The first Chhatri contains a marble statue of Madhukar Shah and his wife under a painted canopy. The last cenotaph is dedicated to Veer Singh Deo. These architectural marvels feature ornate domes, intricate carvings, and towering structures. Best viewed from the riverbank, the Chhatris present a stunning silhouette against the sky, making them a picturesque attraction in Orchha. Their historical significance and grand Bundela-style architecture make them a favorite spot for photography and heritage exploration.",
        imageUrl: "/images/chhatris.jpg",
        images: ["/images/chhatris.jpg"],
    },
    {
        id: 4,
        title: "Chaturbhuj Temple",
        description:
            "The Chaturbhuj Temple stands out for its distinctive architecture, with a smooth dome similar to a mosque rather than traditional Hindu temples. The open courtyard and rising towers, resembling Bundela Chhatris, enhance its grandeur. Inside, a statue of four-armed Lord Vishnu sits majestically on a pedestal. The temple blends Hindu and Mughal architectural elements, showcasing intricate carvings, high ceilings, and massive pillars. It serves both as a place of worship and a historical landmark, drawing visitors with its spiritual aura and unique design. The Chaturbhuj Temple's architecture and cultural heritage make it a prominent attraction in Orchha.",
        imageUrl: "/images/chaturbhuj-temple.jpg",
        images: ["/images/chaturbhuj-temple.jpg"],
    },
    {
        id: 5,
        title: "Shri Ram Raja Temple",
        description:
            "The Shri Ram Raja Temple is the only temple in India where Lord Rama is worshipped as a King. The temple, painted in white, pink, and yellow, has a unique legend. Queen Ganesh Kunwari, after prayers in Ayodhya, brought Lord Rama as a child deity to Orchha. However, as per Lord Rama's conditions, the first place he was seated became his permanent abode-the queen's palace, now the Ram Raja Temple. This temple is a spiritual landmark, attracting devotees and tourists alike. Its historical significance, vibrant architecture, and sacred traditions make it one of Orchhas's most visited sites.",
        imageUrl: "/images/shri-ram-raja-temple.png",
        images: ["/images/shri-ram-raja-temple.png"],
    },
    {
        id: 6,
        title: "Jahangir Mahal",
        description:
            "The Jahangir Mahal, built in the 17th century by Veer Singh Deo, honored Emperor Jahangir's visit. The grand entrance, adorned with turquoise tiles, features two stone elephants holding bells. The palace blends Indo-Islamic and Jain architecture, with ribbed domes, wavy brackets, and light-colored ceramic tiles. This three-story palace has spacious courtyards, balconies, chhatris, and intricately carved domes, showcasing Bundela craftsmanship. The Jahangir Mahal, with its historical significance and architectural brilliance, remains a key attraction in Orchha, offering panoramic views of its surroundings and immersing visitors in the grandeur of Bundela heritage.",
        imageUrl: "/images/jahangir-mahal.jpg",
        images: ["/images/jahangir-mahal.jpg"],
    },
    {
        id: 7,
        title: "Orchha Bird Sanctuary",
        description:
            "The Orchha Bird Sanctuary, spread over 46 sq. km, offers a scenic retreat for nature lovers. Located along the Betwa River, it hosts numerous bird species and rare plant varieties. The sanctuary provides walking trails, making it an ideal spot for birdwatching and wildlife photography. The lush landscapes and serene environment attract tourists seeking peaceful outdoor experiences. With its rich biodiversity and breathtaking views, the Orchha Bird Sanctuary remains a must-visit destination for wildlife enthusiasts and nature admirers exploring Orchha's natural beauty.",
        imageUrl: "/images/orchha-bird-sanctuary.jpg",
        images: ["/images/orchha-bird-sanctuary.jpg"],
    },
    {
        id: 8,
        title: "Betwa River Rafting",
        description:
            "Betwa River Rafting, organized by MPSTDC, offers an exciting adventure for thrill-seekers. The rafting journey, from Kanchan Ghat to Shiva Ghat, takes tourists through Orchha's scenic beauty. Along the way, adventurers get a unique view of the Chhatris, adding a historic charm to the thrilling ride. The rapids and gentle stretches make it suitable for both beginners and experienced rafters. Betwa River Rafting is a perfect blend of adventure and history, providing an unforgettable experience for visitors looking to explore Orchha beyond its architectural marvels.",
        imageUrl: "/images/betwa-river-rafting.jpg",
        images: ["/images/betwa-river-rafting.jpg"],
    },
];

export const STATIC_COTTAGES = [
    {
        id: 1,
        name: "Accommodation",
        type: "Accommodation",
        description:
            "Our elegantly designed accommodations at Bundeli Kothi offer a perfect blend of comfort and heritage charm. Each room is thoughtfully crafted to provide a serene retreat with modern amenities and breathtaking views of nature. Relax in a tranquil ambiance and wake up to the soothing sounds of birds and rustling leaves",
        price: 12000,
        capacity: 2,
        imageUrl: "/images/accommodation/accommodation-1.jpg",
        images: [
            "/images/accommodation/accommodation-1.jpg",
            "/images/accommodation/accommodation-2.jpeg",
            "/images/accommodation/accommodation-3.jpeg",
            "/images/accommodation/accommodation-4.jpeg",
        ],
        features: ["King size bed", "Private verandah", "Attached stone bathroom", "Solar powered", "Fan cooled"],
    },
    {
        id: 2,
        name: "Sustainability",
        type: "Sustainability",
        description:
            "At Bundeli Kothi, sustainability is at our core. We harness solar power to reduce our carbon footprint. Eco-friendly products and organic farming practices promote a healthier environment. By hiring staff from local villages, we support the community and preserve traditional culture. Experience luxury with a conscience at Bundeli Kothi.",
        price: 15000,
        capacity: 4,
        imageUrl: "/images/sustainability/sustainability-1.jpeg",
        images: [
            "/images/sustainability/sustainability-1.jpeg",
            "/images/sustainability/sustainability-2.jpeg",
            "/images/sustainability/sustainability-3.jpeg",
            "/images/sustainability/sustainability-4.jpeg",
        ],
        features: ["King size bed", "Loft with twin beds", "Large verandah", "River view", "Spacious bathroom"],
    },
];

export const STATIC_TESTIMONIALS = [
    {
        id: 1,
        name: "Sarah Jenkins",
        content: "An absolute gem! Raghu and Joanna are wonderful hosts. The food is incredible and the location is pure magic.",
        rating: 5,
        location: "London, UK",
    },
    {
        id: 2,
        name: "Amit Patel",
        content: "The most peaceful place we've stayed in India. The cottages are beautiful and eco-friendly without compromising on comfort.",
        rating: 5,
        location: "Mumbai, India",
    },
];
