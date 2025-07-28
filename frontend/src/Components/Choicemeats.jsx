import { useRef, useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

// Halal product catalog with all pork products removed
const categories = [
  {
    id: "continentals",
    name: "Continentals",
    products: [
      {
        id: "continental-1",
        name: "Beef continental salami",
        description: "Assorted premium Italian cured meats",
        image: "/images/continentals/Beefcontinentalsalami.png",
        price: 2400,
        weight: "200gms",
      },
      {
        id: "continental-2",
        name: "BEEF GARLIC SALAMI",
        description: "Luxurious duck and chicken liver pâtés",
        image: "/images/continentals/Beefgarlicsalami.png",
        price: 1800,
        weight: "200g",
      },
      {
        id: "continental-3",
        name: "German Bratwurst",
        description: "Traditional German sausage",
        image: "/images/continentals/BeefViennas500g.png",
        price: 1500,
        weight: "600g",
      },
      {
        id: "continental-4",
        name: "Beef Viennas 500gms",
        description: "Premium acorn-fed ham",
        image: "/images/continentals/BeefViennas500gms.png",
        price: 3500,
        weight: "300g",
      },
      {
        id: "continental-5",
        name: "FCL Poultry Viennas",
        description: "Assorted Swiss cheeses",
        image: "/images/continentals/FCLPoultryViennas.png",
        price: 2200,
        weight: "500g",
      },
      {
        id: "continental-6",
        name: "Garlic Salami ",
        description: "Kalamata and green olives",
        image: "/images/continentals/GarlicSalami.png",
        price: 950,
        weight: "400g",
      },
      {
        id: "continental-7",
        name: "Italian Salami ",
        description: "Cured meats, cheeses and vegetables",
        image: "/images/continentals/ItalianSalami.png",
        price: 2800,
        weight: "750g",
      },
      {
        id: "continental-8",
        name: "Polony 200g",
        description: "Creamy French brie cheese",
        image: "/images/continentals/Polony200g.png",
        price: 1600,
        weight: "400g",
      },
      {
        id: "continental-13",
        name: "Poultry  Vienna 1kg ",
        description: "Smoked premium ham",
        image: "/images/continentals/PoultryVienna1kg.png",
        price: 2100,
        weight: "1kg",
      },
      {
        id: "continental-14",
        name: "Poultry Viennas 250g",
        description: "Spicy cured sausage",
        image: "/images/continentals/PoultryViennas250g.png",
        price: 1700,
        weight: "250g",
      },
      {
        id: "continental-15",
        name: "Smokie Updated3",
        description: "Bologna sausage with pistachios",
        image: "/images/continentals/SmokieUpdated3.png",
        price: 1400,
        weight: "500g",
      },
      {
        id: "continental-16",
        name: "Smokies 1kg",
        description: "Soft ripened cheese",
        image: "/images/continentals/Smokies1kg.png",
        price: 1500,
        weight: "250g",
      },
      {
        id: "continental-17",
        name: "Smokies 900g",
        description: "Fermented cabbage",
        image: "/images/continentals/Smokies900g.png",
        price: 700,
        weight: "500g",
      },
      {
        id: "continental-18",
        name: "Polony 200g_",
        description: "Marinated in olive oil",
        image: "/images/continentals/Polony200g_.jpg",
        price: 1200,
        weight: "200g",
      }
    ]
  },
  {
    id: "delicatessen",
    name: "Delicatessen",
    products: [
      {
        id: "delicatessen-1",
        name: "Beef Choma Sausages",
        description: "Aged Italian dry-cured ham",
        image: "/images/Delicatessen/BeefChomaSausages.png",
        price: 3200,
        weight: "300g",
      },
      {
        id: "delicatessen-2",
        name: "Beef Pastarami",
        description: "Spicy cured sausage with smoked paprika",
        image: "/images/Delicatessen/BeefPastarami.png",
        price: 1500,
        weight: "400g",
      },
      {
        id: "delicatessen-3",
        name: "Bratwurst",
        description: "Luxury duck liver pâté",
        image: "/images/Delicatessen/Bratwurst.png",
        price: 4200,
        weight: "200g",
      },
      {
        id: "delicatessen-4",
        name: "choma sausages copy",
        description: "Italian salami with black truffle",
        image: "/images/Delicatessen/chomasausagescopy.png",
        price: 2800,
        weight: "350g",
      },
      {
        id: "delicatessen-5",
        name: "Danish Hotdog",
        description: "Spanish dry-cured ham",
        image: "/images/Delicatessen/DanishHotdog.png",
        price: 2900,
        weight: "300g",
      },
      {
        id: "delicatessen-6",
        name: "FC Kassler",
        description: "Norwegian cold-smoked salmon",
        image: "/images/Delicatessen/FCKassler.png",
        price: 2500,
        weight: "250g",
      },
      {
        id: "delicatessen-7",
        name: "Kabanos 400gms",
        description: "Game meat sausage with juniper",
        image: "/images/Delicatessen/Kabanos400gms.png",
        price: 2100,
        weight: "400g",
      },
      {
        id: "delicatessen-8",
        name: "Krainer with Cheese 400gms",
        description: "French preserved duck",
        image: "/images/Delicatessen/KrainerwithCheese400gms.png",
        price: 1900,
        weight: "300g",
      },
      {
        id: "delicatessen-9",
        name: "Pepperoni Bulk-01",
        description: "Italian wild boar salami",
        image: "/images/Delicatessen/PepperoniBulk-01.png",
        price: 2300,
        weight: "350g",
      },
      {
        id: "delicatessen-10",
        name: "Servelat 500GMS",
        description: "Brie with black truffle",
        image: "/images/Delicatessen/Servelat500GMS.png",
        price: 2600,
        weight: "250g",
      },
      {
        id: "delicatessen-11",
        name: "FC Kassler",
        description: "Premium sturgeon caviar",
        image: "/images/Delicatessen/FCKassler.png",
        price: 8500,
        weight: "100g",
      },
      {
        id: "delicatessen-12",
        name: "Spicy Russian Sausage 2",
        description: "South African biltong",
        image: "/images/Delicatessen/SpicyRussianSausage2.png",
        price: 1800,
        weight: "300g",
      }
    ]
  },
  {
    id: "cold-deli",
    name: "Cold Deli Products",
    products: [
      {
        id: "cold-deli-1",
        name: "Beef Brawn 3-3.5kg",
        description: "Creamy chicken with herbs and vegetables",
        image: "/images/FCColdDeliProducts/BeefBrawn3-3.5kg.png",
        price: 850,
        weight: "3-3.5kg",
      },
      {
        id: "cold-deli-2",
        name: "Beef Pastarami",
        description: "Classic recipe with mayonnaise and herbs",
        image: "/images/FCColdDeliProducts/BeefPastarami.png",
        price: 650,
        weight: "300g",
      },
      {
        id: "cold-deli-3",
        name: "CFG Salami Palaciego",
        description: "Fresh cabbage and carrot mix",
        image: "/images/FCColdDeliProducts/CFGSalamiPalaciego.png",
        price: 550,
        weight: "300g",
      },
      {
        id: "cold-deli-4",
        name: "CFG Salami Palaciego",
        description: "Tri-color pasta with vegetables",
        image: "/images/FCColdDeliProducts/CFGSalamiPalaciego.png",
        price: 750,
        weight: "350g",
      },
      {
        id: "cold-deli-5",
        name: "CFG Salami with Herb",
        description: "Creamy egg salad with chives",
        image: "/images/FCColdDeliProducts/CFGSalamiwithHerb.png",
        price: 700,
        weight: "250g",
      },
      {
        id: "cold-deli-6",
        name: "CFG Salami with Pepper",
        description: "Feta, olives and vegetables",
        image: "/images/FCColdDeliProducts/CFGSalamiwithPepper.png",
        price: 900,
        weight: "300g",
      },
      {
        id: "cold-deli-7",
        name: "Chicken Brawn Bulk 6kg-7kg",
        description: "Flaked tuna with mayonnaise",
        image: "/images/FCColdDeliProducts/ChickenBrawnBulk6kg-7kg.png",
        price: 800,
        weight: "6kg-7kg",
      },
      {
        id: "cold-deli-8",
        name: "Chicken Sandwich Bulk",
        description: "Roasted beetroot with feta",
        image: "/images/FCColdDeliProducts/ChickenSandwichBulk.jpg",
        price: 750,
        weight: "1kg",
      },
      {
        id: "cold-deli-10",
        name: "FC Beef Brawn 1Kg",
        description: "Apple, walnut and celery",
        image: "/images/FCColdDeliProducts/FCBeefBrawn1Kg.png",
        price: 850,
        weight: "1kg",
      },
      {
        id: "cold-deli-11",
        name: "FC Kassler",
        description: "Classic chickpea dip",
        image: "/images/FCColdDeliProducts/FCKassler.png",
        price: 600,
        weight: "250g",
      },
      {
        id: "cold-deli-13",
        name: "FCL Country Ham Bulk",
        description: "Smoky eggplant dip",
        image: "/images/FCColdDeliProducts/FCLCountryHamBulk.png",
        price: 700,
        weight: "2kg",
      },
      {
        id: "cold-deli-14",
        name: "Honey Glazed Ham A",
        description: "Olive and caper spread",
        image: "/images/FCColdDeliProducts/HoneyGlazedHamA.png",
        price: 750,
        weight: "200g",
      },
      {
        id: "cold-deli-18",
        name: "Sandwich Ham Beef",
        description: "Cured meats and cheeses",
        image: "/images/FCColdDeliProducts/SandwichHamBeef.png",
        price: 2800,
        weight: "1kg",
      },
    ]
  },
  {
    id: "beefcuts",
    name: "Beefcuts", // Changed from "Beefcuts"
    products: [
      {
        id: 1,
        name: "Beef Ribeye",
        description: "Grass-fed, well-marbled",
        image: "/images/FCL Fresh cuts/Beefcuts/BarbequeRibsBulk2.png",
        price: 1800,
        weight: "500g",
      },
      {
        id: 2,
        name: "beef barbeque ribs sliced 2",
        description: "Lean ground beef",
        image: "/images/FC Fresh cuts/Beefcuts/BarbequeRibsBulk.png",
        price: 750,
        weight: "500g",
      },
      {
        id: 3,
        name: "beef barbeque ribs sliced 2",
        description: "Premium cut with tenderloin and strip",
        image: "/images/FCL Fresh cuts/Beefcuts/beefbarbequeribssliced2.png",
        price: 2200,
        weight: "600g",
      },
      {
        id: 4,
        name: "beef barbeque ribs sliced",
        description: "Tender center cut",
        image: "/images/FCL Fresh cuts/Beefcuts/beefbarbequeribssliced.png",
        price: 2800,
        weight: "400g",
      },
      {
        id: 5,
        name: "Beef Brisket 2",
        description: "Juicy and flavorful cut",
        image: "/images/FCL Fresh cuts/Beefcuts/BeefBrisket2.png",
        price: 1600,
        weight: "450g",
      },
      {
        id: 6,
        name: "Beef Brisket",
        description: "Lean and beefy flavor",
        image: "/images/FCL Fresh cuts/Beefcuts/BeefBrisket.png",
        price: 1400,
        weight: "500g",
      },
      {
        id: 7,
        name: "Beef cubes 1",
        description: "Perfect for slow cooking",
        image: "/images/FCL Fresh cuts/Beefcuts/Beefcubes1.png",
        price: 1200,
        weight: "1kg",
      },
      {
        id: 8,
        name: "beef cubes",
        description: "Meaty and flavorful",
        image: "/images/FCL Fresh cuts/Beefcuts/beefcubes.png",
        price: 1700,
        weight: "800g",
      },
      {
        id: 9,
        name: "Beef Fillet protein",
        description: "Great for grilling",
        image: "/images/FCL Fresh cuts/Beefcuts/BeefFilletprotein.png",
        price: 1500,
        weight: "600g",
      },
      {
        id: 10,
        name: "Beef Fillet",
        description: "Ideal for pot roasts",
        image: "/images/FCL Fresh cuts/Beefcuts/BeefFillet.png",
        price: 1300,
        weight: "1kg",
      },
      {
        id: 11,
        name: "Beef Ribs 2",
        description: "Flavorful for fajitas",
        image: "/images/FCL Fresh cuts/Beefcuts/BeefRibs2.png",
        price: 1450,
        weight: "500g",
      },
      {
        id: 12,
        name: "Beef Ribs",
        description: "Rich and gelatinous",
        image: "/images/FCL Fresh cuts/Beefcuts/BeefRibs.png",
        price: 1100,
        weight: "500g",
      },
      {
        id: 13,
        name: "Beef Strips",
        description: "Impressive ribeye with bone",
        image: "/images/FCL Fresh cuts/Beefcuts/BeefStrips.png",
        price: 3500,
        weight: "1.2kg",
      },
      {
        id: 14,
        name: "Chuck and Blade (Java)",
        description: "Butcher's cut with great flavor",
        image: "/images/FCL Fresh cuts/Beefcuts/ChuckandBlade(Java).png",
        price: 1900,
        weight: "450g",
      },
      {
        id: 15,
        name: "diced cubes bone in",
        description: "California cut for grilling",
        image: "/images/FCL Fresh cuts/Beefcuts/dicedcubesbonein.png",
        price: 1700,
        weight: "700g",
      },
      {
        id: 16,
        name: "Eye Piece 2",
        description: "Tender when slow cooked",
        image: "/images/FCL Fresh cuts/Beefcuts/EyePiece2.png",
        price: 950,
        weight: "400g",
      },
      {
        id: 17,
        name: "Eye Piece",
        description: "Lean cut for roasting",
        image: "/images/FCL Fresh cuts/Beefcuts/EyePiece.png",
        price: 1250,
        weight: "800g",
      },
      {
        id: 18,
        name: "Half sir loin T- Bone joint 2",
        description: "Great for braising",
        image: "/images/FCL Fresh cuts/Beefcuts/HalfsirloinT-Bonejoint2.png",
        price: 1150,
        weight: "800g",
      },
      {
        id: 19,
        name: "Half sir loin T- Bone joint",
        description: "Lean for roasting",
        image: "/images/FCL Fresh cuts/Beefcuts/HalfsirloinT-Bonejoint.png",
        price: 1350,
        weight: "700g",
      },
      {
        id: 20,
        name: "Half Strip Loin Boneless",
        description: "Ideal for soups",
        image: "/images/FCL Fresh cuts/Beefcuts/HalfStripLoinBoneless.png",
        price: 900,
        weight: "600g",
      },
      {
        id: 21,
        name: "New York Strip Loin",
        description: "Large T-bone cut",
        image: "/images/FCL Fresh cuts/Beefcuts/NewYorkStripLoin.png",
        price: 3000,
        weight: "900g",
      },
      {
        id: 22,
        name: "Rib Eye steak bone in",
        description: "Tender shoulder cut",
        image: "/images/FCL Fresh cuts/Beefcuts/RibEyesteakbonein.png",
        price: 1750,
        weight: "500g",
      },
      {
        id: 23,
        name: "Rib Eye steak",
        description: "Tender when cooked slowly",
        image: "/images/FCL Fresh cuts/Beefcuts/RibEyesteak.png",
        price: 850,
        weight: "500g",
      },
      {
        id: 24,
        name: "Rump Steak",
        description: "Rich in nutrients",
        image: "/images/FCL Fresh cuts/Beefcuts/RumpSteak.png",
        price: 700,
        weight: "400g",
      },
      {
        id: 25,
        name: "Shin on bone whole shine on bone",
        description: "For pies and stews",
        image: "/images/FCL Fresh cuts/Beefcuts/Shinonbonewholeshineonbone.png",
        price: 650,
        weight: "300g",
      },
      {
        id: 26,
        name: "Strip LoinSteak",
        description: "Lean and flavorful",
        image: "/images/FCL Fresh cuts/Beefcuts/StripLoinSteak.png",
        price: 750,
        weight: "500g",
      },
      {
        id: 27,
        name: "T-bone Steak",
        description: "For rich stews",
        image: "/images/FCL Fresh cuts/Beefcuts/T-boneSteak.png",
        price: 1100,
        weight: "500g",
      },
      {
        id: 28,
        name: "Thick flank(Top Rump) 2",
        description: "For broth and roasting",
        image: "/images/FCL Fresh cuts/Beefcuts/Thickflank(TopRump)2.png",
        price: 800,
        weight: "1kg",
      },
      {
        id: 29,
        name: "whole ramp steak 2",
        description: "Great for braising",
        image: "/images/FCL Fresh cuts/Beefcuts/wholerampsteak2.png",
        price: 1300,
        weight: "600g",
      },
      {
        id: 30,
        name: "whole ramp steak",
        description: "Flavorful and economical",
        image: "/images/FCL Fresh cuts/Beefcuts/wholerampsteak.png",
        price: 1250,
        weight: "700g",
      },
      {
        id: 31,
        name: "Whole silver side 2",
        description: "Newer tender cut",
        image: "/images/FCL Fresh cuts/Beefcuts/Wholesilverside2.png",
        price: 1650,
        weight: "500g",
      },
      {
        id: 32,
        name: "Whole silver side",
        description: "French flank steak",
        image: "/images/FCL Fresh cuts/Beefcuts/Wholesilverside.png",
        price: 1750,
        weight: "600g",
      },
      {
        id: 33,
        name: "whole sir loin bone in 2",
        description: "Hanger steak alternative",
        image: "/images/FCL Fresh cuts/Beefcuts/wholesirloinbonein2.png",
        price: 1850,
        weight: "500g",
      },
      {
        id: 34,
        name: "whole sir loin bone in",
        description: "Tender flat iron cut",
        image: "/images/FCL Fresh cuts/Beefcuts/wholesirloinbonein.png",
        price: 1700,
        weight: "600g",
      },
      {
        id: 35,
        name: "Whole Strip Loin Boneless",
        description: "Brazilian top sirloin cap",
        image: "/images/FCL Fresh cuts/Beefcuts/WholeStripLoinBoneless.png",
        price: 2000,
        weight: "800g",
      },
      {
        id: 36,
        name: "whole top side",
        description: "Shoulder tender cut",
        image: "/images/FCL Fresh cuts/Beefcuts/wholetopside.png",
        price: 1900,
        weight: "500g",
      },
      {
        id: 37,
        name: "Thick flank(Top Rump) 2",
        description: "Lean roasting joint",
        image: "/images/FC LFresh cuts/Beefcuts/Thickflank(TopRump)2.png",
        price: 1550,
        weight: "1kg",
      },
      {
        id: 38,
        name: "whole ramp steak",
        description: "For roasting and corning",
        image: "/images/FCL Fresh cuts/Beefcuts/wholerampsteak.png",
        price: 1450,
        weight: "1kg",
      }
    ]
  },
  {
    id: "lamb",
    name: "Lamb",
    products: [
      {
        id: 1,
        name: "Deboned Rolled Vetted Lamb Leg",
        description: "New Zealand fresh",
        image: "/images/FCL Fresh cuts/LAMB/DebonedRolledVettedLambLeg.png",
        price: 2200,
        weight: "800g",
      },
      {
        id: 2,
        name: "Lamb Casserole",
        description: "Perfect for roasting",
        image: "/images/FCL Fresh cuts/LAMB/LambCasserole.png",
        price: 2800,
        weight: "2kg",
      },
      {
        id: 3,
        name: "Lamb Dice bone Less",
        description: "Tender and flavorful",
        image: "/images/FCL Fresh cuts/LAMB/LambDiceboneLess.png",
        price: 1900,
        weight: "1kg",
      },
      {
        id: 4,
        name: "Lamb Dice bone Lessq",
        description: "French-trimmed premium cut",
        image: "/images/FCL Fresh cuts/LAMB/LambDiceboneLessq.png",
        price: 3500,
        weight: "1.2kg",
      },
      {
        id: 5,
        name: "lamb hocks",
        description: "For slow roasting",
        image: "/images/FCL Fresh cuts/LAMB/lambhocks.png",
        price: 2400,
        weight: "1.5kg",
      },
      {
        id: 6,
        name: "lamb leg sliced",
        description: "Great for stews",
        image: "/images/FCL Fresh cuts/LAMB/lamblegsliced.png",
        price: 1500,
        weight: "800g",
      },
      {
        id: 7,
        name: "Lamb Loin Chops",
        description: "Ground lamb meat",
        image: "/images/FCL Fresh cuts/LAMB/LambLoinChops.png",
        price: 1200,
        weight: "500g",
      },
      {
        id: 8,
        name: "Lamb Meaty Ribs",
        description: "Meaty ribs for grilling",
        image: "/images/FCL Fresh cuts/LAMB/LambMeatyRibs.png",
        price: 1800,
        weight: "1kg",
      },
      {
        id: 9,
        name: "Lamb Neck Bone",
        description: "Tender small chops",
        image: "/images/FCL Fresh cuts/LAMB/LambNeckBone.png",
        price: 2500,
        weight: "600g",
      },
      {
        id: 10,
        name: "Lamb Neck Sulk T-Bone",
        description: "Premium roasting joint",
        image: "/images/FCL Fresh cuts/LAMB/LambNeckSulkT-Bone.png",
        price: 3200,
        weight: "1.5kg",
      },
      {
        id: 11,
        name: "Lamb Rimb",
        description: "For slow cooking",
        image: "/images/FCL Fresh cuts/LAMB/LambRimb.png",
        price: 1300,
        weight: "1kg",
      },
      {
        id: 12,
        name: "Lamb Shanks 1",
        description: "For frying or pâté",
        image: "/images/FCL Fresh cuts/LAMB/LambShanks1.png",
        price: 800,
        weight: "400g",
      },
      {
        id: 13,
        name: "Lamb Shanks",
        description: "For pies and stews",
        image: "/images/FCL Fresh cuts/LAMB/LambShanks.png",
        price: 750,
        weight: "300g",
      },
      {
        id: 14,
        name: "Lamb Shoulder Chops",
        description: "Lean and flavorful",
        image: "/images/FCL Fresh cuts/LAMB/LambShoulderChops.png",
        price: 850,
        weight: "500g",
      },
      {
        id: 15,
        name: "Lamb Shoulder Whole1",
        description: "Tender when cooked slowly",
        image: "/images/FCL Fresh cuts/LAMB/LambShoulderWhole1.png",
        price: 900,
        weight: "400g",
      },
      {
        id: 16,
        name: "lamb shoulder",
        description: "Boneless leg steaks",
        image: "/images/FCL Fresh cuts/LAMB/lambshoulder.png",
        price: 2000,
        weight: "600g",
      },
      {
        id: 17,
        name: "Lamb T-Bone",
        description: "French-trimmed cutlets",
        image: "/images/FCL Fresh cuts/LAMB/LambT-Bone.png",
        price: 2800,
        weight: "500g",
      },
      {
        id: 18,
        name: "lamb",
        description: "Ground lamb meat",
        image: "/images/FCL Fresh cuts/LAMB/lamb.png",
        price: 1200,
        weight: "500g",
      },
      {
        id: 19,
        name: "Rack of Lamb 2",
        description: "Flavorful shoulder cuts",
        image: "/images/FCL Fresh cuts/LAMB/RackofLamb2.png",
        price: 1700,
        weight: "700g",
      },
      {
        id: 20,
        name: "Rack of Lamb",
        description: "Pre-made lamb patties",
        image: "/images/FCL Fresh cuts/LAMB/RackofLamb.png",
        price: 1500,
        weight: "600g",
      },
      {
        id: 21,
        name: "Whole Lamb Leg Bone In",
        description: "Spicy North African sausages",
        image: "/images/FCL Fresh cuts/LAMB/WholeLambLegBoneIn.png",
        price: 1800,
        weight: "500g",
      },
      {
        id: 22,
        name: "Whole Lamb Loin 1",
        description: "Spiced lamb skewers",
        image: "/images/FCL Fresh cuts/LAMB/WholeLambLoin1.png",
        price: 1600,
        weight: "500g",
      },
      {
        id: 23,
        name: "Whole Lamb Loin",
        description: "Cubed for stews",
        image: "/images/FCL Fresh cuts/LAMB/WholeLambLoin.png",
        price: 1400,
        weight: "500g",
      },
      {
        id: 24,
        name: "whole_lamb",
        description: "Ground lamb meat",
        image: "/images/FCL Fresh cuts/LAMB/whole_lamb.png",
        price: 1200,
        weight: "500g",
      },
      {
        id: 25,
        name: "Lamb T-Bone",
        description: "Bone-in for slow cooking",
        image: "/images/FCL Fresh cuts/LAMB/LambT-Bone.png",
        price: 2600,
        weight: "1.5kg",
      }
    ]
  },
  {
    id: "sausages",
    name: "Sausages Packs",
    products: [
      {
        id: 1,
        name: "Baby Boers",
        description: "Handcrafted premium",
        image: "/images/FCLSausagesPacks/BabyBoers.png",
        price: 1200,
        weight: "1kg",
      },
      {
        id: 2,
        name: "Beef Catering 1Kg",
        description: "Lean and flavorful",
        image: "/images/FCLSausagesPacks/BeefCatering1Kg.png",
        price: 1300,
        weight: "1kg",
      },
      {
        id: 3,
        name: "Beef Chipolatas 1kg",
        description: "Spicy Spanish-style",
        image: "/images/FCLSausagesPacks/BeefChipolatas1kg.png",
        price: 1500,
        weight: "800g",
      },
      {
        id: 4,
        name: "beef vp",
        description: "Traditional South African",
        image: "/images/FCLSausagesPacks/beefvp.png",
        price: 1600,
        weight: "1kg",
      },
      {
        id: 5,
        name: "Boerewors 500g",
        description: "With fennel and garlic",
        image: "/images/FCLSausagesPacks/Boerewors500g.png",
        price: 1400,
        weight: "500g",
      },
      {
        id: 6,
        name: "Chicken Sausage 1Kg",
        description: "German-style sausages",
        image: "/images/FCLSausagesPacks/ChickenSausage1Kg.png",
        price: 1450,
        weight: "800g",
      },
      {
        id: 7,
        name: "Chicken Sausages 1kg",
        description: "Small breakfast sausages",
        image: "/images/FCLSausagesPacks/ChickenSausages1kg.png",
        price: 1100,
        weight: "1kg",
      },
      {
        id: 8,
        name: "Classic Safari",
        description: "Spicy North African",
        image: "/images/FCLSausagesPacks/ClassicSafari.png",
        price: 1550,
        weight: "800g",
      },
      {
        id: 9,
        name: "Deli Beef Boerewors",
        description: "Classic hot dogs",
        image: "/images/FCLSausagesPacks/DeliBeefBoerewors.png",
        price: 1200,
        weight: "1kg",
      },
      {
        id: 10,
        name: "FCL Chicken Sausage",
        description: "English coiled sausages",
        image: "/images/FCLSausagesPacks/FCLChickenSausage.png",
        price: 1650,
        weight: "900g",
      },
      {
        id: 13,
        name: "Lamb-Sausages",
        description: "Polish smoked sausage",
        image: "/images/FCLSausagesPacks/Lamb-Sausages.png",
        price: 1600,
        weight: "900g",
      },
      {
        id: 14,
        name: "Low Fat Beef Sausages",
        description: "Cajun smoked sausage",
        image: "/images/FCLSausagesPacks/LowFatBeefSausages.jpg",
        price: 1750,
        weight: "800g",
      },
      {
        id: 16,
        name: "Meaty Beef Chipolatas 200g",
        description: "Lean poultry option",
        image: "/images/FCLSausagesPacks/MeatyBeefChipolatas200g.png",
        price: 1300,
        weight: "200g",
      },
      {
        id: 17,
        name: "Meaty Beef Sausages 1kg",
        description: "Game meat sausages",
        image: "/images/FCLSausagesPacks/MeatyBeefSausages1kg.png",
        price: 1900,
        weight: "1kg",
      },
      {
        id: 18,
        name: "Meaty Beef Sausages 400g",
        description: "Herbed lamb sausages",
        image: "/images/FCLSausagesPacks/MeatyBeefSausages400g.png",
        price: 1700,
        weight: "400g",
      },
      {
        id: 27,
        name: "Safari Beef",
        description: "Brewed with lager",
        image: "/images/FCLSausagesPacks/SafariBeef.png",
        price: 1650,
        weight: "800g",
      },
      {
        id: 28,
        name: "Sose Kadogoo-",
        description: "Gamey flavor",
        image: "/images/FCLSausagesPacks/SoseKadogoo-.png",
        price: 2000,
        weight: "700g",
      },
      {
        id: 29,
        name: "Spicy Beef Sausages 1KG-01",
        description: "Rich and flavorful",
        image: "/images/FCLSausagesPacks/SpicyBeefSausages1KG-01.png",
        price: 1900,
        weight: "800g",
      },
      {
        id: 30,
        name: "Spicy Beef_",
        description: "Lean poultry option",
        image: "/images/FCLSausagesPacks/SpicyBeef_.png",
        price: 1350,
        weight: "1kg",
      },
      {
        id: 31,
        name: "Spicy Chicken VP 1Kg",
        description: "Meat-free alternative",
        image: "/images/FCLSausagesPacks/SpicyChickenVP1Kg.png",
        price: 1200,
        weight: "800g",
      },
    ]
  },
  {
    id: "mini-bites",
    name: "Mini bite & Nyamabites",
    products: [
      {
        id: 1,
        name: "Mini Bites Packs",
        description: "Assorted bite-sized snacks",
        image: "/images/Minibite/MiniBitesPacks.png",
        price: 900,
        weight: "400g",
      },
      {
        id: 2,
        name: "Nyamabite 2",
        description: "Premium meat bites selection",
        image: "/images/Nyamabite/Nyamabite2.png",
        price: 1200,
        weight: "500g",
      }
    ]
  }
];
export default function Choicemeats() {
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [showDescription, setShowDescription] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="bg-[#fafafa] min-h-screen">
      {/* Modern Hero Section with Choicemeats theme */}
      <div 
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/meat-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a5d1a]/90 to-[#0d3d0d]/90"></div>
        <div className="container mx-auto relative z-10 text-center pt-16 pb-12 px-4">
          {/* Choicemeats Logo */}
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <div className="bg-[#1a5d1a] text-white rounded-full w-24 h-24 flex items-center justify-center">
                <span className="text-xl font-bold">Choice<br/>Meats</span>
              </div>
            </div>
          </div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Choicemeats Premium Halal Selection
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            100% Halal, Premium Quality Meats
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {categories.slice(0, 5).map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-white text-[#1a5d1a]'
                    : 'bg-white/10 text-white/90 hover:bg-white/20'
                }`}
              >
                {category.name.split(' ')[0]}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide py-3 space-x-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-[#1a5d1a] text-white shadow-green-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="container mx-auto py-8 px-4">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="w-16 h-1 bg-gray-200 rounded-full mt-1"></div>
                </div>
              </div>
              <div className="relative">
                <div className="flex overflow-x-auto scrollbar-hide space-x-5 pb-8 px-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-56 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                      <div className="relative h-44 bg-gray-200 animate-pulse"></div>
                      <div className="p-4">
                        <div className="h-5 bg-gray-200 rounded w-4/5 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="flex justify-between items-center">
                          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
          <div className="w-16 h-1 bg-[#1a5d1a] rounded-full mt-1"></div>
        </div>
      </div>

      {/* Products Carousel */}
      <div className="relative">
        {/* Floating arrows with hover effect */}
        <button
          onClick={() => scroll("left")}
          disabled={isAtStart}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg transition-colors ${
            isAtStart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1a5d1a] hover:text-white'
          }`}
          aria-label={`Scroll ${category.name} left`}
        >
          <ChevronLeft className="w-5 h-5 text-[#1a5d1a] hover:text-white" />
        </button>
        
        <button
          onClick={() => scroll("right")}
          disabled={isAtEnd}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 bg-white rounded-full p-3 shadow-lg transition-colors ${
            isAtEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1a5d1a] hover:text-white'
          }`}
          aria-label={`Scroll ${category.name} right`}
        >
          <ChevronRight className="w-5 h-5 text-[#1a5d1a] hover:text-white" />
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
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        
        {/* Product image without lazy loading */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover ${imageLoaded ? 'block' : 'hidden'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.parentNode.innerHTML = `
              <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                <span class="text-gray-500 text-sm">Image missing</span>
              </div>
            `;
          }}
        />
        
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 p-1.5 rounded-full ${
            isFavorite ? "text-[#1a5d1a]" : "text-gray-400"
          } bg-white/80 backdrop-blur-sm shadow-sm`}
        >
          <Heart 
            className="w-4 h-4" 
            fill={isFavorite ? "#1a5d1a" : "none"} 
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
          <p className="text-base font-bold text-[#1a5d1a]">
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
                className="flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all bg-gray-100 text-[#1a5d1a] hover:bg-green-100"
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
            className="absolute top-0 left-0 right-0 bg-[#1a5d1a] text-white text-center py-1"
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