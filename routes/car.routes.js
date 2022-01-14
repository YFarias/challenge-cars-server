const mongoose = require("mongoose");
const router = require("express").Router()
const Car = require("../models/car.model")
const { isAuthenticated } = require("./../middleware/jwt.middleware");

//!Post - /api/cars
router.post('/api/cars', async (req,res,next)=>{
    try {
        
        // obter informaçoes pelo req.body
        const {BRAND, MODEL, DEALER, MIN_MILEAGE, MAX_MILEAGE} = req.body
        const createdCar = await Car.create({BRAND, MODEL, DEALER, MIN_MILEAGE, MAX_MILEAGE})
        
        res.status(201).json(createdCar); //Create car

    } catch (error) {
        res.status(500).json(error); //server error 
    }
});

//!Get - /api/cars
router.get('/api/cars', async (req,res,next) => {
 try {
     
    const allCars = await Car.find().sort({ BRAND: 1 });
    res.status(200).json(allCars); 

 } catch (error) {
     
    res.status(500).json(error); //server error

 }

});

//!Put - api/cars/:carsId
router.put('/api/cars/:carId', async (req, res, next) => {
    try {
      
      const { carId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(carId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }    
  
      // Values to use for updating the project
      const {BRAND, MODEL, DEALER, MIN_MILEAGE, MAX_MILEAGE} = req.body
  
      const updatedCar = await Car.findByIdAndUpdate(
        carId,
        {BRAND, MODEL, DEALER, MIN_MILEAGE, MAX_MILEAGE}, 
        { new: true });
      
      res.status(200).json(updatedCar);
    } catch (error) {
      res.status(500).json(error);
    }
  })

//!Delete - api/cars/:carsId
router.delete('/api/cars/:carId', async (req, res, next) => {
    try {
        
        const { carId } = req.params 

        if (!mongoose.Types.ObjectId.isValid(carId)) {
            res.status(400).json({ message: "Invalid object id"});
            return;
        } 

        await Car.findByIdAndDelete(carId);

        res.status(204).send();

    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router