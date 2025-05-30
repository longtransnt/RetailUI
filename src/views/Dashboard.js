import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import axios from "axios";
import balanceServices from "../services/balanceServices";
import transactionServices from "services/transactionServices";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import debtServices from "services/debtServices";

function Dashboard() {
  const [balance, setBalance] = useState([]);
  const [debtDatas, setDebtData] = useState({});

  const getBalance = async () => {
    let balances = await balanceServices.getLatestBalance();
    balances.total_balance = Number(balances.total_balance).toLocaleString(
      "vi-VN"
    );
    balances.cash_balance = Number(balances.cash_balance).toLocaleString(
      "vi-VN"
    );
    balances.bank1_balance = Number(balances.bank1_balance).toLocaleString(
      "vi-VN"
    );
    balances.bank2_balance = Number(balances.bank2_balance).toLocaleString(
      "vi-VN"
    );
    balances.software_balance = Number(
      balances.software_balance
    ).toLocaleString("vi-VN");

    setBalance(balances);
  };

  const getCurrentDebt = async () => {
    // console.log(debtDatas);
    let debts = await debtServices.getAllEmployeeDebt();
    let debt_array = [];
    let employee_array = [];

    for (var d in debts) {
      employee_array[d] = debts[d].name;
      debt_array[d] = debts[d].totalDebt;
    }
    const debt = { labels: employee_array, series: [debt_array] };
    setDebtData(debt);
    console.log(debt);
    // setDebt();
    // setEmployee(employee_array);
  };

  useEffect(() => {
    getBalance();
    getCurrentDebt();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-chart text-warning"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Số Dư Tổng</p>
                    <Card.Title as="h5">{balance.total_balance} VND</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-redo mr-1"></i>
                Update Now
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-light-3 text-success"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Vietinbank</p>
                    <Card.Title as="h5">{balance.bank1_balance} VND</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="far fa-calendar-alt mr-1"></i>
                Last day
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-light-3 text-success"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Vietcombank</p>
                    <Card.Title as="h5">{balance.bank2_balance} VND</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="far fa-calendar-alt mr-1"></i>
                Last day
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-vector text-danger"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Errors</p>
                    <Card.Title as="h4">23</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="far fa-clock-o mr-1"></i>
                In the last hour
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-favourite-28 text-primary"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Doanh Thu</p>
                    <Card.Title as="h5">
                      {balance.software_balance} VND
                    </Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-redo mr-1"></i>
                Update now
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-favourite-28 text-primary"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Followers</p>
                    <Card.Title as="h4">+45K</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-redo mr-1"></i>
                Update now
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Users Behavior</Card.Title>
              <p className="card-category">24 Hours performance</p>
            </Card.Header>
            <Card.Body>
              <div className="ct-chart" id="chartHours">
                <ChartistGraph
                  data={{
                    labels: [
                      "9:00AM",
                      "12:00AM",
                      "3:00PM",
                      "6:00PM",
                      "9:00PM",
                      "12:00PM",
                      "3:00AM",
                      "6:00AM",
                    ],
                    series: [
                      [287, 385, 490, 492, 554, 586, 698, 695],
                      [67, 152, 143, 240, 287, 335, 435, 437],
                      [23, 113, 67, 108, 190, 239, 307, 308],
                    ],
                  }}
                  type="Line"
                  options={{
                    low: 0,
                    high: 800,
                    showArea: false,
                    height: "245px",
                    axisX: {
                      showGrid: false,
                    },
                    lineSmooth: true,
                    showLine: true,
                    showPoint: true,
                    fullWidth: true,
                    chartPadding: {
                      right: 50,
                    },
                  }}
                  responsiveOptions={[
                    [
                      "screen and (max-width: 640px)",
                      {
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          },
                        },
                      },
                    ],
                  ]}
                />
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="legend">
                <i className="fas fa-circle text-info"></i>
                Open <i className="fas fa-circle text-danger"></i>
                Click <i className="fas fa-circle text-warning"></i>
                Click Second Time
              </div>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-history"></i>
                Updated 3 minutes ago
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Email Statistics</Card.Title>
              <p className="card-category">Last Campaign Performance</p>
            </Card.Header>
            <Card.Body>
              <div className="ct-chart ct-perfect-fourth" id="chartPreferences">
                <ChartistGraph
                  data={{
                    labels: ["40%", "20%", "40%"],
                    series: [40, 20, 40],
                  }}
                  type="Pie"
                />
              </div>
              <div className="legend">
                <i className="fas fa-circle text-info"></i>
                Open <i className="fas fa-circle text-danger"></i>
                Bounce <i className="fas fa-circle text-warning"></i>
                Unsubscribe
              </div>
              <hr></hr>
              <div className="stats">
                <i className="far fa-clock"></i>
                Campaign sent 2 days ago
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Tiền Nợ</Card.Title>
              <p className="card-category">
                Hoá đơn đã bán nhưng chưa nhận được tiền
              </p>
            </Card.Header>
            <Card.Body>
              <div className="ct-chart" id="chartActivity">
                <ChartistGraph
                  data={debtDatas}
                  type="Bar"
                  options={{
                    seriesBarDistance: 10,
                    axisX: {
                      showGrid: false,
                    },
                    axisY: {
                      showGrid: true,
                      showLabel: true,
                      offset: 100,
                    },
                    height: "245px",
                    scaleMinSpace: 10,
                  }}
                  responsiveOptions={[
                    [
                      "screen and (max-width: 700px)",
                      {
                        seriesBarDistance: 5,
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          },
                        },
                      },
                    ],
                  ]}
                />
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="legend">
                <i className="fas fa-circle text-info"></i>
                Tesla Model S <i className="fas fa-circle text-danger"></i>
                BMW 5 Series
              </div>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-check"></i>
                Data information certified
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col md="6">
          <Card className="card-tasks">
            <Card.Header>
              <Card.Title as="h4">Tasks</Card.Title>
              <p className="card-category">Backend development</p>
            </Card.Header>
            <Card.Body>
              <div className="table-full-width">
                <Table>
                  <tbody>
                    <tr>
                      <td>
                        <Form.Check className="mb-1 pl-0">
                          <Form.Check.Label>
                            <Form.Check.Input
                              defaultValue=""
                              type="checkbox"
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </td>
                      <td>
                        Sign contract for "What are conference organizers afraid
                        of?"
                      </td>
                      <td className="td-actions text-right">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-488980961">
                              Edit Task..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="info"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-506045838">Remove..</Tooltip>
                          }
                        >
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check className="mb-1 pl-0">
                          <Form.Check.Label>
                            <Form.Check.Input
                              defaultChecked
                              defaultValue=""
                              type="checkbox"
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </td>
                      <td>
                        Lines From Great Russian Literature? Or E-mails From My
                        Boss?
                      </td>
                      <td className="td-actions text-right">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-537440761">
                              Edit Task..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="info"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-21130535">Remove..</Tooltip>
                          }
                        >
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check className="mb-1 pl-0">
                          <Form.Check.Label>
                            <Form.Check.Input
                              defaultChecked
                              defaultValue=""
                              type="checkbox"
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </td>
                      <td>
                        Flooded: One year later, assessing what was lost and
                        what was found when a ravaging rain swept through metro
                        Detroit
                      </td>
                      <td className="td-actions text-right">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-577232198">
                              Edit Task..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="info"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-773861645">Remove..</Tooltip>
                          }
                        >
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check className="mb-1 pl-0">
                          <Form.Check.Label>
                            <Form.Check.Input
                              defaultChecked
                              type="checkbox"
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </td>
                      <td>
                        Create 4 Invisible User Experiences you Never Knew About
                      </td>
                      <td className="td-actions text-right">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-422471719">
                              Edit Task..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="info"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-829164576">Remove..</Tooltip>
                          }
                        >
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check className="mb-1 pl-0">
                          <Form.Check.Label>
                            <Form.Check.Input
                              defaultValue=""
                              type="checkbox"
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </td>
                      <td>Read "Following makes Medium better"</td>
                      <td className="td-actions text-right">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-160575228">
                              Edit Task..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="info"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-922981635">Remove..</Tooltip>
                          }
                        >
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Check className="mb-1 pl-0">
                          <Form.Check.Label>
                            <Form.Check.Input
                              defaultValue=""
                              disabled
                              type="checkbox"
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </td>
                      <td>Unfollow 5 enemies from twitter</td>
                      <td className="td-actions text-right">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-938342127">
                              Edit Task..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="info"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-119603706">Remove..</Tooltip>
                          }
                        >
                          <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="now-ui-icons loader_refresh spin"></i>
                Updated 3 minutes ago
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
