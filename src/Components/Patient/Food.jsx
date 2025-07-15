import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import month1 from '../assets/vegetables.jpg'
import month2 from '../assets/lemonginger.jpg'
import month3 from '../assets/egg.jpg'
import month4 from '../assets/beetroot.jpg'
import month5 from '../assets/milk.jpg'
import month6 from '../assets/fruits.jpg'
import month7 from '../assets/fish.jpg'
import month8 from '../assets/milkshakes.jpg'
import month9 from '../assets/grains.jpg'
import useMediaQuery from '@mui/material/useMediaQuery';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));
export default function Food() {
    const data = [
        {
            month: 1,
            nutrient: "Folic acid, Vitamin B6, Iron",
            food: "Leafy greens (spinach, methi, kale),Oranges, lemon, guava,Whole grains, Lentils, nuts, eggs"
        },
        {
            month: 2,
            nutrient: "Vitamin B6, Ginger, Hydration",
            food: "Ginger tea, bananas, dry toast, Small frequent meals ,Lemon water, plain rice, curd"
        },
        {
            month: 3,
            nutrient: "Protein, Calcium, Folic acid, Iron",
            food: "Paneer, milk, yogurt,Eggs, pulses, whole grains, Fortified cereals"
        },
        {
            month: 4,
            nutrient: "Iron, Fiber, Vitamin C",
            food: "Dates, pomegranate, apples,Beetroot, carrots, amla ,Iron-rich dals + lemon juice"
        },
        {
            month: 5,
            nutrient: "Calcium, Vitamin D, Omega-3",
            food: "Milk, curd, ragi, tofu, Almonds, walnuts, fish (if non-veg), Sunlight exposure (10–15 mins daily)"
        },
        {
            month: 6,
            nutrient: "Iron, Protein, Magnesium",
            food: "Eggs, dals, spinach, brown rice,Citrus fruits,Sweet potatoes, bananas"
        },
        {
            month: 7,
            nutrient: "DHA/Omega-3, Iodine, Choline",
            food: "Chia/flaxseeds, fish, walnuts,Iodized salt,Eggs, soybeans"
        },
        {
            month: 8,
            nutrient: "Protein, Healthy fats, Vitamin C",
            food: "Milkshakes, paneer, avocado,Moong dal, khichdi, nuts,Oranges, kiwis, bell peppers"
        },
        {
            month: 9,
            nutrient: "Fiber, Fluids, Light but nutritious meals",
            food: "Whole grains, fruits, warm soups,Dates (promotes labor readiness),Coconut water, herbal teas"
        }
    ]
    const isSmallScreen = useMediaQuery('(max-width:500px)');
    return (
        <div >
            <div className="container mt-5">
                <h1 className="m-3" style={{ fontFamily: "Arial" }}>Pregnancy Monthly Diet Plan</h1>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="contain"
                    >
                        {data.map((record) => (
                            <Grid size={isSmallScreen ? 7 : 4}  className="card__container">
                                <Item
                                    style={{
                                        backgroundImage: record.month === 1 ? `url(${month1})`
                                            : record.month === 2 ? `url(${month2})`
                                                : record.month === 3 ? `url(${month3})`
                                                    : record.month === 4 ? `url(${month4})`
                                                        : record.month === 5 ? `url(${month5})`
                                                            : record.month === 6 ? `url(${month6})`
                                                                : record.month === 7 ? `url(${month7})`
                                                                    : record.month === 8 ? `url(${month8})`
                                                                        : record.month === 9 ? `url(${month9})` : "#fff"
                                    }}

                                    className='card__article'
                                >

                                    <div className="card__data text-white">
                                        <h3 style={{ fontFamily: "cursive" }}>Month: {record.month}</h3>
                                    </div>
                                    <div className='card__button border rounded-2' style={{ fontFamily: "serif" }}>
                                        <h4 className='text-white'><span style={{ fontFamily: "Impact" }}>Nutrients:</span> {record.nutrient}</h4>
                                        <h5><span style={{ fontFamily: "Impact" }}>Food:</span> {record.food}</h5>
                                    </div>



                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <h1 className="mt-4" style={{ fontFamily: "Arial" }}>Avoid food during pregnancy :</h1>
                <div>
                    <table className="table table-bordered w-100 mt-5">
                        <thead >
                            <tr style={{ fontFamily: "Arial" }}>
                                <th> Foods to Avoid During Pregnancy</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody style={{ fontFamily: "Tahoma" }}>
                            <tr >
                                <td>Raw or Undercooked Foods : </td>
                                <td>Raw eggs ,Undercooked meat or chicken,Raw fish (sushi),Raw sprouts (e.g., alfalfa, moong) : </td>
                            </tr>
                            <tr>
                                <td>Unpasteurized Dairy Products : </td>
                                <td>Unpasteurized milk or cheese (feta, brie, blue cheese) : </td>
                            </tr>
                            <tr>
                                <td>High-Mercury Fish : </td>
                                <td>Shark, Swordfish, King Mackerel, Tilefish,Limit tuna (especially albacore/white tuna) : </td>
                            </tr>
                            <tr>
                                <td> Processed or Packaged Food : </td>
                                <td>Instant noodles, chips, canned food	High salt, MSG, preservatives
                                    Bakery items, sugary cereals,Excess sugar, refined flour,Soft drinks, energy drinks	High in caffeine, artificial sweeteners
                                    : </td>
                            </tr>
                            <tr>
                                <td> Certain Fruits (with caution) : </td>
                                <td>Unripe papaya,Pineapple,Grapes,High resveratrol
                                    : </td>
                            </tr>
                            <tr>
                                <td> Alcohol and Excess Caffeine : </td>
                                <td>Alcohol	and excess tea/coffee
                                    : </td>
                            </tr>
                            <tr>
                                <td> Alcohol and Excess Caffeine : </td>
                                <td>Street food	Risk of infection, food poisoning Herbal supplements / teas (unless prescribed),Liver & organ meat (in excess),Artificial sweeteners like saccharin
                                    : </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}