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

    ]


    return (
        <>
            <div className="content-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">

                            <h2 id="menu-categories-title" className="text-center">Cafe Menu</h2>
                            <div className="d-flex flex-wrap gap-4 justify-content-center">
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
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FoodCard