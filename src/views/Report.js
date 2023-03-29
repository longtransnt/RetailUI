import React, { useState } from "react";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import balanceServices from "services/balanceServices";
import debtServices from "services/debtServices";
import transactionServices from "services/transactionServices";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { redirect } from "react-router-dom";

function Report() {
  const { register, control, handleSubmit, getValues } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "debt",
  });
  const [bankAmount1, setBankAmount1] = useState(0);
  const [bankAmount2, setBankAmount2] = useState(0);
  const [income1, setIncome1] = useState(0);
  const [income2, setIncome2] = useState(0);
  const [softwareIncome, setSoftwareIncome] = useState(0);
  const [cashIncome, setCashIncome] = useState(0);
  const [saleAmount, setSaleAmount] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  const [date, setDate] = useState("");
  const [dateArray, setDateArray] = useState(["YYYY", "MM", "DD"]);
  const [nextDate, setNextDate] = useState("");
  const [debt, setDebt] = useState([]);

  const handleDateChange = async (event) => {
    setDebt([]);
    const target = event.target.value;
    const array = target.split("-");
    setDate(target);
    setDateArray(array);
    setNextDate(Number(array[2]) + 1);

    const debts = await debtServices.getAllEmployeeDebtOnDate(target);
    // setDebt(debts);
    console.log(debts);

    const bank1 = await transactionServices.getTotalTransactionValue(
      "SCB",
      target
    );
    setBankAmount1(bank1.value);

    const bank2 = await transactionServices.getTotalTransactionValue(
      "VCB",
      target
    );
    setBankAmount2(bank2.value);
  };

  const handleUpload = async () => {
    const balance = bankAmount1 + bankAmount2 - totalSpend;
    const data = {
      software_balance: softwareIncome,
      cash_balance: cashIncome,
      date: date,
      total_spend: totalSpend,
      bank_balance1: bankAmount1,
      bank_balance2: bankAmount2,
      shop_income1: income1,
      shop_income2: income2,
      balance: balance,
      sale_amount: saleAmount,
    };
    // console.log(data);

    const response = await balanceServices.postBalance(data);
    // console.log(response);
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Báo Cáo Chuyển Khoảng, Thu Chi</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form
                  onSubmit={handleSubmit(async (data) => {
                    await debtServices.uploadDebts(data, date);
                    await handleUpload();
                    alert("Báo Cáo Đã Được Lưu Lại");
                  })}
                >
                  <Row>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Ngày</label>
                        <Form.Control
                          onChange={handleDateChange}
                          type="date"
                          value={date}
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Tổng Chi</label>
                        <Form.Control
                          onChange={(e) => setTotalSpend(e.target.value)}
                          type="number"
                          value={totalSpend}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Tiền Phượng {dateArray[2] + "/" + dateArray[1]}
                        </label>
                        <Form.Control
                          value={income1}
                          onChange={(e) => setIncome1(e.target.value)}
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>
                          Tiền Phượng {nextDate + "/" + dateArray[1]}
                        </label>
                        <Form.Control
                          value={income2}
                          onChange={(e) => setIncome2(e.target.value)}
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Tổng Phần Mềm</label>
                        <Form.Control
                          value={softwareIncome}
                          onChange={(e) => setSoftwareIncome(e.target.value)}
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="2">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Tổng Thu Được
                        </label>
                        <Form.Control
                          value={cashIncome}
                          onChange={(e) => setCashIncome(e.target.value)}
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="2">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Số Món Bán</label>
                        <Form.Control
                          value={saleAmount}
                          onChange={(e) => setSaleAmount(e.target.value)}
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Sacombank</label>
                        <Form.Control
                          value={bankAmount1}
                          disabled
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                      <Form.Group>
                        <label>Vietcombank</label>
                        <Form.Control
                          value={bankAmount2}
                          disabled
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="2">
                      <Form.Group>
                        <label>Tổng Chuyển Khoảng</label>
                        <Form.Control
                          value={bankAmount1 + bankAmount2}
                          // defaultValue={bankAmount1 + bankAmount2}
                          placeholder=""
                          type="number"
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <label>Nợ:</label>
                    <ul>
                      {fields.map((item, index) => (
                        <li key={item.id}>
                          <Row>
                            <Col className="pr-1" md="2">
                              <Form.Control
                                as="select"
                                {...register(`debt.${index}.employeeId`)}
                              >
                                <option defaultValue="0"> - Nhân Viên -</option>
                                <option value="1">Nhật</option>
                                <option value="2">Kim Chi</option>
                                <option value="3">Út (Hải)</option>
                                <option value="4">Tiên</option>
                                <option value="5">Thu</option>
                                <option value="6">K.Cương</option>
                                <option value="7">Mi</option>
                                <option value="8">Hà</option>
                              </Form.Control>
                            </Col>
                            <Col className="p-1" md="2">
                              <Controller
                                render={({ field }) => (
                                  <Form.Control {...field} />
                                )}
                                name={`debt.${index}.amount`}
                                control={control}
                              />
                            </Col>

                            <Col className="pl-1" md="3">
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

                  <div class="buttonrow">
                    <br />
                    <Button
                      className="btn-fill pull-right"
                      variant="secondary"
                      type="button"
                      onClick={() => append({ amount: "0" })}
                    >
                      Thêm Nợ
                    </Button>
                    <Button
                      className="btn-fill pull-right"
                      variant="info"
                      type="submit"
                    >
                      Xác Nhận
                    </Button>
                  </div>
                  {/* <div className="clearfix"></div> */}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Report;
