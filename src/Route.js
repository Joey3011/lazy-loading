import React from "react";
import { Container, Row } from 'reactstrap'
import Page from './components/Page';


export const Route = () => {
  return (
    <Container>
        <Row>
            <Page />
        </Row>
    </Container>
  )
}
export default Route