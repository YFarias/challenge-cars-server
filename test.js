const { get } = require("mongoose")
const request = require("supertest")
const carRoutes = require('./routes/car.routes')



describe('Test ',()=> {
    it('should test get route', async () => {
        const res = await request(carRoutes)
        .get("/api/cars")

        expect(res.json).toHaveProperty(allCars)


    })
})