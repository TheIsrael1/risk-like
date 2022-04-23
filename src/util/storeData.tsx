import soilder1 from "../assets/images/store/soilder1.svg"
import soilder2 from "../assets/images/store/soilder2.svg"
import soilder3 from "../assets/images/store/soilder3.svg"
import soilder4 from "../assets/images/store/soilder4.svg"
import soilder5 from "../assets/images/store/soilder5.svg"
import wood from "../assets/images/store/woodBig.svg"
import metal from "../assets/images/store/metalBig.svg"
import gold from "../assets/images/store/goldBig.svg"
import diamond from "../assets/images/store/diamondBig.svg"
import chest from "../assets/images/store/diamondChest.svg"
import diamondChestOverflow from "../assets/images/store/diamondChestOverflow.svg"
import tankBig from "../assets/images/store/tankBig.svg"
import craftBig from "../assets/images/store/craftBig.svg"
import sniper from "../assets/images/store/sniper.svg"
import mineWorker from "../assets/images/store/mineWorker.svg"
import robotBig from "../assets/images/store/robotBig.svg"
import pizzaSlice from "../assets/images/store/pizzaSlice.svg"
import sausage from "../assets/images/store/sausage.svg"
import chickenWings from "../assets/images/store/chickenWings.svg"
import cabbage from "../assets/images/store/cabbage.svg"


export const storeData = {
    nfts: [
        {
        eth: 2,
        nftName: "Meta-Humano",
        nftSubName: "Flash",
        likes: 1300,
        img: soilder1
        },
        {
        eth: 2,
        nftName: "Meta-Hazard",
        nftSubName: "Super",
        likes: 1800,
        img: soilder2
        },
        {
        eth: 2,
        nftName: "Meta-Freezer",
        nftSubName: "Fast",
        likes: 1200,
        img: soilder3
        },
        {
        eth: 2,
        nftName: "Meta-Snipes",
        nftSubName: "Strong",
        likes: 3200,
        img: soilder4
        },
        {
        eth: 2,
        nftName: "Meta-Cloak",
        nftSubName: "Incicible",
        likes: 1200,
        img: soilder5
        },
        {
        eth: 2,
        nftName: "Meta-Captain",
        nftSubName: "Leader",
        likes: 1200,
        img: soilder2
        },
        {
        eth: 2,
        nftName: "Meta-Sharp",
        nftSubName: "Flash",
        likes: 1200,
        img: soilder4
        },
    ],

    coins: [
        {
            resourceCount: 99999,
            resourceName: "Wood",
            price: 0.002,
            img: wood
        },
        {
            resourceCount: 100,
            resourceName: "Metal",
            price: 0.003,
            img: metal
        },
        {
            resourceCount: 10,
            resourceName: "Gold",
            price: 0.003,
            img: gold
        },
        {
            resourceCount: 100000,
            resourceName: "Diamond",
            price: 0.005,
            img: diamond
        },
        {
            resourceCount: 100000,
            resourceName: "Diamond Chest",
            price: 0.006,
            img: chest
        },
        {
            resourceCount: 999999,
            resourceName: "Diamond Chest",
            price: 0.007,
            img: diamondChestOverflow
        }
    ],

    armoury: [
        {   
            resourceCount: 1,
            resourceName: "Soilders",
            price: 999,
            img: soilder1,
            currency: "wood"
        },
        {
            resourceCount: 1,
            resourceName: "War Tank",
            price: 100,
            img: tankBig,
            currency: "gold"
        },
        {
            resourceCount: 1,
            resourceName: "Fighter Jet",
            price: 999,
            img: craftBig,
            currency: "metal"
        },
        {
            resourceCount: 1,
            resourceName: "Spies",
            price: 999,
            img: sniper,
            currency: "diamond"
        },
        {
            resourceCount: 1,
            resourceName: "Miner",
            price: 3000,
            img: mineWorker,
            currency: "gold"
        },
        {
            resourceCount: 1,
            resourceName: "Kill Stomper",
            price: 9999,
            img: robotBig,
            currency: "diamond"
        },
    ],

    food: [
        {
            resourceCount: "10000kilo",
            currency: "wood",
            img: pizzaSlice,
            price: 999
        },
        {
            resourceCount: "10000kilo",
            currency: "gold",
            img: sausage,
            price: 100
        },
        {
            resourceCount: "10000kilo",
            currency: "metal",
            img: pizzaSlice,
            price: 1000
        },
        {
            resourceCount: "10000kilo",
            currency: "diamond",
            img: chickenWings,
            price: 2000
        },
        {
            resourceCount: "10000kilo",
            currency: "gold",
            img: cabbage,
            price: 3000
        },
        {
            resourceCount: "10000kilo",
            currency: "diamond",
            img: cabbage,
            price: 999999
        },
    ]
}