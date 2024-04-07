import express, { Request, Response } from 'express';
import prisma from '../prisma/client';

const router = express.Router();

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Retrieve all cars
 *     description: Retrieve a list of all cars.
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
  const cars = await prisma.car.findMany();
  res.json(cars);
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
