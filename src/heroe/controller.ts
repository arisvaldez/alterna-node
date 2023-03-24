import { Request, Response } from "express";
import { AppDataSource } from "../../datasource";
import { Heroe } from "../models/heroe.entity";


const heroRepository = AppDataSource.getRepository(Heroe);

export const getAll = async (req: Request, res: Response) => {

    const heroes = await heroRepository.find();
    return res.json(heroes);
}

export const getById = async(req: Request, res: Response) =>{
    const { id } = req.params;

    const hero = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if(!hero) {
        return res.status(404).json({
            message:`Hero with id: ${id}, not found`
        })
    }

    res.json(hero);
}

export const getByAlte = async (req: Request, res: Response) => {
    const { alte } = req.params;

    const hero = await heroRepository.findOneBy({ alte });

    if(!hero) {
        return res.status(404).json({
            message:`Hero with Alte: ${alte}, not found`
        })
    }

    res.json(hero);
}

export const create = (req: Request, res: Response) => {

    /* const { alte, nombre } = req.body;
    const hero = heroes2.find((hero) => hero.alte === alte);

    if (hero) {
        return res.status(400).json(
            {
                message: `The hero ${alte} already exist`
            }
        )
    }

    _id += 1;
    const newHero = {
        id: _id,
        nombre,
        alte
    };

    heroes2.push(newHero);
    res.status(201).json(newHero); */
}

export const remove = (req: Request, res: Response) => {
    /* const { alte } = req.params;
    const index = heroes2.findIndex(
        (hero) =>
            hero.alte.toLowerCase() === alte.toLowerCase());

    if (index < 0) {
        return res.status(404).json(`The hero ${alte} not found`)
    }

    const hero = heroes2.splice(index, 1);

    res.json(hero); */
}

export const update = (req: Request, res: Response) => {
   /*  const { alte, nombre } = req.body;
    const { id } = req.params;

    const hero = heroes2.find((hero) => hero.id === Number.parseInt(id))

    if (!hero) {
        return res.status(401).json({
            message: `The hero ${alte} not found`
        })
    }

    hero.alte = alte !== undefined ? alte : hero.alte;
    hero.nombre = nombre !== undefined ? nombre : hero.alte;

    res.json(hero); */
}
