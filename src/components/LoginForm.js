import {useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";
import { useUser } from "../context/UserContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {auth, setAuth} = useUser();

  const handleLogin = async() => {
    try {
      const credentials = {
        email,
        password,
      }
      const res = await axios.post(process.env.REACT_APP_AUTH_LOGIN, credentials);
      console.log(res);
      console.log("Calling inside login form", auth);
      setAuth({
        isLoggedIn: res.data.auth.isLoggedIn,
        user: res.data.auth.user
      });

      navigate("/warrant");
      
    } catch (error) {
      if(error) console.log("first e  ee ");
    } 
  }

  return (
    <Form>
      <FormGroup>
        <Label>Email</Label>
        <Input
          placeholder="Unesi email..."
          type="email"
          style={{borderRadius: "50px"}}
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          placeholder="Unesi lozinku..."
          type="password"
          style={{borderRadius: "50px"}}
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </FormGroup>
      <Button color="success" onClick={()=> handleLogin()}>Login</Button>
    </Form>
  );
};

export default LoginForm;
