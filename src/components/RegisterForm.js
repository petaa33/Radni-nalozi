import {
  Form,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Button,
  InputGroup,
} from "reactstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    phone: null,
    country: null,
    city: null,
    postal_code: null,
    adress: null,
  });
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  //DESTRUCT user
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    country,
    city,
    postal_code,
    adress,
  } = user;

  const handleSubmit = async () => {
    try {
      const res = await axios.post(process.env.REACT_APP_AUTH_REGISTER, user);
      console.log("ovo je rep", res);
      navigate("/login");
    } catch (error) {
      if (error) throw error;
    }
  };

  const validateEmail = (email) => {
    const isValid = new String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (isValid !== null) {
      return true;
    }
    return false;
  };

  const validatePassword = (txt)=> {
    const isValid = new String(txt)
      .toLowerCase()
      .match(
        /^[A-Za-z]\w{7,14}$/
      );
    if (isValid !== null) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    setValidEmail(validateEmail(email));
  }, [email]);

  useEffect(()=>{
    setValidPassword(validatePassword(password));
  }, [password])

  return (
    <>
      <Row className="mb-4">
        <Col style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Dobrodošli u ERPIS
          </div>
          <small style={{ fontSize: "0.8rem" }}>Kreiraj korisnički račun</small>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <Label for="firstName">Ime</Label>
              <Input
                name="firstName"
                placeholder="Ime..."
                type="text"
                value={first_name}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value })
                }
              />
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <Label for="lastName">Prezime</Label>
              <Input
                name="lastName"
                placeholder="Prezime..."
                type="text"
                value={last_name}
                onChange={(e) =>
                  setUser({ ...user, last_name: e.target.value })
                }
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <InputGroup>
                <Input
                  name="email"
                  placeholder="Email..."
                  type="email"
                  value={email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  valid={validEmail}
                  invalid={!validEmail}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="password">Lozinka</Label>
              <InputGroup>
                <Input
                  name="password"
                  placeholder="Lozinka..."
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  valid={validPassword}
                  invalid={!validPassword}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xl={3}>
            <FormGroup>
              <Label>Država</Label>
              <Input
                name="country"
                value={country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col xl={3}>
            <FormGroup>
              <Label for="exampleCity">Grad</Label>
              <Input
                id="exampleCity"
                name="city"
                value={city}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col xl={3}>
            <FormGroup>
              <Label for="exampleZip">Poštanski broj</Label>
              <Input
                id="exampleZip"
                value={postal_code}
                onChange={(e) =>
                  setUser({ ...user, postal_code: e.target.value })
                }
              />
            </FormGroup>
          </Col>
          <Col xl={3}>
            <FormGroup>
              <Label for="exampleState">Adresa</Label>
              <Input
                id="exampleState"
                name="state"
                value={adress}
                onChange={(e) => setUser({ ...user, adress: e.target.value })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button
          outline
          color="success"
          style={{ width: "100%" }}
          onClick={() => handleSubmit()}
          disabled={!validEmail || !validPassword}
        >
          Sign in
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
