import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import LeftPanelHome from './LeftPanelHome'
import RightSidePanel from './RightSidePanel'
import Ingredients from '../features/ingredients.json'
import { useEffect } from 'react'



const Home = () => {

    return(
        
        <Container>

            <Row>
                <LeftPanelHome />
                <RightSidePanel />
            </Row>

        </Container>


    )
}

export default Home;