
import "./landing.css"
import { Link, Route,useNavigate} from "react-router-dom";

export default function Navbar() {
    const router=useNavigate();
    return(
    <div className="header">
        <div className="logo">
            <img src="logo1.jpg" alt="logo" />
            <p>AgriConnect</p>
        </div>
        <div className="nav">
            <p onClick={() => router("/")}>Home</p>
            <p onClick={()=>{
                router("/mandi")
            }}>Mandi Prices</p>
            <p onClick={()=>{
                router("/weather")
            }}>Check weather</p>
            <p onClick={()=>{
                router("/government-schemes")
            }} >Scheme</p>
            <p onClick={()=>{
                router("/cropsoilhealth")
            }}>Ai Based Check Soil</p>
            <p onClick={()=>{
                router("/croprecommendation")
            }}>Manually check  Soil</p>
        </div>
    </div>
    )
}