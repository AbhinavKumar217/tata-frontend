import React, { useState, useEffect } from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { Button, Divider, Alert, AlertTitle } from "@mui/material";
import locImgUrls from "../constants/locImgUrls";
import { Container, Row, Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import GroundImgUrls from "../constants/GroundImgUrls";
import { makeApiRequest } from "../helpers/ApiWrapper";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StaffImgUrl from "../constants/StaffImgUrl";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [grounds, setGrounds] = useState([]);
  const [locations, setLocations] = useState([]);
  const [staff, setStaff] = useState([]);
  const [show, setShow] = useState(false);
  const rows = [];
  const rows2 = [];
  const rows3 = [];
  const navigate = useNavigate();

  function AlertDismissibleExample() {
    if (show) {
      return (
        <Alert severity="error" onClose={() => setShow(false)} dismissible>
          <AlertTitle>Error</AlertTitle>
          <p>Request cannot be processed</p>
        </Alert>
      );
    }
  }

  const fetchLocations = async () => {
    const endpoint = "/location/all";
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      const locationsData = response.map((location, index) => {
        return {
          id: location.id,
          name: location.name,
          city: location.city,
          state: location.state,
          country: location.country,
          locimgUrl: locImgUrls[index % locImgUrls.length],
        };
      });
      setLocations(locationsData);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  for (let i = 0; i < locations.length; i++) {
    rows2[i] = locations[i];
  }

  const fetchGrounds = async () => {
    const endpoint = "/grounds/all";
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      const groundsData = response.map((ground, index) => {
        return {
          id: ground.id,
          name: ground.name,
          location_id: ground.location_id,
          location_name: ground.location.name,
          items: ground.items,
          grdimageUrl: GroundImgUrls[index % GroundImgUrls.length],
        };
      });
      setGrounds(groundsData);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchGrounds();
  }, []);

  for (let i = 0; i < grounds.length; i++) {
    rows[i] = grounds[i];
  }

  const fetchStaff = async () => {
    const endpoint = "/staff/all";
    const method = "GET";

    try {
      const response = await makeApiRequest(method, endpoint);
      const staffData = response.map((staff, index) => {
        return {
          id: staff.id,
          name: staff.name,
          type: staff.type,
          ground_id: staff.ground_id,
          staffimgUrl: StaffImgUrl[index % StaffImgUrl.length],
        };
      });
      setStaff(staffData);
    } catch (error) {
      console.error(error);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  for (let i = 0; i < staff.length; i++) {
    rows3[i] = staff[i];
  }

  function handleSearch() {}

  return (
    <>
      <nav className="navbar navbar-light bg-light mb-4">
        <form className="container-fluid">
          <input
            style={{ maxWidth: "30%" }}
            className="form-control me-2"
            type="search"
            placeholder="Search Grounds"
            aria-label="Search"
            // Add an onChange event handler to handle search input
            onChange={(e) => handleSearch(e.target.value)}
          />
        </form>
      </nav>
      <div className="container text-center">
        <AlertDismissibleExample />
        <div className="text-center">
          <div className="text-center alert alert-info">
            <h2>Check out the Locations we provide</h2>
          </div>
          <Divider className="mb-5 mt-3" />
          <div className="text-center">
            <Carousel showThumbs={false} showStatus={false}>
              {rows2.map((location) => (
                <div key={location.id}>
                  <img src={location.locimgUrl} alt="Ground Image" />
                  <div className="carousel-caption">
                    <h5>{location.city}</h5>
                    <p>{location.state}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <Divider className="mt-5 mb-3" />
        <div className="text-center">
          <div className="text-center alert alert-info">
            <h2>Explore Grounds</h2>
          </div>
          <Divider className="mb-5 mt-3" />
          <Container>
            <Row xs={2} md={3} className="g-4 mt-1 text-center">
              {rows.map((row) => (
                <Col
                  style={{ padding: "10px" }}
                  className="text-center"
                  key={row.id}
                >
                  <Card>
                    <Container>
                      <Card.Img variant="top" src={row.grdimageUrl} alt="img" />
                      <Card.Body>
                        <Card.Title>Ground : {row.name}</Card.Title>
                        <Card.Text>
                          <b>Location : </b> {row.location_name}
                        </Card.Text>
                        <NavLink className="nav-item nav-link">
                          <NavLink
                            to={`/groundreq/${row.id}`}
                            className="nav-item nav-link"
                          >
                            <Button variant="outlined">Select Ground</Button>
                          </NavLink>
                        </NavLink>
                      </Card.Body>
                    </Container>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
          <Divider className="mb-5 mt-3" />
          <div className="text-center">
            <div className="text-center alert alert-info">
              <h2>Our Ground Staff</h2>
            </div>
            <Carousel
              showThumbs={false}
              showStatus={false}
              showArrows={true}
              showIndicators={false}
              emulateTouch
              infiniteLoop
              centerMode
              centerSlidePercentage={33.3}
              itemWidth={300}
            >
              {rows3.map((staff) => (
                <Card key={staff.id}>
                  <Container>
                    <Card.Img variant="top" src={staff.staffimgUrl} alt="img" />
                    <Card.Body>
                      <Card.Title>Ground : {staff.name}</Card.Title>
                      <Card.Text>
                        <b>Location : </b> {staff.id}
                      </Card.Text>
                    </Card.Body>
                  </Container>
                </Card>
              ))}
            </Carousel>
            <Divider className="mb-3 mt-5" />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
