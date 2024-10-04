// File: backend/app.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Sample plant data (would be in a database in a real application)
const plantDatabase = [
    { id: 1, type: 'Shrub', baseCost: 15, regionFactor: { 'North': 1.2, 'South': 1.0, 'East': 1.1, 'West': 1.3 } },
    { id: 2, type: 'Tree', baseCost: 50, regionFactor: { 'North': 1.5, 'South': 1.2, 'East': 1.3, 'West': 1.6 } },
    { id: 3, type: 'Flower', baseCost: 5, regionFactor: { 'North': 1.0, 'South': 0.9, 'East': 1.1, 'West': 1.2 } }
];

// Helper function to calculate cost
const calculateCost = (plantType, quantity, region) => {
    const plant = plantDatabase.find(p => p.type === plantType);
    if (!plant) return { error: 'Plant type not found' };

    const baseCost = plant.baseCost * quantity;
    const regionMultiplier = plant.regionFactor[region] || 1.0;
    const totalCost = baseCost * regionMultiplier;

    return { plantType, quantity, region, totalCost };
};

// Endpoint for cost estimation
app.post('/estimate', (req, res) => {
    const { plantType, quantity, region } = req.body;
    const result = calculateCost(plantType, quantity, region);
    res.json(result);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
