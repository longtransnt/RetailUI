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
import transactionServices from "services/transactionServices";

function Repay() {
  const { register, control, reset, trigger, setError, getValues } = useForm(
    {}
  );
  const [date, setDate] = useState("");
  const [employeeId, setEmployeeId] = useState("0");
  const [bankType, setBankType] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [resolveList, setResolveList] = useState([]);
  const handleSetDate = (event) => {
    const date = event.target.value;
    setDate(date);
  };

  const fetchTransactions = async () => {
    const response =
      await transactionServices.queryTransactionsByDateAndEmployee(
        bankType,
        date
      );
    console.log(response);
    setTransactions(response.data);
  };

  const handleCheck = async (e) => {
    if (e.target.checked === true) {
      resolveList.push(e.target.value);
      // console.log(resolveList);
    } else {
      const i = resolveList.indexOf(e.target.value);
      if (i > -1) {
        resolveList.splice(i, 1);
        setResolveList(resolveList);
      }
    }
    console.log(resolveList);
  };

  const handleSubmit = async () => {
    if (employeeId === "0" || bankType === "") {
      alert("Vui lòng chọn nhân viên!");
    } else {
      for (let i = 0; i < resolveList.length; i++) {
        transactionServices.updateTransactionForEmployee(
          resolveList[i],
          employeeId
        );
      }
    }
  };

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
                <Form onSubmit={handleSubmit}>
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
                        <label>Ngân Hàng</label>

                        <Form.Control
                          as="select"
                          value={bankType}
                          onChange={(e) => {
                            setBankType(e.target.value);
                          }}
                        >
                          <option defaultValue=""></option>
                          <option value="SCB">Sacombank</option>
                          <option value="VTB">Vietinbank</option>
                          <option value="VCB">Vietcombank</option>
                        </Form.Control>
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
                            <th className="border-0">Context</th>
                            <th className="border-0">Amount</th>
                            <th className="border-0">Type</th>
                            <th className="border-0">Date</th>
                            <th className="border-0">Trả Nợ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((item, key) => {
                            return (
                              <tr key={key}>
                                <td>{item.id}</td>
                                <td>{item.context}</td>
                                <td>
                                  {Number(item.amount).toLocaleString("vi-VN")}
                                </td>
                                <td>{item.type}</td>
                                <td>{item.date}</td>
                                <td>
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value={item.id}
                                    onChange={handleCheck}
                                  ></input>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Row>
                  </Form.Group>
                  <div class="buttonrow">
                    <Button
                      className="btn-fill pull-right"
                      variant="primary"
                      onClick={fetchTransactions}
                    >
                      Tìm Kiếm
                    </Button>
                    <Button
                      className="btn-fill pull-right"
                      variant="primary"
                      type="submit"
                    >
                      Trả Nợ
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

export default Repay;
