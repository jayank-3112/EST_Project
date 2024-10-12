const mongoose = require('mongoose');
const ClimateChange = require('./models/ClimateChange');
const Disaster = require('./models/Disaster');

require('dotenv').config();

const climateChangeData = [
    {
        name: "Global Warming",
        description: "Increase in Earth's average surface temperature due to rising levels of greenhouse gases.",
        causes: ["Burning fossil fuels", "Deforestation", "Industrial processes"],
    },
    {
        name: "Ocean Acidification",
        description: "The decrease in pH of the Earth's oceans caused by uptake of CO2 from the atmosphere.",
        causes: ["CO2 emissions", "Deforestation", "Land-use changes"],
    },
    {
        name: "Melting Ice Caps",
        description: "The melting of glaciers and polar ice due to rising global temperatures.",
        causes: ["Global warming", "Greenhouse gas emissions"],
    },
    {
        name: "Extreme Weather Events",
        description: "Increased frequency and intensity of hurricanes, floods, and droughts.",
        causes: ["Climate change", "Deforestation", "Urbanization"],
    },
    {
        name: "Biodiversity Loss",
        description: "The loss of species and habitats due to climate change and human activities.",
        causes: ["Habitat destruction", "Pollution", "Climate change"],
    },
    {
        name: "Rising Sea Levels",
        description: "The increase in ocean levels caused by melting ice and thermal expansion.",
        causes: ["Melting ice caps", "Thermal expansion"],
    },
    {
        name: "Desertification",
        description: "The process by which fertile land becomes desert, typically as a result of drought or deforestation.",
        causes: ["Climate change", "Overgrazing", "Deforestation"],
    },
];

const disasterData = [
    {
        name: "Flood",
        description: "An overflow of water that submerges land which is usually dry.",
        impact: "Destruction of homes, infrastructure, and agricultural lands.",
    },
    {
        name: "Drought",
        description: "A prolonged dry period in the natural climate cycle that can occur anywhere in the world.",
        impact: "Water scarcity, crop failure, and food shortages.",
    },
    {
        name: "Hurricane",
        description: "A large storm that forms over warm ocean waters and can cause severe wind and flooding.",
        impact: "Widespread destruction of property, loss of life, and long-term displacement of communities.",
    },
    {
        name: "Heatwave",
        description: "A prolonged period of excessively hot weather.",
        impact: "Health risks, increased energy demand, and wildfires.",
    },
    {
        name: "Wildfire",
        description: "Uncontrolled fires that spread rapidly through vegetation.",
        impact: "Destruction of habitats, loss of property, and air pollution.",
    },
    {
        name: "Tsunami",
        description: "A series of ocean waves caused by underwater earthquakes or volcanic eruptions.",
        impact: "Massive flooding, destruction of coastal communities, and loss of life.",
    },
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        // Clear existing data
        await Disaster.deleteMany({});
        await ClimateChange.deleteMany({});

        // Seed disasters
        const disasters = await Disaster.insertMany(disasterData);
        console.log('Disasters seeded');

        // Create an array to hold climate changes with associated disasters
        const climateChangesWithDisasters = climateChangeData.map((climateChange, index) => ({
            ...climateChange,
            disasters: disasters.slice(index * 3, index * 3 + 3).map(disaster => disaster._id), // Associate 3 disasters for each climate change
        }));

        await ClimateChange.insertMany(climateChangesWithDisasters);
        console.log('Climate Changes seeded');

        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

seedDatabase();
