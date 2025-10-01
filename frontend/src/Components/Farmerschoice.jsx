import { useRef, useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

// Complete product catalog with all items from refined price list
const categories = [  {
    id: "continentals",
    name: "Continentals",
    products: [
      {
        id: "garlic-salami-200g",
        name: "Garlic Salami 200gms",
        description: "Quality garlic salami",
        image: "/images/continentals/GarlicSalami.png",
        price: 350,
        weight: "200g",
      },
      {
        id: "garlic-salami-bulk",
        name: "Garlic Salami - Bulk 1-1.5kg",
        description: "Bulk garlic salami",
        image: "/images/continentals/GarlicSalami.png",
        price: 1350,
        weight: "1kg",
      },
      {
        id: "beef-garlic-salami-200g",
        name: "Beef Garlic Salami 200gms",
        description: "Quality beef garlic salami",
        image: "/images/continentals/Beefgarlicsalami.png",
        price: 350,
        weight: "200g",
      },
      {
        id: "beef-garlic-salami-bulk",
        name: "Beef Garlic Salami -Bulk 1.5kg",
        description: "Bulk beef garlic salami",
        image: "/images/continentals/Beefgarlicsalami.png",
        price: 1350,
        weight: "1kg",
      },
      {
        id: "hungarian-salami-200g",
        name: "Hungarian Salami 200gms",
        description: "Traditional Hungarian salami",
        image: "/images/continentals/ItalianSalami.png",
        price: 420,
        weight: "200g",
      },
      {
        id: "hungarian-salami-bulk",
        name: "Hungarian Salami, Bulk",
        description: "Bulk Hungarian salami",
        image: "/images/continentals/ItalianSalami.png",
        price: 1350,
        weight: "1kg",
      },
      {
        id: "italian-salami-100g",
        name: "Italian (Dry) Pork Salami 100g",
        description: "Italian dry pork salami",
        image: "/images/continentals/ItalianSalami.png",
        price: 700,
        weight: "100g",
      },
      {
        id: "italian-pork-dry-salami-bulk",
        name: "Italian Pork Dry Salami 1-1.5k",
        description: "Bulk Italian pork dry salami",
        image: "/images/continentals/ItalianSalami.png",
        price: 3400,
        weight: "1kg",
      },
      {
        id: "polony-200g",
        name: "Polony 200gms",
        description: "Quality polony",
        image: "/images/continentals/Polony200g.png",
        price: 250,
        weight: "200g",
      },
      {
        id: "polony-bulk",
        name: "Polony, Bulk 2-2.5kg",
        description: "Bulk polony",
        image: "/images/continentals/Polony200g.png",
        price: 965,
        weight: "1kg",
      },
      {
        id: "beef-polony-200g",
        name: "Beef Polony 200gms",
        description: "Quality beef polony",
        image: "/images/continentals/Polony200g.png",
        price: 250,
        weight: "200g",
      },
      {
        id: "beef-polony-bulk",
        name: "Beef Polony, Bulk 2-2.5kg",
        description: "Bulk beef polony",
        image: "/images/continentals/Polony200g.png",
        price: 950,
        weight: "1kg",
      },
      {
        id: "chicken-polony-bulk",
        name: "Chicken Polony, Bulk 2-2.5kg",
        description: "Bulk chicken polony",
        image: "/images/continentals/Polony200g.png",
        price: 950,
        weight: "1kg",
      },
      {
        id: "chicken-sandwich-slices-200g",
        name: "Chicken Sandwich Slices, 200gm",
        description: "Chicken sandwich slices",
        image: "/images/continentals/Polony200g.png",
        price: 300,
        weight: "200g",
      },
      {
        id: "chicken-sandwich-bulk",
        name: "Chicken Sandwich, Bulk 2-2.5kg",
        description: "Bulk chicken sandwich",
        image: "/images/continentals/Polony200g.png",
        price: 990,
        weight: "1kg",
      },
      {
        id: "black-pudding-125g",
        name: "Black Pudding 125gms",
        description: "Traditional black pudding",
        image: "/images/continentals/Polony200g.png",
        price: 70,
        weight: "125g",
      },
      {
        id: "black-pudding-bulk",
        name: "Black Pudding- Bulk 1-1.5kg",
        description: "Bulk black pudding",
        image: "/images/continentals/Polony200g.png",
        price: 480,
        weight: "1kg",
      },
      {
        id: "frankfurters-250g",
        name: "Frankfurters 250gms",
        description: "Quality frankfurters",
        image: "/images/continentals/PorkFrankfurters250g.png",
        price: 260,
        weight: "250g",
      },
      {
        id: "frankfurters-500g",
        name: "Frankfurters 500gms",
        description: "Quality frankfurters",
        image: "/images/continentals/PorkFrankfurter500g.png",
        price: 480,
        weight: "500g",
      },
      {
        id: "frankfurters-500g-ex-long",
        name: "Frankfurters 500gms(ex-long)",
        description: "Extra long frankfurters",
        image: "/images/continentals/PorkFrankfurterXL1kg Export.png",
        price: 480,
        weight: "500g",
      },
      {
        id: "frankfurters-1kg-ex-long",
        name: "Frankfurters 1kg (ex-long)",
        description: "Extra long frankfurters 1kg",
        image: "/images/continentals/PorkFrankfurterXL1kg Export.png",
        price: 920,
        weight: "1kg",
      },
      {
        id: "beef-viennas-250g",
        name: "Beef Viennas 250gms",
        description: "Quality beef viennas",
        image: "/images/continentals/BeefViennas500gms.png",
        price: 260,
        weight: "250g",
      },
      {
        id: "beef-vienna-500g",
        name: "Beef Vienna, 500gms",
        description: "Quality beef vienna",
        image: "/images/continentals/BeefViennas500gms.png",
        price: 480,
        weight: "500g",
      },
      {
        id: "beef-viennas-500g-ex-long",
        name: "Beef Viennas, 500gms Ex-long)",
        description: "Extra long beef viennas",
        image: "/images/continentals/BeefViennas500gms.png",
        price: 480,
        weight: "500g",
      },
      {
        id: "beef-viennas-1kg-extra-long",
        name: "Beef Viennas 1kg (Extra Long)",
        description: "Extra long beef viennas 1kg",
        image: "/images/continentals/BeefViennas500gms.png",
        price: 920,
        weight: "1kg",
      },
      {
        id: "poultry-viennas-250g",
        name: "Poultry Viennas 250gms",
        description: "Quality poultry viennas",
        image: "/images/continentals/FCLPoultryViennas.png",
        price: 260,
        weight: "250g",
      },
      {
        id: "poultry-vienna-500g",
        name: "Poultry Vienna 500gms",
        description: "Quality poultry vienna",
        image: "/images/continentals/PoultryVienna1kg.png",
        price: 480,
        weight: "500g",
      },
      {
        id: "poultry-vienna-ex-long-500g",
        name: "Poultry Vienna Ex-long 500gms",
        description: "Extra long poultry vienna",
        image: "/images/continentals/PoultryVienna1kg.png",
        price: 480,
        weight: "500g",
      },
      {
        id: "poultry-vienna-ex-long-1kg",
        name: "Poultry Vienna Ex-long 1kg",
        description: "Extra long poultry vienna 1kg",
        image: "/images/continentals/PoultryVienna1kg.png",
        price: 920,
        weight: "1kg",
      },
    ],
  },{
    id: "delicatessen",
    name: "Delicatessen",
    products: [
      {
        id: "liver-pate-125g",
        name: "Liver Pate (Leberwurst) 125gms",
        description: "Traditional liver pate",
        image: "/images/Delicatessen/Bratwurst.png",
        price: 180,
        weight: "125g",
      },
      {
        id: "pork-choma-sausage-500g",
        name: "Pork Choma Sausage 500gms",
        description: "Traditional pork choma sausage",
        image: "/images/Delicatessen/BeefChomaSausages.png",
        price: 450,
        weight: "500g",
      },
      {
        id: "pork-choma-sausage-1kg",
        name: "Pork Choma Sausage 1kg",
        description: "Traditional pork choma sausage",
        image: "/images/Delicatessen/BeefChomaSausages.png",
        price: 930,
        weight: "1kg",
      },
      {
        id: "beef-choma-sausage-1kg",
        name: "Beef Choma Sausage 1kg",
        description: "Traditional beef choma sausage",
        image: "/images/Delicatessen/BeefChomaSausages.png",
        price: 930,
        weight: "1kg",
      },
      {
        id: "servelat-ex-long-500g",
        name: "Servelat Ex-Long 500gms",
        description: "Extra long servelat",
        image: "/images/Delicatessen/Servelat500GMS.png",
        price: 430,
        weight: "500g",
      },
      {
        id: "danish-pork-hotdogs-500g",
        name: "Danish Pork Hotdogs 500gms",
        description: "Authentic Danish pork hotdogs",
        image: "/images/Delicatessen/DanishHotdog.png",
        price: 345,
        weight: "500g",
      },
      {
        id: "bratwurst-1kg",
        name: "Bratwurst 1kg",
        description: "Traditional German bratwurst",
        image: "/images/Delicatessen/Bratwurst.png",
        price: 1650,
        weight: "1kg",
      },
      {
        id: "pepperoni-sliced-1kg",
        name: "Pepperoni - Sliced 1kg",
        description: "Sliced pepperoni",
        image: "/images/Delicatessen/PepperoniBulk-01.png",
        price: 1950,
        weight: "1kg",
      },
      {
        id: "kabanosi-400g",
        name: "Kabanosi 400gms",
        description: "Polish kabanos sausage",
        image: "/images/Delicatessen/Kabanos400gms.png",
        price: 350,
        weight: "400g",
      },
      {
        id: "krainer-cheese-400g",
        name: "Krainer With Cheese 400gms",
        description: "Krainer sausage with cheese",
        image: "/images/Delicatessen/KrainerwithCheese400gms.png",
        price: 320,
        weight: "400g",
      },
      {
        id: "krainer-cheese-1kg",
        name: "Krainer With Cheese 1kg",
        description: "Krainer sausage with cheese",
        image: "/images/Delicatessen/KrainerwithCheese400gms.png",
        price: 800,
        weight: "1kg",
      },
    ],
  },{
    id: "sausages",
    name: "Sausages",
    products: [
      // Pork Sausages
      {
        id: "pork-chipolatas-200g",
        name: "Pork Chipolatas 200gms",
        description: "Quality pork chipolatas",
        image: "/images/FCLSausagesPacks/PorkChipolatas200g.png",
        price: 190,
        weight: "200g",
      },
      {
        id: "pork-chipolatas-1kg",
        name: "Pork Chipolatas 1kg",
        description: "Quality pork chipolatas",
        image: "/images/FCLSausagesPacks/PorkChipolatas1kg.png",
        price: 850,
        weight: "1kg",
      },
      {
        id: "pork-sausages-400g",
        name: "Pork Sausages 400gms",
        description: "Quality pork sausages",
        image: "/images/FCLSausagesPacks/PremiumPorkSausages400gcopy.png",
        price: 380,
        weight: "400g",
      },
      {
        id: "spicy-pork-sausages-400g",
        name: "Spicy Pork Sausages 400gms",
        description: "Spicy pork sausages",
        image: "/images/FCLSausagesPacks/SpicyPork_.png",
        price: 420,
        weight: "400g",
      },
      {
        id: "low-fat-pork-sausage-400g",
        name: "Low Fat Pork Sausage 400gms",
        description: "Low fat pork sausage",
        image: "/images/FCLSausagesPacks/LowFatPorkSausages.jpg",
        price: 420,
        weight: "400g",
      },
      {
        id: "pork-garlic-iqf-454g",
        name: "Pork & Garlic IQF Sausages 454gms",
        description: "Pork and garlic IQF sausages",
        image: "/images/FCLSausagesPacks/Pork-&-Garlic-IQF.png",
        price: 380,
        weight: "454g",
      },
      {
        id: "pork-herb-iqf-454g",
        name: "Pork & Herb IQF Sausages 454gms",
        description: "Pork and herb IQF sausages",
        image: "/images/FCLSausagesPacks/IQFPorkSausages.png",
        price: 360,
        weight: "454g",
      },
      {
        id: "pork-cumberland-iqf-454g",
        name: "Pork Cumberland IQF Sausages 454gms",
        description: "Pork Cumberland IQF sausages",
        image: "/images/FCLSausagesPacks/IQFPorkSausages.png",
        price: 360,
        weight: "454g",
      },
      {
        id: "pork-iqf-454g",
        name: "Pork IQF Sausages 454gms",
        description: "Pork IQF sausages",
        image: "/images/FCLSausagesPacks/IQFPorkSausages.png",
        price: 450,
        weight: "454g",
      },
      {
        id: "meaty-pork-sausages-1kg",
        name: "Meaty Pork Sausages 1kg",
        description: "Meaty pork sausages",
        image: "/images/FCLSausagesPacks/MeatyBeefSausages1kg.png",
        price: 720,
        weight: "1kg",
      },
      {
        id: "value-pack-pork-sausages-1kg",
        name: "Value Pack Pork Sausages 1kg",
        description: "Value pack pork sausages",
        image: "/images/FCLSausagesPacks/PorkSausagesCatering2.png",
        price: 680,
        weight: "1kg",
      },
      {
        id: "spicy-pork-sausages-vp-1kg",
        name: "Spicy Pork Sausages V/P 1kg",
        description: "Spicy pork sausages value pack",
        image: "/images/FCLSausagesPacks/SpicyPork_.png",
        price: 680,
        weight: "1kg",
      },
      {
        id: "pork-catering-1kg",
        name: "Pork Catering (Economy) 1kg",
        description: "Pork sausages for catering",
        image: "/images/FCLSausagesPacks/PorkSausagesCatering2.png",
        price: 680,
        weight: "1kg",
      },
      {
        id: "classic-pork-sausages-500g",
        name: "Classic Pork Sausages 500gms",
        description: "Classic pork sausages",
        image: "/images/FCLSausagesPacks/ClassicSafari.png",
        price: 360,
        weight: "500g",
      },
      {
        id: "boerewors-pork-500g",
        name: "Boerewors - Pork 500gms",
        description: "Traditional pork boerewors",
        image: "/images/FCLSausagesPacks/Boerewors 500g.png",
        price: 620,
        weight: "500g",
      },
      {
        id: "pork-sausage-meat-1kg",
        name: "Pork Sausage Meat 1kg",
        description: "Pork sausage meat",
        image: "/images/FCLSausagesPacks/PorkSausagesCatering2.png",
        price: 830,
        weight: "1kg",
      },
      {
        id: "pork-sausage-meat-3kg",
        name: "Pork Sausage Meat 3kgs",
        description: "Pork sausage meat bulk",
        image: "/images/FCLSausagesPacks/PorkSausagesCatering2.png",
        price: 1850,
        weight: "3kg",
      },
      {
        id: "spicy-pork-sausage-meat-3kg",
        name: "Spicy Pork Sausage Meat 3kgs",
        description: "Spicy pork sausage meat bulk",
        image: "/images/FCLSausagesPacks/SpicyPork_.png",
        price: 2750,
        weight: "3kg",
      },
      // Beef Sausages
      {
        id: "beef-chipolatas-200g",
        name: "Beef Chipolatas 200gms",
        description: "Quality beef chipolatas",
        image: "/images/FCLSausagesPacks/BeefChipolatas1kg.png",
        price: 200,
        weight: "200g",
      },
      {
        id: "beef-chipolatas-1kg",
        name: "Beef Chipolatas 1kg",
        description: "Quality beef chipolatas",
        image: "/images/FCLSausagesPacks/BeefChipolatas1kg.png",
        price: 850,
        weight: "1kg",
      },
      {
        id: "meaty-beef-sausages-400g",
        name: "Meaty Beef Sausages 400gms",
        description: "Meaty beef sausages",
        image: "/images/FCLSausagesPacks/MeatyBeefSausages400g.png",
        price: 350,
        weight: "400g",
      },
      {
        id: "spicy-beef-sausages-400g",
        name: "Spicy Beef Sausages 400gms",
        description: "Spicy beef sausages",
        image: "/images/FCLSausagesPacks/SpicyBeefSausages1KG-01.png",
        price: 350,
        weight: "400g",
      },
      {
        id: "low-fat-beef-sausages-400g",
        name: "Low Fat Beef Sausage 400gms",
        description: "Low fat beef sausage",
        image: "/images/FCLSausagesPacks/LowFatBeefSausages.jpg",
        price: 350,
        weight: "400g",
      },
      {
        id: "meaty-beef-sausages-1kg",
        name: "Meaty Beef Sausages 1kg",
        description: "Meaty beef sausages",
        image: "/images/FCLSausagesPacks/MeatyBeefSausages1kg.png",
        price: 850,
        weight: "1kg",
      },
      {
        id: "spicy-beef-sausages-vp-1kg",
        name: "Spicy Beef Sausages V/P 1kg",
        description: "Spicy beef sausages value pack",
        image: "/images/FCLSausagesPacks/SpicyBeefSausages1KG-01.png",
        price: 680,
        weight: "1kg",
      },
      {
        id: "value-pack-beef-sausages-1kg",
        name: "Value Pack Beef Sausages 1kg",
        description: "Value pack beef sausages",
        image: "/images/FCLSausagesPacks/BeefCatering1Kg.png",
        price: 680,
        weight: "1kg",
      },
      {
        id: "beef-sausages-economy-1kg",
        name: "Beef Sausages (Economy) 1kg",
        description: "Economy beef sausages",
        image: "/images/FCLSausagesPacks/BeefCatering1Kg.png",
        price: 680,
        weight: "1kg",
      },
      {
        id: "beef-sausages-safari-500g",
        name: "Beef Sausages (Safari) 500gms",
        description: "Safari beef sausages",
        image: "/images/FCLSausagesPacks/SafariBeef.png",
        price: 350,
        weight: "500g",
      },
      {
        id: "baby-boers-beef-500g",
        name: "Baby Boers - Beef 500gms",
        description: "Baby beef boerewors",
        image: "/images/FCLSausagesPacks/BabyBoers.png",
        price: 550,
        weight: "500g",
      },
      {
        id: "boerewors-beef-500g",
        name: "Boerewors - Beef 500gms",
        description: "Traditional beef boerewors",
        image: "/images/FCLSausagesPacks/DeliBeefBoerewors.png",
        price: 650,
        weight: "500g",
      },
      {
        id: "deli-boerewors-1kg",
        name: "Deli Boerewors Sausages 1kg",
        description: "Delicatessen boerewors sausages",
        image: "/images/FCLSausagesPacks/DeliBeefBoerewors.png",
        price: 795,
        weight: "1kg",
      },
      // Chicken Sausages
      {
        id: "chicken-sausages-400g",
        name: "Chicken Sausages 400gms",
        description: "Quality chicken sausages",
        image: "/images/FCLSausagesPacks/ChickenSausages1kg.png",
        price: 350,
        weight: "400g",
      },
      {
        id: "chicken-sausages-vp-1kg",
        name: "Chicken Sausages Value Pack 1kg",
        description: "Chicken sausages value pack",
        image: "/images/FCLSausagesPacks/ChickenSausages1kg.png",
        price: 680,
        weight: "1kg",
      },
      {
        id: "spicy-chicken-vp-1kg",
        name: "Spicy Chicken Value Pack 1kg",
        description: "Spicy chicken sausages value pack",
        image: "/images/FCLSausagesPacks/SpicyChickenVP1Kg.png",
        price: 680,
        weight: "1kg",
      },
    ],
  },  {
    id: "bacon-hams",
    name: "Bacon & Hams",
    products: [
      {
        id: "back-bacon-200g",
        name: "Back Bacon 200gms",
        description: "Quality back bacon",
        image: "/images/FCLBaconPacks/BackBacon200gms.png",
        price: 580,
        weight: "200g",
      },
      {
        id: "back-bacon-400g",
        name: "Back Bacon 400gms",
        description: "Quality back bacon",
        image: "/images/FCLBaconPacks/BackBacon400gms.png",
        price: 800,
        weight: "400g",
      },
      {
        id: "back-bacon-1kg",
        name: "Back Bacon 1kg",
        description: "Quality back bacon",
        image: "/images/FCLBaconPacks/BackBacon1kg.png",
        price: 1800,
        weight: "1kg",
      },
      {
        id: "streaky-bacon-200g",
        name: "Streaky Bacon 200g",
        description: "Quality streaky bacon",
        image: "/images/FCLBaconPacks/FCLStreakyBacon200g.png",
        price: 380,
        weight: "200g",
      },
      {
        id: "streaky-bacon-400g",
        name: "Streaky Bacon 400gms",
        description: "Quality streaky bacon",
        image: "/images/FCLBaconPacks/StreakyBacon400gmsB.png",
        price: 800,
        weight: "400g",
      },
      {
        id: "streaky-bacon-1kg",
        name: "Streaky Bacon 1kg",
        description: "Quality streaky bacon",
        image: "/images/FCLBaconPacks/StreakyBacon400gmsB.png",
        price: 1690,
        weight: "1kg",
      },
      {
        id: "rindless-bacon-200g",
        name: "Rindless Bacon 200g",
        description: "Rindless bacon",
        image: "/images/FCLBaconPacks/RindlessBacon200g.png",
        price: 510,
        weight: "200g",
      },
      {
        id: "rindless-bacon-400g",
        name: "Rindless Bacon 400gms",
        description: "Rindless bacon",
        image: "/images/FCLBaconPacks/rindlessbacon400g.png",
        price: 520,
        weight: "400g",
      },
      {
        id: "rindless-bacon-1kg",
        name: "Rindless Bacon 1kg",
        description: "Rindless bacon",
        image: "/images/FCLBaconPacks/RindlessBacon1kg.png",
        price: 1200,
        weight: "1kg",
      },
      {
        id: "collar-bacon-100g",
        name: "Collar Bacon 100g",
        description: "Quality collar bacon",
        image: "/images/FCLBaconPacks/CollarBacon100g.png",
        price: 150,
        weight: "100g",
      },
      {
        id: "collar-bacon-400g",
        name: "Collar Bacon 400gms",
        description: "Quality collar bacon",
        image: "/images/FCLBaconPacks/CollarBacon400gms.png",
        price: 580,
        weight: "400g",
      },
      {
        id: "collar-bacon-1kg",
        name: "Collar Bacon 1kg",
        description: "Quality collar bacon",
        image: "/images/FCLBaconPacks/CollarBacon1Kg.png",
        price: 1350,
        weight: "1kg",
      },
      {
        id: "beef-bacon-200g",
        name: "Beef Bacon 200gms",
        description: "Quality beef bacon",
        image: "/images/FCLBaconPacks/BeefBacon200gmsA.png",
        price: 590,
        weight: "200g",
      },
      {
        id: "beef-bacon-400g",
        name: "Beef Bacon 400gms",
        description: "Quality beef bacon",
        image: "/images/FCLBaconPacks/BeefBacon200gmsA.png",
        price: 1100,
        weight: "400g",
      },
      {
        id: "beef-bacon-1kg",
        name: "Beef Bacon 1kg",
        description: "Quality beef bacon",
        image: "/images/FCLBaconPacks/PureBeefBacon.png",
        price: 2200,
        weight: "1kg",
      },
      {
        id: "rindless-boiling-bacon",
        name: "Rindless Boiling Bacon",
        description: "Rindless boiling bacon",
        image: "/images/FCLBaconPacks/RindlessBacon1kg.png",
        price: 1900,
        weight: "0.5-1kg",      },
    ],
  },
  {
    id: "hams",
    name: "Hams",
    products: [
      {
        id: "cooked-gammon-200g",
        name: "Cooked Gammon (Country Ham) 200gm",
        description: "Quality cooked gammon",
        image: "/images/FCLBaconPacks/BackBacon200gms.png",
        price: 350,
        weight: "200g",
      },
      {
        id: "cooked-country-ham-3kg",
        name: "Cooked Country Ham, 3kg",
        description: "Cooked country ham bulk",
        image: "/images/FCLBaconPacks/BackBacon1kg.png",
        price: 1350,
        weight: "1kg",
      },
      {
        id: "cooked-whole-ham",
        name: "Cooked Whole Ham (S.R)",
        description: "Cooked whole ham",
        image: "/images/FCLBaconPacks/BackBacon1kg.png",
        price: 1335,
        weight: "1kg",
      },
      {
        id: "whole-honey-glazed-ham",
        name: "Whole Honey Glazed Ham",
        description: "Whole honey glazed ham",
        image: "/images/FCLBaconPacks/BackBacon1kg.png",
        price: 1200,
        weight: "1kg",
      },
      {
        id: "black-forest-ham-100g",
        name: "Black Forest Ham (Prosciutto) 100gms",
        description: "Black forest ham prosciutto",
        image: "/images/FCLBaconPacks/BackBacon200gms.png",
        price: 900,
        weight: "100g",
      },
      {
        id: "green-gammon-bone-in",
        name: "Green Gammon Bone-in, 5-10kg",
        description: "Green gammon with bone",
        image: "/images/FCLBaconPacks/BackBacon1kg.png",
        price: 800,
        weight: "1kg",
      },
      {
        id: "green-gammon-boneless",
        name: "Green Gammon Boneless, Bulk",
        description: "Green gammon boneless",
        image: "/images/FCLBaconPacks/BackBacon1kg.png",
        price: 950,
        weight: "1kg",
      },
      {
        id: "honey-glazed-ham-bulk",
        name: "Honey Glazed Ham-Bulk, per kg",
        description: "Honey glazed ham bulk",
        image: "/images/FCLBaconPacks/BackBacon1kg.png",
        price: 1800,
        weight: "1kg",
      },
      {
        id: "honey-glazed-smoked-gammon",
        name: "Honey Glazed Smoked Cooked Gammon B'I",
        description: "Honey glazed smoked gammon",
        image: "/images/FCLBaconPacks/BackBacon1kg.png",
        price: 1100,
        weight: "1kg",
      },
      {
        id: "prime-gammon-ham",
        name: "Prime Gammon Ham, Bulk p/kg",
        description: "Prime gammon ham",
        image: "/images/FCLBaconPacks/BackBacon1kg.png",
        price: 1600,
        weight: "1kg",
      },
      {
        id: "smoked-gammon-bone-in",
        name: "Smoked Gammon Bone-in, 5-10kg",
        description: "Smoked gammon with bone",
        image: "/images/FCLBaconPacks/BackBacon1kg.png",
        price: 950,
        weight: "1kg",
      },
      {
        id: "smoked-beef-200g",
        name: "Smoked Beef, 200gms",
        description: "Quality smoked beef",
        image: "/images/FCLBaconPacks/BeefBacon200gmsA.png",
        price: 650,
        weight: "200g",
      },
      {
        id: "smoked-beef-sliced-1kg",
        name: "Smoked Beef - Sliced 1kg",
        description: "Sliced smoked beef",
        image: "/images/FCLBaconPacks/BeefBacon200gmsA.png",
        price: 2500,
        weight: "1kg",
      },
      {
        id: "smoked-beef-bulk",
        name: "Smoked Beef, Bulk",
        description: "Smoked beef bulk",
        image: "/images/FCLBaconPacks/BeefBacon200gmsA.png",
        price: 2400,
        weight: "1kg",
      },
      {
        id: "sandwich-beef-200g",
        name: "Sandwich Beef, 200gms",
        description: "Quality sandwich beef",
        image: "/images/FCLBaconPacks/BeefBacon200gmsA.png",
        price: 260,
        weight: "200g",
      },
      {
        id: "sliced-sandwich-beef-1kg",
        name: "Sliced Sandwich Beef, 1kg",
        description: "Sliced sandwich beef",
        image: "/images/FCLBaconPacks/BeefBacon200gmsA.png",
        price: 1300,
        weight: "1kg",
      },
      {
        id: "sandwich-beef-bulk",
        name: "Sandwich Beef Bulk, per kg",
        description: "Sandwich beef bulk",
        image: "/images/FCLBaconPacks/BeefBacon200gmsA.png",
        price: 1200,
        weight: "1kg",
      },
      {
        id: "sandwich-ham-200g",
        name: "Sandwich Ham, 200gms",
        description: "Quality sandwich ham",
        image: "/images/FCLBaconPacks/BackBacon200gms.png",
        price: 320,
        weight: "200g",
      },
      {
        id: "sliced-sandwich-ham-1kg",
        name: "Sliced Sandwich Ham, 1kg",
        description: "Sliced sandwich ham",
        image: "/images/FCLBaconPacks/BackBacon1kg.png",
        price: 1200,
        weight: "1kg",
      },
      {
        id: "sandwich-ham-bulk",
        name: "Sandwich Ham, Bulk",
        description: "Sandwich ham bulk",
        image: "/images/FCLBaconPacks/BackBacon1kg.png",
        price: 1200,
        weight: "1kg",
      },
    ],
  },  {
    id: "economical",
    name: "Economical Products",
    products: [
      {
        id: "beef-smokies-400g",
        name: "Beef Smokies, 400gms Ex long",
        description: "Extra long beef smokies",
        image: "/images/continentals/Smokies1kg.png",
        price: 300,
        weight: "400g",
      },
      {
        id: "beef-smokies-labless-1kg",
        name: "Beef Smokies Labless 1Kg",
        description: "Beef smokies without labels",
        image: "/images/continentals/Smokies1kg.png",
        price: 540,
        weight: "1kg",
      },
      {
        id: "beef-smokies-bazenga-1kg",
        name: "Beef Smokies Bazenga 1Kg",
        description: "Beef smokies bazenga",
        image: "/images/continentals/Smokies1kg.png",
        price: 540,
        weight: "1kg",
      },
      {
        id: "spicy-beef-smokies-bazenga-1kg",
        name: "Spicy Beef Smokies Bazenga 1Kg",
        description: "Spicy beef smokies bazenga",
        image: "/images/continentals/Smokies1kg.png",
        price: 540,
        weight: "1kg",
      },
      {
        id: "smoked-mini-bites-250g",
        name: "Smoked Mini Bites 250gms",
        description: "Smoked mini bite snacks",
        image: "/images/Minibite/MiniBitesPacks.png",
        price: 200,
        weight: "250g",
      },
      {
        id: "smoked-mini-bites-500g",
        name: "Smoked Mini Bites 500gms",
        description: "Smoked mini bite snacks",
        image: "/images/Minibite/MiniBitesPacks.png",
        price: 360,
        weight: "500g",
      },
      {
        id: "tasty-chicken-mini-bites-500g",
        name: "Tasty Chicken Mini Bites 500gm",
        description: "Tasty chicken mini bites",
        image: "/images/Minibite/MiniBitesPacks.png",
        price: 360,
        weight: "500g",
      },
      {
        id: "nyamabite-125g",
        name: "Nyamabite, 125gms",
        description: "Bite-sized meat snacks",
        image: "/images/Nyamabite/Nyamabite2.png",
        price: 85,
        weight: "125g",
      },
      {
        id: "eazy-peel-sausages-60g",
        name: "Eazy Peel Sausages, 60gms",
        description: "Easy peel sausages",
        image: "/images/FCLSausagesPacks/SoseKadogoo-.png",
        price: 40,
        weight: "60g",
      },
      {
        id: "pork-brawn-sliced-200g",
        name: "Pork Brawn - Sliced, 200gms",
        description: "Sliced pork brawn",
        image: "/images/continentals/Polony200g.png",
        price: 125,
        weight: "200g",
      },
      {
        id: "pork-brawn-sliced-500g",
        name: "Pork Brawn - Sliced, 500gms",
        description: "Sliced pork brawn",
        image: "/images/continentals/Polony200g.png",
        price: 320,
        weight: "500g",
      },
      {
        id: "pork-brawn-sliced-1kg",
        name: "Pork Brawn - Sliced, 1kg",
        description: "Sliced pork brawn",
        image: "/images/continentals/Polony200g.png",
        price: 600,
        weight: "1kg",
      },
      {
        id: "pork-brawn-bulk",
        name: "Pork Brawn - 3-3.5kg",
        description: "Bulk pork brawn",
        image: "/images/continentals/Polony200g.png",
        price: 560,
        weight: "1kg",
      },
      {
        id: "beef-brawn-sliced-200g",
        name: "Beef Brawn- Sliced, 200gms",
        description: "Sliced beef brawn",
        image: "/images/continentals/Polony200g.png",
        price: 145,
        weight: "200g",
      },
      {
        id: "beef-brawn-sliced-500g",
        name: "Beef Brawn - Sliced 500gms",
        description: "Sliced beef brawn",
        image: "/images/continentals/Polony200g.png",
        price: 320,
        weight: "500g",
      },
      {
        id: "beef-brawn-sliced-1kg",
        name: "Beef Brawn - Sliced 1kg",
        description: "Sliced beef brawn",
        image: "/images/continentals/Polony200g.png",
        price: 630,
        weight: "1kg",
      },
      {
        id: "beef-brawn-bulk",
        name: "Beef Brawn 3-3.5 kg",
        description: "Bulk beef brawn",
        image: "/images/continentals/Polony200g.png",
        price: 620,
        weight: "1kg",
      },
      {
        id: "chicken-brawn-sliced-200g",
        name: "Chicken Brawn- Sliced, 200gms",
        description: "Sliced chicken brawn",
        image: "/images/continentals/Polony200g.png",
        price: 120,
        weight: "200g",
      },
      {
        id: "sose-kadogo",
        name: "Sose Kadogo",
        description: "Economical sausages",
        image: "/images/FCLSausagesPacks/SoseKadogoo-.png",
        price: 120,
        weight: "200g",
      },
      {
        id: "collar-kadogo",
        name: "Collar Kadogo",
        description: "Economical collar bacon",
        image: "/images/FCLBaconPacks/CollarKadogoo-01.png",
        price: 180,
        weight: "200g",
      },
    ],
  },
  {
    id: "fresh-meats",
    name: "Fresh Meats",
    products: [
      {
        id: "beef-fillet",
        name: "Beef Fillet",
        description: "Prime beef fillet",
        image: "/images/FCL Fresh cuts/Beefcuts/BeefFillet.png",
        price: 1800,
        weight: "1kg",
      },
      {
        id: "ribeye-steak",
        name: "Ribeye Steak",
        description: "Premium ribeye steak",
        image: "/images/FCL Fresh cuts/Beefcuts/RibEyesteak.png",
        price: 1500,
        weight: "1kg",
      },
      {
        id: "t-bone-steak",
        name: "T-bone Steak",
        description: "Premium T-bone steak",
        image: "/images/FCL Fresh cuts/Beefcuts/T-boneSteak.png",
        price: 1400,
        weight: "1kg",
      },
      {
        id: "rump-steak",
        name: "Rump Steak",
        description: "Quality rump steak",
        image: "/images/FCL Fresh cuts/Beefcuts/RumpSteak.png",
        price: 1200,
        weight: "1kg",
      },
      {
        id: "strip-loin-steak",
        name: "Strip Loin Steak",
        description: "Premium strip loin steak",
        image: "/images/FCL Fresh cuts/Beefcuts/StripLoinSteak.png",
        price: 1350,
        weight: "1kg",
      },
      {
        id: "beef-cubes",
        name: "Beef Cubes",
        description: "Diced beef cubes",
        image: "/images/FCL Fresh cuts/Beefcuts/beefcubes.png",
        price: 950,
        weight: "1kg",
      },
      {
        id: "beef-strips",
        name: "Beef Strips",
        description: "Beef strips for stir-fry",
        image: "/images/FCL Fresh cuts/Beefcuts/BeefStrips.png",
        price: 1100,
        weight: "1kg",
      },
      {
        id: "beef-ribs",
        name: "Beef Ribs",
        description: "Fresh beef ribs",
        image: "/images/FCL Fresh cuts/Beefcuts/BeefRibs.png",
        price: 850,
        weight: "1kg",
      },
      {
        id: "beef-brisket",
        name: "Beef Brisket",
        description: "Quality beef brisket",
        image: "/images/FCL Fresh cuts/Beefcuts/BeefBrisket.png",
        price: 900,
        weight: "1kg",
      },
      {
        id: "whole-silverside",
        name: "Whole Silverside",
        description: "Whole silverside cut",
        image: "/images/FCL Fresh cuts/Beefcuts/Wholesilverside.png",
        price: 850,
        weight: "1kg",
      },
      {
        id: "whole-topside",
        name: "Whole Topside",
        description: "Whole topside cut",
        image: "/images/FCL Fresh cuts/Beefcuts/wholetopside.png",
        price: 900,
        weight: "1kg",
      },
      {
        id: "chuck-and-blade",
        name: "Chuck and Blade (Java)",
        description: "Chuck and blade cut",
        image: "/images/FCL Fresh cuts/Beefcuts/ChuckandBlade(Java).png",
        price: 750,
        weight: "1kg",
      },
      {
        id: "thick-flank",
        name: "Thick Flank (Top Rump)",
        description: "Thick flank cut",
        image: "/images/FCL Fresh cuts/Beefcuts/Thickflank(TopRump).png",
        price: 950,
        weight: "1kg",
      },
      {
        id: "eye-piece",
        name: "Eye Piece",
        description: "Eye piece cut",
        image: "/images/FCL Fresh cuts/Beefcuts/EyePiece.png",
        price: 1050,
        weight: "1kg",
      },
      {
        id: "shin-on-bone",
        name: "Shin on Bone",
        description: "Shin on bone cut",
        image: "/images/FCL Fresh cuts/Beefcuts/Shinonbonewholeshineonbone.png",
        price: 650,
        weight: "1kg",
      },
      {
        id: "barbecue-ribs-bulk",
        name: "Barbecue Ribs Bulk",
        description: "Bulk barbecue ribs",
        image: "/images/FCL Fresh cuts/Beefcuts/BarbequeRibsBulk.png",
        price: 800,
        weight: "1kg",      },
    ],
  },
  {
    id: "miscellaneous-products",
    name: "Miscellaneous Products",
    products: [
      {
        id: "team-pet-food-2kg",
        name: "Team Pet Food, 1x2 kg",
        description: "Pet food for dogs",
        image: "/images/miscellaneous/team-pet-food.png",
        price: 352,
        weight: "2kg",
      },
      {
        id: "beefo-pet-food-2kg",
        name: "Beefo Pet Food, 1x2 kg",
        description: "Pet food for dogs",
        image: "/images/miscellaneous/beefo-pet-food.png",
        price: 352,
        weight: "2kg",
      },
    ],
  },
  {
    id: "pre-packed-fresh-meats",
    name: "Pre Packed Fresh Meats",
    products: [
      {
        id: "frozen-pork-fillet-500g",
        name: "Frozen Pork Fillet 500g",
        description: "Frozen pork fillet",
        image: "/images/fresh-meats/frozen-pork-fillet.png",
        price: 680,
        weight: "500g",
      },
      {
        id: "pork-loin-chops-bin-500g",
        name: "Pork Loin Chops B'In, 500gms",
        description: "Pork loin chops bone-in",
        image: "/images/fresh-meats/pork-loin-chops.png",
        price: 1020,
        weight: "500g",
      },
      {
        id: "frozen-loin-chops-bin-500g",
        name: "Frozen Loin Chops B'In 500g",
        description: "Frozen loin chops bone-in",
        image: "/images/fresh-meats/frozen-loin-chops.png",
        price: 950,
        weight: "500g",
      },
      {
        id: "frozen-belly-spare-ribs-750g",
        name: "Frozen Belly Spare Ribs 750g",
        description: "Frozen belly spare ribs",
        image: "/images/fresh-meats/frozen-belly-spare-ribs.png",
        price: 850,
        weight: "750g",
      },
      {
        id: "frozen-shoulder-chops-500g",
        name: "Frozen Shoulder Chops 500g",
        description: "Frozen shoulder chops",
        image: "/images/fresh-meats/frozen-shoulder-chops.png",
        price: 750,
        weight: "500g",
      },
      {
        id: "frozen-pork-cubes-500g",
        name: "Frozen Pork Cubes 500g",
        description: "Frozen pork cubes",
        image: "/images/fresh-meats/frozen-pork-cubes.png",
        price: 760,
        weight: "500g",
      },
      {
        id: "frozen-pork-leg-steaks-500g",
        name: "Frozen Pork Leg Steaks 500gms",
        description: "Frozen pork leg steaks",
        image: "/images/fresh-meats/frozen-pork-leg-steaks.png",
        price: 580,
        weight: "500g",
      },
      {
        id: "pork-mince-500g",
        name: "Pork Mince, 500 gms",
        description: "Fresh pork mince",
        image: "/images/fresh-meats/pork-mince.png",
        price: 630,
        weight: "500g",
      },
      {
        id: "beef-cubes-500g",
        name: "Beef Cubes, 500 gms",
        description: "Fresh beef cubes",
        image: "/images/fresh-meats/beef-cubes-500g.png",
        price: 700,
        weight: "500g",
      },
      {
        id: "frozen-beef-cubes-500g",
        name: "Frozen Beef Cubes 500gms",
        description: "Frozen beef cubes",
        image: "/images/fresh-meats/frozen-beef-cubes.png",
        price: 730,
        weight: "500g",
      },
      {
        id: "minced-beef-500g-high-grade",
        name: "Minced Beef 500g (High Grade)",
        description: "High grade minced beef",
        image: "/images/fresh-meats/minced-beef-high-grade.png",
        price: 470,
        weight: "500g",
      },
      {
        id: "frozen-beef-mince-500g",
        name: "Frozen Beef Mince 500gm",
        description: "Frozen beef mince",
        image: "/images/fresh-meats/frozen-beef-mince.png",
        price: 300,
        weight: "500g",
      },
      {
        id: "lamb-loin-chops-500g",
        name: "Lamb Loin Chops 500gm",
        description: "Fresh lamb loin chops",
        image: "/images/fresh-meats/lamb-loin-chops.png",
        price: 980,
        weight: "500g",
      },
      {
        id: "lamb-shoulder-chops-500g",
        name: "Lamb Shoulder Chops 500gm",
        description: "Fresh lamb shoulder chops",
        image: "/images/fresh-meats/lamb-shoulder-chops.png",
        price: 580,
        weight: "500g",
      },
    ],
  },
  {
    id: "fresh-pork",
    name: "Fresh Pork",
    products: [
      {
        id: "loin-chops-per-kg",
        name: "Loin Chops, per kg",
        description: "Fresh pork loin chops",
        image: "/images/fresh-pork/loin-chops.png",
        price: 1150,
        weight: "1kg",
      },
      {
        id: "pork-belly-spare-ribs-10kg",
        name: "Pork Belly Spare Ribs, 10 kgs",
        description: "Pork belly spare ribs bulk",
        image: "/images/fresh-pork/belly-spare-ribs.png",
        price: 980,
        weight: "1kg",
      },
      {
        id: "local-belly-spare-ribs-kg",
        name: "Local Belly Spare Ribs/kg",
        description: "Local belly spare ribs",
        image: "/images/fresh-pork/local-belly-spare-ribs.png",
        price: 900,
        weight: "1kg",
      },
      {
        id: "prime-shoulder-ribs-kg",
        name: "Prime Shoulder Ribs,per Kg",
        description: "Prime shoulder ribs",
        image: "/images/fresh-pork/prime-shoulder-ribs.png",
        price: 950,
        weight: "1kg",
      },
      {
        id: "baby-spare-ribs-kg",
        name: "Baby Spare Ribs per Kg",
        description: "Baby spare ribs",
        image: "/images/fresh-pork/baby-spare-ribs.png",
        price: 995,
        weight: "1kg",
      },
      {
        id: "p-belly-bone-in-r-on-kg",
        name: "P-Belly Bone-In R-On /kg",
        description: "Pork belly bone-in rind-on",
        image: "/images/fresh-pork/belly-bone-in.png",
        price: 1250,
        weight: "1kg",
      },
      {
        id: "p-belly-boneless-rindless-kg",
        name: "P-Belly B/less R/less /kg",
        description: "Pork belly boneless rindless",
        image: "/images/fresh-pork/belly-boneless.png",
        price: 1250,
        weight: "1kg",
      },
      {
        id: "pork-belly-boneless-rind-on",
        name: "Pork Belly Boneless Rind On",
        description: "Pork belly boneless rind on",
        image: "/images/fresh-pork/belly-boneless-rind-on.png",
        price: 1250,
        weight: "1kg",
      },
      {
        id: "pork-belly-slices-kg",
        name: "Pork Belly Slices/Kg",
        description: "Pork belly slices",
        image: "/images/fresh-pork/belly-slices.png",
        price: 990,
        weight: "1kg",
      },
      {
        id: "pork-hand-boneless",
        name: "Pork Hand Boneless",
        description: "Pork hand boneless",
        image: "/images/fresh-pork/hand-boneless.png",
        price: 900,
        weight: "1kg",
      },
      {
        id: "rolled-shoulder-kg",
        name: "Rolled Shoulder, Per Kg",
        description: "Rolled shoulder",
        image: "/images/fresh-pork/rolled-shoulder.png",
        price: 1050,
        weight: "1kg",
      },
      {
        id: "shoulder-bin-ron-kg",
        name: "Shoulder B/In R/On /kg",
        description: "Shoulder bone-in rind-on",
        image: "/images/fresh-pork/shoulder-bone-in.png",
        price: 1100,
        weight: "1kg",
      },
      {
        id: "shoulder-chops-kg",
        name: "Shoulder Chops, Per Kg",
        description: "Shoulder chops",
        image: "/images/fresh-pork/shoulder-chops.png",
        price: 1400,
        weight: "1kg",
      },
      {
        id: "pork-vikings-kg",
        name: "Pork Vikings Per Kg",
        description: "Pork vikings",
        image: "/images/fresh-pork/pork-vikings.png",
        price: 530,
        weight: "1kg",
      },
      {
        id: "local-belly-spare-ribs-500g",
        name: "Local Belly Spare Ribs, 500 gms",
        description: "Local belly spare ribs",
        image: "/images/fresh-pork/local-belly-spare-ribs-500g.png",
        price: 430,
        weight: "500g",
      },
      {
        id: "prime-shoulder-ribs-500g",
        name: "Prime Shoulder Ribs, 500 gms",
        description: "Prime shoulder ribs",
        image: "/images/fresh-pork/prime-shoulder-ribs-500g.png",
        price: 430,
        weight: "500g",
      },
      {
        id: "meat-on-bone-pork-500g",
        name: "Meat on Bone Pork, 500 gms",
        description: "Meat on bone pork",
        image: "/images/fresh-pork/meat-on-bone.png",
        price: 350,
        weight: "500g",
      },
      {
        id: "beef-sirloin-kg",
        name: "Beef Sirloin, Per Kg",
        description: "Beef sirloin",
        image: "/images/fresh-beef/beef-sirloin.png",
        price: 1500,
        weight: "1kg",
      },
      {
        id: "beef-striploin-kg",
        name: "Beef Striploin, Per Kg",
        description: "Beef striploin",
        image: "/images/fresh-beef/beef-striploin.png",
        price: 1560,
        weight: "1kg",
      },
      {
        id: "barbecue-beef-ribs-kg",
        name: "Barbecue Beef Ribs per kg",
        description: "Barbecue beef ribs",
        image: "/images/fresh-beef/barbecue-beef-ribs.png",
        price: 700,
        weight: "1kg",
      },
    ],
  },
  {
    id: "fresh-beef-cont",
    name: "Fresh Beef (Cont.)",
    products: [
      {
        id: "beef-casserole-kg",
        name: "Beef Casserole/Kg",
        description: "Beef casserole cuts",
        image: "/images/fresh-beef/beef-casserole.png",
        price: 650,
        weight: "1kg",
      },
      {
        id: "minced-beef-high-grade-kg",
        name: "Minced Beef (High Grade), Kg",
        description: "High grade minced beef",
        image: "/images/fresh-beef/minced-beef-high-grade.png",
        price: 590,
        weight: "1kg",
      },
      {
        id: "osubuko-shin-on-bone",
        name: "Osubuko (Shin on Bone)",
        description: "Shin on bone",
        image: "/images/fresh-beef/osubuko.png",
        price: 760,
        weight: "1kg",
      },
      {
        id: "ox-tail-kg",
        name: "Ox-Tail per kg",
        description: "Fresh ox-tail",
        image: "/images/fresh-beef/ox-tail.png",
        price: 510,
        weight: "1kg",
      },
      {
        id: "meaty-soup-bones-5kg",
        name: "Meaty Soup Bones,5kgs",
        description: "Meaty soup bones",
        image: "/images/fresh-beef/soup-bones.png",
        price: 1100,
        weight: "5kg",
      },
    ],
  },
  {
    id: "fresh-burgers",
    name: "Fresh Burgers",
    products: [
      {
        id: "fresh-beef-burgers-1kg",
        name: "Fresh Beef Burgers, 1kg",
        description: "Fresh beef burger patties",
        image: "/images/fresh-burgers/beef-burgers-1kg.png",
        price: 790,
        weight: "1kg",
      },
      {
        id: "fresh-beef-burger-400g",
        name: "Fresh Beef Burger 400gms",
        description: "Fresh beef burger patties",
        image: "/images/fresh-burgers/beef-burger-400g.png",
        price: 350,
        weight: "400g",
      },
      {
        id: "chicken-burger-1kg",
        name: "Chicken Burger 1 kg",
        description: "Chicken burger patties",
        image: "/images/fresh-burgers/chicken-burger-1kg.png",
        price: 790,
        weight: "1kg",
      },
      {
        id: "chicken-burger-400g",
        name: "Chicken Burger 400gms",
        description: "Chicken burger patties",
        image: "/images/fresh-burgers/chicken-burger-400g.png",
        price: 350,
        weight: "400g",
      },
      {
        id: "meat-balls-1kg",
        name: "Meat Balls, 1 Kg",
        description: "Fresh meat balls",
        image: "/images/fresh-burgers/meat-balls.png",
        price: 700,
        weight: "1kg",
      },
      {
        id: "savoury-meat-balls-300g",
        name: "Savoury Meat Balls, 300 gms",
        description: "Savoury meat balls",
        image: "/images/fresh-burgers/savoury-meat-balls.png",
        price: 255,
        weight: "300g",
      },
    ],
  },
  {
    id: "fresh-lamb",
    name: "Fresh Lamb",
    products: [
      {
        id: "whole-lamb-14-18kg",
        name: "Whole Lamb 14-18kg",
        description: "Whole lamb carcass",
        image: "/images/fresh-lamb/whole-lamb.png",
        price: 900,
        weight: "1kg",
      },
      {
        id: "lamb-leg-kg",
        name: "Lamb Leg /kg",
        description: "Fresh lamb leg",
        image: "/images/fresh-lamb/lamb-leg.png",
        price: 850,
        weight: "1kg",
      },
      {
        id: "lamb-leg-boneless-2-2kg",
        name: "Lamb Leg B'less 2.2kg",
        description: "Boneless lamb leg",
        image: "/images/fresh-lamb/lamb-leg-boneless.png",
        price: 1200,
        weight: "1kg",
      },
      {
        id: "lamb-shoulder-chops-kg",
        name: "Lamb Shoulder Chops /kg",
        description: "Lamb shoulder chops",
        image: "/images/fresh-lamb/lamb-shoulder-chops.png",
        price: 900,
        weight: "1kg",
      },
      {
        id: "lamb-loin-bone-in-kg",
        name: "Lamb Loin, Bone In /kg",
        description: "Lamb loin bone-in",
        image: "/images/fresh-lamb/lamb-loin-bone-in.png",
        price: 1650,
        weight: "1kg",
      },
      {
        id: "lamb-loin-chops-kg",
        name: "Lamb Loin Chops /kg",
        description: "Lamb loin chops",
        image: "/images/fresh-lamb/lamb-loin-chops.png",
        price: 1800,
        weight: "1kg",
      },
      {
        id: "frenched-lamb-loin-chops-kg",
        name: "Frenched Lamb Loin Chops/kg",
        description: "Frenched lamb loin chops",
        image: "/images/fresh-lamb/frenched-lamb-loin-chops.png",
        price: 3200,
        weight: "1kg",
      },
      {
        id: "lamb-casserole",
        name: "Lamb Casserole",
        description: "Lamb casserole cuts",
        image: "/images/fresh-lamb/lamb-casserole.png",
        price: 400,
        weight: "1kg",
      },
    ],
  },
];

export default function Farmerschoice() {
  const categoryScrollRef = useRef(null);
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories.length > 0 ? categories[0].id : "continentals");
  const [showDescription, setShowDescription] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Changed to false for faster loading
  const [categoryScrollAtStart, setCategoryScrollAtStart] = useState(true);
  const [categoryScrollAtEnd, setCategoryScrollAtEnd] = useState(false);

  useEffect(() => {
    // Reduced loading time for better performance
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  const toggleDescription = (id) => {
    setShowDescription(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Category scroll functions
  const checkCategoryScrollPosition = () => {
    if (!categoryScrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
    setCategoryScrollAtStart(scrollLeft === 0);
    setCategoryScrollAtEnd(scrollLeft >= scrollWidth - clientWidth - 10);
  };

  const scrollCategoryNav = (direction) => {
    if (!categoryScrollRef.current) return;
    
    const scrollAmount = 200; // Adjust scroll amount as needed
    categoryScrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Check scroll position on mount and scroll
  useEffect(() => {
    const container = categoryScrollRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', checkCategoryScrollPosition);
    checkCategoryScrollPosition(); // Initial check
    
    return () => container.removeEventListener('scroll', checkCategoryScrollPosition);
  }, []);

  return (
    <div className="bg-[#fafafa] min-h-screen">      {/* Enhanced Hero Section with Farmer's Choice theme */}
      <div 
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/meat-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#A31621]/90 to-[#7A0E16]/90"></div>
        <div className="container mx-auto relative z-10 py-6 px-4">
          <div className="flex items-center justify-between">
            {/* Farmer's Choice Logo - Left Side */}
            <div className="flex items-center">
              <img 
                src="/images/farmer.png" 
                alt="Farmer's Choice Logo"
                className="w-16 h-16 md:w-20 md:h-20 object-contain mr-4"
                loading="eager"
              />
              <div>
                <motion.h1 
                  className="text-2xl md:text-3xl font-bold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Farmer's Choice Selection
                </motion.h1>
                <motion.p 
                  className="text-sm md:text-base text-white/90"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Kenya's finest meats since 1970
                </motion.p>
              </div>
            </div>
            
            {/* Category Quick Nav - Right Side */}
            <motion.div 
              className="hidden md:flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {categories.slice(0, 4).map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-white text-[#A31621]'
                      : 'bg-white/10 text-white/90 hover:bg-white/20'
                  }`}
                >
                  {category.name.split(' ')[0]}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>      {/* Category Navigation with Horizontal Scroll */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* Left scroll arrow */}
            <button
              onClick={() => scrollCategoryNav("left")}
              disabled={categoryScrollAtStart}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-30 bg-white rounded-full p-2 shadow-lg transition-colors ${
                categoryScrollAtStart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#A31621] hover:text-white'
              }`}
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {/* Right scroll arrow */}
            <button
              onClick={() => scrollCategoryNav("right")}
              disabled={categoryScrollAtEnd}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-30 bg-white rounded-full p-2 shadow-lg transition-colors ${
                categoryScrollAtEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#A31621] hover:text-white'
              }`}
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* Category buttons container */}
            <div 
              ref={categoryScrollRef}
              className="flex overflow-x-auto scrollbar-hide py-3 space-x-4"
            >
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === category.id
                      ? 'bg-[#A31621] text-white shadow-red-sm'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>{/* Loading Skeleton */}
      {isLoading && (
        <div className="container mx-auto py-8 px-4">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="h-6 bg-gray-200 rounded w-32 mb-1"></div>
                  <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div className="flex overflow-x-auto space-x-4 pb-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-52 bg-white rounded-lg shadow-sm overflow-hidden border">
                    <div className="h-36 bg-gray-200 animate-pulse"></div>
                    <div className="p-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Sections */}
      {!isLoading && (
        <div className="container mx-auto py-8 px-4">
          {categories.map((category) => (
            <ProductsSection 
              key={category.id} 
              category={category} 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              showDescription={showDescription}
              toggleDescription={toggleDescription}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductsSection({ category, favorites, toggleFavorite, showDescription, toggleDescription }) {
  const scrollRef = useRef(null);
  const { addToCart, cartItems } = useContext(CartContext);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  
  // Get quantity of product in cart
  const getQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  // Check scroll position
  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(scrollLeft >= scrollWidth - clientWidth - 10);
  };

  // Scroll handler
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 3 * 224 + 2 * 20; // 3 cards width + gaps
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Handle scroll events
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', checkScrollPosition);
    return () => container.removeEventListener('scroll', checkScrollPosition);
  }, []);

  return (
    <section 
      className="mb-16" 
      id={category.id}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#102542]">
            {category.name}
          </h2>
          <div className="w-16 h-1 bg-[#A31621] rounded-full mt-1"></div>
        </div>
      </div>

      {/* Products Carousel */}
      <div className="relative">
        {/* Floating arrows with hover effect */}
        <button
          onClick={() => scroll("left")}
          disabled={isAtStart}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg transition-colors ${
            isAtStart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#A31621] hover:text-white'
          }`}
          aria-label={`Scroll ${category.name} left`}
        >
          <ChevronLeft className="w-5 h-5 text-[#A31621] hover:text-white" />
        </button>
        
        <button
          onClick={() => scroll("right")}
          disabled={isAtEnd}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg transition-colors ${
            isAtEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#A31621] hover:text-white'
          }`}
          aria-label={`Scroll ${category.name} right`}
        >
          <ChevronRight className="w-5 h-5 text-[#A31621] hover:text-white" />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide space-x-5 pb-8 px-1"
        >
          {category.products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isFavorite={favorites.includes(product.id)}
              toggleFavorite={() => toggleFavorite(product.id)}
              quantityInCart={getQuantity(product.id)}
              addToCart={() => addToCart({...product, quantity: 1})}
              showDescription={showDescription[product.id] || false}
              toggleDescription={() => toggleDescription(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ 
  product, 
  isFavorite,
  toggleFavorite,
  quantityInCart,
  addToCart,
  showDescription,
  toggleDescription
}) {
  const [showCartFeedback, setShowCartFeedback] = useState(false);
  const [quantity, setQuantity] = useState(quantityInCart || 0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart({...product, quantity: newQuantity});
    setShowCartFeedback(true);
    setTimeout(() => setShowCartFeedback(false), 1000);
  };
  return (
    <motion.div
      className="flex-shrink-0 w-56 bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100 relative group"
      whileHover={{ y: -5 }}
      layout
    >
      <div className="relative h-44">
        {/* Optimized Loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer flex items-center justify-center">
            <div className="text-gray-400 text-xs">Loading...</div>
          </div>
        )}
        
        {/* Optimized Product image - removed lazy loading for better performance */}
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            decoding="async"
            fetchPriority="high"
          />
        ) : (
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-full h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">No image</span>
            </div>
          </div>
        )}
        
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 p-1.5 rounded-full ${
            isFavorite ? "text-[#A31621]" : "text-gray-400"
          } bg-white/80 backdrop-blur-sm shadow-sm`}
        >
          <Heart 
            className="w-4 h-4" 
            fill={isFavorite ? "#A31621" : "none"} 
            strokeWidth={1.5}
          />
        </button>
        
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          {product.weight}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 
            className="text-sm font-bold text-[#333333] cursor-pointer flex items-center justify-between"
            onClick={toggleDescription}
          >
            <span className="line-clamp-1 mr-1">{product.name}</span>
            <svg 
              className={`w-4 h-4 transition-transform ${showDescription ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </h3>
          {showDescription && (
            <p className="text-xs text-[#666666] mt-2">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-base font-bold text-[#A31621]">
            Ksh {product.price.toLocaleString()}
          </p>
          
          {/* Add to Cart Button */}
          <div className="flex items-center">
            {quantity > 0 ? (
              <div className="flex items-center border border-gray-300 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(0, quantity - 1))}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full"
                >
                  -
                </button>
                <span className="px-2 text-sm font-medium min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all bg-gray-100 text-red-700 hover:bg-red-100"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cart Feedback Animation */}
      <AnimatePresence>
        {showCartFeedback && (
          <motion.div
            className="absolute top-0 left-0 right-0 bg-[#A31621] text-white text-center py-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <span className="text-xs font-medium">Added to cart!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}