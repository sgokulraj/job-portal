import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { format } from "date-fns";

function ViewJob({ job }) {
  const {
    title,
    companyName,
    companyUrl,
    description,
    location,
    experience,
    postedOn,
    skills,
    type,
  } = job;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {title} - {companyName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <i>Posted On:</i> {format(postedOn, "dd-MM-yyyy")}
          </p>
          <p>
            <i>Job Type:</i> {type}
          </p>
          <p>
            <i>Job Location:</i> {location}
          </p>
          <p>
            <i>Experience:</i> {`${experience} Yrs`}
          </p>
          <p>
            <i>Description:</i> {description}
          </p>
          <p>
            <i>Website:</i> <a href={companyUrl}>{companyUrl}</a>
          </p>
          <div>
            <i>Skills:</i>
            {skills.map((skill) => {
              return (
                <p key={skill} className="skill">
                  {skill}{" "}
                </p>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewJob;
