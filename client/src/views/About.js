import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const AboutSection = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col className="text-center">
          <h1 className="font-weight-bold">UniNotes<span style={{ color: "#FFD700" }}>Hub</span></h1>
          <h2 className="mb-4 font-weight-bold">Notes sharing Platform</h2>
          <h3 className="text-info mb-3">Why UniNotesHub?</h3>
          <p className="text-muted">
            In a landscape with numerous colleges under a single university sharing identical curricula,
            students face challenges in accessing study materials. Absence of an infrastructure for material
            exchange leaves them to independently gather notes. Each year, students compile notes for exams,
            resulting in massive paper wastage and repetition of efforts.
          </p>
          <p className="text-muted">
            UniNotesHub emerges as a remedy, a study material sharing platform eliminating redundancy. It allows
            students to upload, download, and freely share study materials, fostering a collaborative library.
          </p>
          <h3 className="text-info mb-3">What is UniNotesHub?</h3>
          <p className="text-muted">
            UniNotesHub stands as an open and free-for-all study material sharing platform. Students can
            effortlessly contribute, download, and share diverse study materials. This includes a space for
            teachers to share educational resources with their students.
          </p>
          <h3 className="text-info mb-3">How does it work?</h3>
          <p className="text-muted">
            While UniNotesHub operates openly, content relevance is maintained through a layer of administrators.
            Every student contribution undergoes scrutiny by UniNotesHub admins who approve or reject submissions.
            Once approved, study materials become accessible to the entire community.
          </p>
          <p className="text-muted">
            Join UniNotesHub in reshaping the learning experience - where knowledge is shared, and collaboration is key.
          </p>
          <Button
            variant="info"
            href="https://github.com/0anish0"
            size="lg"
            className="mt-3"
          >
            Explore More on GitHub
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutSection;
