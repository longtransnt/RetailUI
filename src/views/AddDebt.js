import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import debtServices from "services/debtServices";

function AddDebt() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [employeeId, setEmployeeId] = useState(0);
  const UPDATE_INTERVAL = 100000; // 10S

  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setError,
    getValues,
  } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "debt",
  });

  // const updateTotalAmount = async () => {
  //   for (let item in fields) {
  //     console.log(item);
  //   }
  // };

  const calcTotalDebt = () => {
    let temp = 0;
    for (let i = 0; i < getValues(`debt`).length; i++) {
      temp += Number(getValues(`debt.${i}.amount`));
    }

    if (temp > totalAmount) {
      setTotalAmount(temp);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Nhập Nợ Mới</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form
                  onSubmit={handleSubmit((data) =>
                    debtServices.uploadDebts(employeeId, data)
                  )}
                >
                  <Form.Group>
                    <Row>
                      <Col className="pr-1" md="3">
                        <label>Nhân Viên</label>

                        <Form.Control
                          as="select"
                          value={employeeId}
                          onChange={(e) => {
                            setEmployeeId(e.target.value);
                          }}
                        >
                          <option defaultValue="0"></option>
                          <option value="1">Nhật</option>
                          <option value="2">Kim Chi</option>
                          <option value="3">Thu</option>
                          <option value="4">Út</option>
                          <option value="5">Mi</option>
                          <option value="6">Hà</option>
                          <option value="7">Kim Cương</option>
                        </Form.Control>
                      </Col>
                      <Col>
                        <label>Tổng Số Tiền Nợ Nhập Vào:</label>
                        <br />
                        <label
                          style={{
                            color: "green",
                            fontWeight: "bold",
                            fontSize: 25,
                          }}
                        >
                          {Number(totalAmount).toLocaleString("vi-VN")} VND
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <ul>
                        {fields.map((item, index) => (
                          <li key={item.id}>
                            <Row>
                              <Col className="pr-1" md="3">
                                <Form.Control
                                  type="datetime-local"
                                  {...register(`debt.${index}.date`)}
                                />
                              </Col>
                              <Col className="p-1" md="3">
                                <Controller
                                  render={({ field }) => (
                                    <Form.Control {...field} />
                                  )}
                                  name={`debt.${index}.amount`}
                                  control={control}
                                />
                              </Col>
                              <Col className="pl-1" md="4">
                                <Button
                                  className="btn-fill pull-right"
                                  variant="danger"
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  Xoá
                                </Button>
                              </Col>
                            </Row>
                          </li>
                        ))}
                      </ul>
                    </Row>
                  </Form.Group>
                  <div class="buttonrow">
                    <Button
                      className="btn-fill pull-right"
                      variant="secondary"
                      type="button"
                      onClick={() =>
                        append({ date: "2023-03-01T00:00", amount: "0" })
                      }
                    >
                      Thêm Dòng
                    </Button>
                    <Button
                      className="btn-fill pull-right"
                      variant="info"
                      onClick={calcTotalDebt}
                    >
                      Tính số tiền nợ sẽ nhập
                    </Button>
                    <Button
                      className="btn-fill pull-right"
                      variant="primary"
                      type="submit"
                    >
                      Nhập Nợ
                    </Button>
                  </div>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddDebt;

{
  /* <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Company (disabled)</label>
                        <Form.Control
                          defaultValue="Creative Code Inc."
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          placeholder="ZIP Code"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row> */
}
{
  /* <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button> */
}
{
  /* <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg")}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col> */
}
