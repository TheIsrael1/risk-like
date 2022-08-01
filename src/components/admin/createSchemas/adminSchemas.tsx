import * as Yup from "yup";


export const assetTypeSchema = Yup.object({
    name: Yup.string().required(),
    infinite: Yup.boolean().required(),
})

export const assetsSchema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.number().required(),
    moveable: Yup.boolean().required(),
    total_quantity: Yup.number().required(),
})

export const locationSchema = Yup.object({
    name: Yup.string().required(),
    long: Yup.number().required(),
    lat: Yup.number().required(),
})

export const tokenSchema = Yup.object({
    name: Yup.string().required(),
})