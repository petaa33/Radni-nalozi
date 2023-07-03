import React from 'react'
import WarrantTable from '../components/WarrantTable'
import {Container, Row, Col} from "reactstrap";
import BaseHeader from '../base_components/BaseHeader';
import PrimaryTheme from '../themes/PrimaryTheme';

const MyWarrants = () => {
  return (
    <Container fluid className='container-main'>
        <Row>
            <Col xxl={11} style={PrimaryTheme}>
                <BaseHeader color={"indigo"} borderColor={"#667eea"}>Moji proizvodni nalozi</BaseHeader>
                <WarrantTable />
            </Col>
        </Row>
    </Container>
  )
}

export default MyWarrants