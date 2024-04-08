import express, { Request, Response } from 'express';
import prisma from '../prisma/client';
import { Prisma } from '@prisma/client';

const router = express.Router();

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Retrieve all cars
 *     description: Retrieve a list of all cars. Supports search, sorting, and pagination.
 *     parameters:
 *       - in: query
 *         name: make
 *         schema:
 *           type: string
 *         description: Filter cars by make.
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: Filter cars by model.
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter cars by year.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort the results by a specific field (e.g., make, model, year).
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           default: asc
 *         description: Specify the sorting order (asc or desc).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Specify the page number for pagination.
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Specify the page size for pagination.
 *     responses:
 *       200:
 *         description: A list of cars.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CarResponseObject'
 */
router.get('/cars', async (req: Request, res: Response) => {
  const { make, model, sortBy, sortOrder } = req.query;
  const year = req.query.year ? parseInt(req.query.year as string) : undefined;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;

  const filters: Prisma.CarWhereInput = {};
  if (make) filters.make = make as string;
  if (model) filters.model = model as string;
  if (year) filters.year = year;

  const sortOrderNormalized = sortOrder === 'desc' ? 'desc' : 'asc';
  const sortByField = sortBy as string || 'id';

  const totalCount = await prisma.car.count({ where: filters });
  const totalPages = Math.ceil(totalCount / pageSize);

  const cars = await prisma.car.findMany({
    where: filters,
    orderBy: {
      [sortByField]: sortOrderNormalized,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  res.json({
    totalCount,
    totalPages,
    currentPage: page,
    pageSize: pageSize,
    data: cars,
  });
});

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     description: Create a new car with the provided make, model, and year.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarRequestObject'
 *     responses:
 *       201:
 *         description: The newly created car.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarResponseObject'
 *       400:
 *         description: Missing required fields.
 */
router.post('/cars', async (req: Request, res: Response) => {
  const { make, model, year } = req.body;
  if (!make || !model || !year) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newCar = await prisma.car.create({
      data: {
        make,
        model,
        year,
      },
    });
    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating car' });
  }
});

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Retrieve a car by ID
 *     description: Retrieve a car by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the car to retrieve.
 *     responses:
 *       200:
 *         description: The requested car.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarResponseObject'
 *       404:
 *         description: Car not found.
 */
router.get('/cars/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const car = await prisma.car.findUnique({
    where: { id },
  });

  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }
  res.json(car);
});

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     description: Update a car's information by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the car to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarRequestObject'
 *     responses:
 *       200:
 *         description: The updated car.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarResponseObject'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Car not found.
 */
router.put('/cars/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { make, model, year } = req.body;

  const car = await prisma.car.findUnique({
    where: { id },
  });

  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }

  if (!make && !model && !year) {
    return res.status(400).json({ message: 'Nothing to update' });
  }

  try {
    const updatedCar = await prisma.car.update({
      where: { id },
      data: {
        make: make ?? car.make,
        model: model ?? car.model,
        year: year ?? car.year,
      },
    });
    res.json(updatedCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating car' });
  }
});

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     description: Delete a car by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the car to delete.
 *     responses:
 *       200:
 *         description: Car deleted successfully.
 *       404:
 *         description: Car not found.
 */
router.delete('/cars/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.car.delete({
      where: { id },
    });
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting car' });
  }
});

export const carsRouter = router;
