import { Request, Response } from "express";
import { AppDataSource } from "../../datasource";
import { Personaje } from "../models/personaje.entity";

const heroRepository = AppDataSource.getRepository(Personaje);

export const getAll = async (req: Request, res: Response) => {

    const { rol } = req.params;
    
    const heroes = await heroRepository.find({
        where: {
            rol
        }
    });
    return res.json(heroes);
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const hero = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!hero) {
        return res.status(404).json({
            message: `Hero with id: ${id}, not found`
        })
    }

    res.json(hero);
}

export const getByAlte = async (req: Request, res: Response) => {
    const { alte } = req.params;

    const hero = await heroRepository.findOneBy({ alte });

    if (!hero) {
        return res.status(404).json({
            message: `Hero with Alte: ${alte}, not found`
        })
    }

    res.json(hero);
}

export const create = async (req: Request, res: Response) => {

    const { alte, nombre, rol } = req.body;

    const oldHero = await heroRepository.findOneBy({ alte });

    if (oldHero) {
        return res
            .status(400)
            .json({
                message: `Hero ${alte} already exists`
            })
    }

    const newHero = heroRepository.create({ alte, nombre, rol });
    await heroRepository.insert(newHero);

    res.json(newHero);
}

export const remove = async (req: Request, res: Response) => {

    const { id } = req.params;

    const oldHero = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!oldHero) {
        return res
            .status(404)
            .json({
                message: `Hero with id: ${id} not found`
            })
    }

    const deletedHero = await heroRepository.delete({ id: Number.parseInt(id) });

    res.json({
        affectedRows: deletedHero,
    });
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { alte, nombre, rol } = req.body;

    const heroById = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!heroById) {
        return res
            .status(404)
            .json({
                message: `Hero with id ${id} not found`
            })
    }

    if (alte) {
        const oldHero = await heroRepository.findOneBy({ alte });

        if (oldHero && oldHero.id !== Number.parseInt(id)) {
            return res
                .status(400)
                .json({
                    message: `Hero ${alte} already exists`
                })
        }
    }

    const updatedHero = heroRepository.create({
        id: heroById.id,
        alte: alte ? alte : heroById.alte,
        nombre: nombre ? nombre : heroById.nombre,
        rol: rol ? rol : heroById.rol
    });

    await heroRepository.save(updatedHero);

    res.json(updatedHero);
}
