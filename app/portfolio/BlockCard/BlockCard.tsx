import './BlockCard.css'

interface Props {
    items: Item[],
}

interface Item {
    id: number,
    title: string,
    url: string,
}

const BlockCard = (props: Props) => {

    return (
        <>
            <div className="block-card-list d-flex flex-wrap">
                {props.items.map(item => <div key={item.id} className="block-card-item">
                    <div className={`block-card-box`}>
                        <h5 className="block-head">{item.title}</h5>
                        <p className="block-text">See More</p>
                        <a className="block-img" href={item.url}><img src="/arrow.svg" alt="" /></a>
                    </div>
                </div>)}
            </div>
        </>
    )
}

export default BlockCard