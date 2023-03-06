import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <input_form>
      {success ? (
        <Container fluid>
          <Row>
            <Col className="pr-1" md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Đăng kí thành công!</Card.Title>
                </Card.Header>
                <Card.Body>
                  <p>
                    <a href="#">Đăng nhập</a>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Đăng Kí</Card.Title>
                </Card.Header>
                <Card.Body>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="pr-1" md="12">
                        <Form.Group>
                          <label htmlFor="username">
                            Người Dùng:
                            <FontAwesomeIcon
                              icon={faCheck}
                              className={validName ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                              icon={faTimes}
                              className={
                                validName || !user ? "hide" : "invalid"
                              }
                            />
                          </label>
                          <Form.Control
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <p
                      id="uidnote"
                      className={
                        userFocus && user && !validName
                          ? "instructions"
                          : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Từ 4 đến 24 kí tự.
                      <br />
                      Phải bắt đầu bằng chữ.
                      <br />
                      Chữ, số, gạch dưới, gạch ngang đều được.
                    </p>
                    <Row>
                      <Col className="pr-1" md="12">
                        <Form.Group>
                          <label htmlFor="password">
                            Mật Khẩu:
                            <FontAwesomeIcon
                              icon={faCheck}
                              className={validPwd ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                              icon={faTimes}
                              className={validPwd || !pwd ? "hide" : "invalid"}
                            />
                          </label>
                          <Form.Control
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <p
                      id="pwdnote"
                      className={
                        pwdFocus && !validPwd ? "instructions" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Từ 8 đến 24 kí tự.
                      <br />
                      Bao gồm chữ viết hoa, viết thường, số, và kí tự đặc biệt.
                      <br />
                      Kí tự đặc biệt được cho phép:{" "}
                      <span aria-label="exclamation mark">!</span>{" "}
                      <span aria-label="at symbol">@</span>{" "}
                      <span aria-label="hashtag">#</span>{" "}
                      <span aria-label="dollar sign">$</span>{" "}
                      <span aria-label="percent">%</span>
                    </p>
                    <Row>
                      <Col className="pr-1" md="12">
                        <Form.Group>
                          <label htmlFor="confirm_pwd">
                            Xác Nhận Mật Khẩu
                            <FontAwesomeIcon
                              icon={faCheck}
                              className={
                                validMatch && matchPwd ? "valid" : "hide"
                              }
                            />
                            <FontAwesomeIcon
                              icon={faTimes}
                              className={
                                validMatch || !matchPwd ? "hide" : "invalid"
                              }
                            />
                          </label>
                          <Form.Control
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <p
                      id="confirmnote"
                      className={
                        matchFocus && !validMatch ? "instructions" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Phải cùng mật khẩu đã nhập ở trên.
                    </p>
                    <p>
                      Đã có tài khoản?
                      <br />
                      <span className="line">
                        <Link to="/" style={{ color: "navy" }}>
                          Đăng nhập
                        </Link>
                      </span>
                    </p>
                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                      disabled={
                        !validName || !validPwd || !validMatch ? true : false
                      }
                    >
                      Đăng Kí
                    </Button>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </input_form>
  );
};

export default Register;
