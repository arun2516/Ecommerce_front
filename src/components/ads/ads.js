import sale from "./images/b1.jpg"

export default function Advertise() {
    return (
        <div className="ads__image--container container">
            <img src={sale} alt="ecommerce" className="ads__image"/>
        </div>
    )
}
