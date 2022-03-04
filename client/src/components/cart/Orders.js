import LeftPanelHome from "./LeftPanelHome"
import OrderPanel from "./OrderPanel"
import Row from "react-bootstrap/esm/Row"
import Container from "react-bootstrap/esm/Container"
import IngredientsSelector from './IngredientsSelector'
const Orders = () => {

    return(
        <Container>

            <Row>
                <LeftPanelHome />
                <OrderPanel />
                <IngredientsSelector />
            </Row>

        </Container>
    )
}

export default Orders

