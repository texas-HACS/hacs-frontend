import React from "react";
import { Col, Container, Row } from "reactstrap";
import SponsorPackage from "../Wip/Corporate/SponsorPackage";
import Sponsors from "../Wip/Corporate/Sponsors";

export default class CorporatePage extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <SponsorPackage />
          </Col>
        </Row>
            <Sponsors />
      </Container>
    );
  }
}
