import './FoodCard.css'


const FoodCard = () => {

    let menu = [
        {
            "id": 877,
            "short_name": "A1",
            "name": "Won Ton Soup with Chicken",
            "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
            "price": 5.0
        },
        {
            "id": 878,
            "short_name": "A2",
            "name": "Egg Drop Soup",
            "description": "chicken broth with egg drop",
            "price": 4.5
        },
        {
            "id": 879,
            "short_name": "A3",
            "name": "Chicken Corn Soup",
            "description": "clear chicken broth with creamy corn and egg drop with white meat chicken pieces",
            "price": 5.5
        },
        {
            "id": 880,
            "short_name": "A4",
            "name": "Hot and Sour Soup",
            "description": "tofu, chicken, mushroom, bamboo shoot, and egg",
            "price": 5.0
        },
        {
            "id": 881,
            "short_name": "A5",
            "name": "Egg Drop with Won Ton Soup",
            "description": "chicken soup with egg drop and won tons",
            "price": 6.0
        },
        {
            "id": 882,
            "short_name": "A6",
            "name": "Chicken Noodle Soup",
            "description": "clear broth and lo mein noodles or white rice, chicken pieces",
            "price": 5.0
        },
        {
            "id": 883,
            "short_name": "A7",
            "name": "Garden Vegetable Soup",
            "description": "clear chicken broth with mixed vegetables (carrots, cabbage, baby corn, mushroom, snow peas)",
            "price": 5.0
        },
        {
            "id": 884,
            "short_name": "A8",
            "name": "Garden Vegetable Soup with Tofu",
            "description": "clear chicken broth with mixed vegetables (carrots, cabbage, baby corn, mushroom, snow peas) with tofu pieces",
            "price": 6.0
        },
        {
            "id": 885,
            "short_name": "A9",
            "name": "Chicken with Garden Vegetable Soup",
            "description": "clear chicken broth with mixed vegetables (carrots, cabbage, baby corn, mushroom, snow peas) and chicken pieces",
            "price": 6.4
        },
        {
            "id": 886,
            "short_name": "A10",
            "name": "Hong Kong Style Won Ton Soup",
            "description": "clear chicken broth with carrots, mushrooms, snow peas, and broccoli, and a few pieces of Hong Kong style won tons",
            "price": 8.5
        },
        {
            "id": 887,
            "short_name": "A11",
            "name": "Young Chow Won Ton Soup",
            "description": "clear chicken broth with vegetables, veal, chicken, and beef and won tons",
            "price": 11.95
        },
        {
            "id": 888,
            "short_name": "B1",
            "name": "Beef Egg Roll",
            "description": "eggroll with cabbage, carrots and beef",
            "price": 3.0
        },
        {
            "id": 889,
            "short_name": "B2",
            "name": "Spring Roll",
            "description": "thin wraps with white meat and cabbage",
            "price": 3.0
        },
        {
            "id": 890,
            "short_name": "B3",
            "name": "Vegetable Egg Roll",
            "description": "cabbage and carrots in eggroll wrappers",
            "price": 2.25
        },
        {
            "id": 891,
            "short_name": "B4",
            "name": "Fried Won Ton with Chicken Meat",
            "description": "triangle shaped won ton with ground white meat chicken inside",
            "price": 6.25
        },
        {
            "id": 892,
            "short_name": "B5",
            "name": "Chicken Toast",
            "description": "ground chicken meat on bread, deep-fried, comes with 4 pieces",
            "price": 6.25
        },
        {
            "id": 893,
            "short_name": "B6",
            "name": "Fried Silky Tofu with Special Garlic Sauce",
            "description": "4 large tofu cubes, breaded and deep-fried, with garlic sauce on the side",
            "price": 5.95
        },
        {
            "id": 894,
            "short_name": "B7",
            "name": "Scallion Pancake",
            "description": "dough mixed with scallion and pan-fried",
            "price": 5.75
        },
        {
            "id": 895,
            "short_name": "B8",
            "name": "Steamed Chicken Dumplings",
            "description": "house-made dough dumpling with chicken",
            "price": 7.95
        },
        {
            "id": 896,
            "short_name": "B9",
            "name": "Steamed Vegetable Dumplings",
            "description": "house-made dough dumpling with carrot, mushroom, cellophane noodles, cabbage (6 pieces)",
            "price": 7.95
        },
        {
            "id": 897,
            "short_name": "B10",
            "name": "Szechuan Soft Won Ton",
            "description": "soft won tons filled with chicken, with garlic sauce",
            "price": 8.55
        },
        {
            "id": 898,
            "short_name": "B11",
            "name": "Chicken in Soothing Lettuce Wraps",
            "description": "white-meat chicken with mushrooms, green peppers, water chestnuts, carrots sauteed with special house sauce, wrapped in fresh lettuce",
            "price": 8.9
        },
        {
            "id": 899,
            "short_name": "B12",
            "name": "Teriyaki Beef",
            "description": "6 pieces of beef on skewers with teriyaki sauce",
            "price": 7.95
        },
        {
            "id": 900,
            "short_name": "B13",
            "name": "Fried Chicken Wing",
            "description": "6 pieces of curry-flavored chicken wings",
            "price": 4.95
        },
        {
            "id": 901,
            "short_name": "B14",
            "name": "B.B.Q. Spareribs",
            "description": "marinated grilled roast barbeque ribs",
            "price": 13.95
        },
        {
            "id": 902,
            "short_name": "B15",
            "name": "Pu Pu Platter",
            "description": "2 spring egg rolls, 2 fried won tons, 2 BBQ ribs, 2 chicken toast, 2 teriyaki beef",
            "price": 18.95
        },
        {
            "id": 903,
            "short_name": "B16",
            "name": "Cold Sesame Noodle",
            "description": "Peanut butter sauce and sesame seeds on lo mein noodles ",
            "price": 6.95
        },
        {
            "id": 904,
            "short_name": "SP1",
            "name": "Chinese Scallion Pancake Wrap",
            "description": "with choice of string bean, string bean chicken, string bean beef, beef onions, moo shu vegetable",
            "price": 18.95
        },
        {
            "id": 905,
            "short_name": "SP2",
            "name": "Teriyaki Chicken",
            "description": "marinated grilled chicken breast with vegetables and lo mein on the side",
            "price": 18.95
        },
        {
            "id": 906,
            "short_name": "SP3",
            "name": "Vegetable Tempura",
            "description": "assorted vegetables breaded and fried, served with lo mein on the side",
            "price": 15.95
        }
    ]


    return (
        <>
            <h2 id="menu-categories-title" className="text-center">Cafe Menu</h2>
            {menu.map(element => <div key={element.id} className="menu-card">
                <div className="menu-item-photo">
                    <div>${element.short_name}</div>
                    <img className="img-responsive" src="https://s1.1zoom.me/prev/500/499725.jpg"
                        alt="Item" />
                </div>
                <div className="menu-item-description">
                    <div className="menu-item-info">
                        <span><i className="fa-solid fa-indian-rupee-sign"></i> ${element.price * 30}</span>
                        <h3 className="menu-item-title">${element.name}</h3>
                    </div>
                    <p>${element.description}</p>
                </div>
            </div>)}

        </>
    )
}

export default FoodCard