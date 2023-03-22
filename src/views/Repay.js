import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Table,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Repay() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setError,
    getValues,
  } = useForm({});
  const [date, setDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const handleSetDate = (event) => {
    const date = event.target.value;
    setDate(date);
  };

  const fetchTransactions = () => {};

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Tìm Chuyển Khoảng Theo Ngày</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Row>
                      <Col className="pr-1" md="4">
                        <label>Ngày Giao Dịch</label>
                        <Form.Control
                          type="date"
                          onChange={handleSetDate}
                          value={date}
                        />
                      </Col>
                      <Col className="pr-1" md="4">
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
                    </Row>
                    <Row>
                      <Table className="table-hover table-striped">
                        <thead>
                          <tr>
                            <th className="border-0">ID</th>
                            <th className="border-0">Name</th>
                            <th className="border-0">Salary</th>
                            <th className="border-0">Country</th>
                            <th className="border-0">City</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Dakota Rice</td>
                            <td>$36,738</td>
                            <td>Niger</td>
                            <td>Oud-Turnhout</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Minerva Hooper</td>
                            <td>$23,789</td>
                            <td>Curaçao</td>
                            <td>Sinaai-Waas</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Sage Rodriguez</td>
                            <td>$56,142</td>
                            <td>Netherlands</td>
                            <td>Baileux</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Philip Chaney</td>
                            <td>$38,735</td>
                            <td>Korea, South</td>
                            <td>Overland Park</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Doris Greene</td>
                            <td>$63,542</td>
                            <td>Malawi</td>
                            <td>Feldkirchen in Kärnten</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Mason Porter</td>
                            <td>$78,615</td>
                            <td>Chile</td>
                            <td>Gloucester</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Row>
                  </Form.Group>
                  <Button
                    className="btn-fill pull-right"
                    variant="primary"
                    type="submit"
                  >
                    Nhập Nợ
                  </Button>
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

export default Repay;
