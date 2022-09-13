import { useLocation } from "react-router-dom"

const Success = () => {
    const location = useLocation()
    console.log(location);

    return (
        <div style={{ position: "absolute", top: 0, left: 0, height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "-1" }}>
            <div style={{ fontSize: "40px", fontWeight: "200" }}>PAYMENT SUCCESSFUL! YOUR ORDER HAS BEEN PLACED.</div>
        </div>
    )
}

export default Success