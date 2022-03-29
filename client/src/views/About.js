import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const About = () => {
  return (
    <Row className="mt-5">
      <Col className="text-center">
        <Button
          variant="primary"
          href="https://www.facebook.com/profile.php?id=100008303445146"
          size="lg"
        >
          Visit my profile on Facebook
        </Button>
      </Col>
    </Row>
  );
};

export default About;
