import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import debtServices from "services/debtServices";

function AddDebt() {
  const [totalAmount, setTotalAmount] = useState(0);
  // const [employeeId, setEmployeeId] = useState(0);

  const { register, control, handleSubmit, getValues } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "debt",
  });

  const calcTotalDebt = () => {
    let temp = 0;
    for (let i = 0; i < getValues(`debt`).length; i++) {
      temp += Number(getValues(`debt.${i}.amount`));
    }

    if (temp > 0) {
      temp *= 1000;
      setTotalAmount(temp);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Nhập Nợ Mới</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form
                  onSubmit={handleSubmit((data) =>
                    debtServices.uploadDebts(data)
                  )}
                >
                  <Form.Group>
                    <Row>
                      <Col className="pl-2" md="3">
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
                                {/* <label>Ngày</label> */}

                                <Form.Control
                                  type="date"
                                  {...register(`debt.${index}.date`)}
                                />
                              </Col>
                              <Col className="p-1" md="2">
                                {/* <label>Tên Nhân Viên</label> */}

                                <Form.Control
                                  as="select"
                                  {...register(`debt.${index}.employeeId`)}
                                >
                                  <option defaultValue="0">
                                    {" "}
                                    - Nhân Viên -
                                  </option>
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
                                {/* <label>Số Tiền</label> */}

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
