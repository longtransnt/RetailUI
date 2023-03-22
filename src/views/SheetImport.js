import React, { useState } from "react";
import { read, utils, writeFile } from "xlsx";
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
  Alert,
} from "react-bootstrap";
import transactionServices from "services/transactionServices";
import NotificationAlert from "react-notification-alert";

const SheetImport = () => {
  const [bankFormat, setBankFormat] = useState("");
  const [date, setDate] = useState("");
  const [secondDate, setSecondDate] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const [data, setData] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);

  const formatTransaction = (transactions) => {
    let dataChart = [];
    let totalMoney = 0;

    transactions.forEach(function (transaction) {
      let value = "";
      let real = 0;
      if (bankFormat === "VTB") {
        value = transaction["1900-55-88-68\ncontact@vietinbank.vn"];
        real = parseFloat(value.replace(/,/g, ""));
        dataChart.push({
          id: transaction["__EMPTY"],
          date: transaction["__EMPTY_1"],
          content: transaction["__EMPTY_2"],
          value: value,
          real_value: real,
        });
      } else if (bankFormat === "VCB") {
        // console.log(transaction);
        if (+transaction["__EMPTY_1"]) {
          value = transaction["SAO KÊ TÀI KHOẢN\nSTATEMENT OF ACCOUNT"];
          real = parseFloat(value.replace(/,/g, ""));

          if (value === "") {
            value = transaction["__EMPTY_3"];
            real = -1 * parseFloat(value.replace(/,/g, ""));
            // console.log(real);
          }

          const day_array = transaction["__EMPTY_2"].split("\n");
          dataChart.push({
            id: transaction["__EMPTY_1"],
            date: day_array[0],
            content: transaction["__EMPTY_5"],
            value: value,
            real_value: real,
          });
        }
      } else if (bankFormat === "SCB") {
        // Get current transaction date

        const date_string = transaction["__EMPTY_4"].split(" ");

        // console.log(date);
        // console.log(secondDate);
        // console.log(date_string[0]);
        if (date1 !== "" && date_string[0] !== undefined) {
          if (date_string[0] === date1 || date_string[0] === date2) {
            // Get value and real value
            value = transaction["__EMPTY_18"] + "";
            real = parseFloat(value.replaceAll(".", ""));
            // If real value is error, check the negative error
            if (value === "undefined") {
              value = transaction["__EMPTY_16"] + "";
              real = -1 * parseFloat(value.replaceAll(".", ""));
            }
            const format_date = date_string[0].replaceAll("-", "/");

            // Push data in data frame
            dataChart.push({
              id: transaction["__EMPTY_1"],
              date: format_date,
              content: transaction["__EMPTY_12"],
              value: value,
              real_value: real,
            });
          }
        }

        // // If the date has not been initialized, and the date string is not error
        // if (current_date === "" && date_string[0] !== undefined) {
        //   current_date = date_string[0];
        // }

        // // If the date is initialized, and current date stay the same
        // if (
        //   date_string[0] !== undefined &&
        //   current_date !== "" &&
        //   date_string[0] === current_date
        // ) {
        //   // Get value and real value
        //   value = transaction["__EMPTY_18"] + "";
        //   real = parseFloat(value.replaceAll(".", ""));

        //   // If real value is error, check the negative error
        //   if (value === "undefined") {
        //     value = transaction["__EMPTY_16"] + "";
        //     real = -1 * parseFloat(value.replaceAll(".", ""));
        //   }

        //   const format_date = current_date.replaceAll("-", "/");

        //   // Push data in data frame
        //   dataChart.push({
        //     id: transaction["__EMPTY_1"],
        //     date: format_date,
        //     content: transaction["__EMPTY_12"],
        //     value: value,
        //     real_value: real,
        //   });
        // }
      }
      // Count total gain money and output to UI
      if (value !== undefined) {
        if (real > 0) {
          totalMoney += real;
        }
      }
    });

    setData(dataChart);
    setTotalMoney(totalMoney);
    // console.log(dataChart);
  };

  const handleImport = ($event) => {
    // ".toast".toast(option);
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          if (bankFormat === "VCB") {
            rows.splice(0, 10);
          } else if (bankFormat === "VTB") {
            rows.splice(0, 3);
          } else if (bankFormat === "SCB") {
            rows.splice(0, 22);
          }
          formatTransaction(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExport = () => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      transactionServices.postTransaction(element, bankFormat);
    }
    alert("Upload success!");
  };

  const formatDate = (event, isSecondDate) => {
    const dateArray = event.target.value.split("-");
    if (dateArray !== undefined) {
      if (isSecondDate === true) {
        setSecondDate(event.target.value);
        setDate2("" + dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0]);
      } else {
        setDate(event.target.value);
        setDate1("" + dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0]);
      }
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="3">
            <label>Chọn format xlsx từ ngân hàng:</label>
            <Form.Control
              as="select"
              value={bankFormat}
              onChange={(e) => {
                setBankFormat(e.target.value);
              }}
            >
              <option defaultValue=""></option>
              <option value="VCB">Vietcombank</option>
              <option value="SCB">Sacombank</option>
              <option value="VTB">Vietinbank</option>
            </Form.Control>
            <br />
          </Col>
          <Col className="pr-1" md="4">
            <label>Ngày Giao Dịch</label>
            <Form.Control
              type="date"
              onChange={(e) => {
                formatDate(e, false);
              }}
              value={date}
            />
          </Col>
          <Col className="pr-1" md="4">
            <label>Chọn Thêm Ngày</label>
            <Form.Control
              type="date"
              onChange={(e) => {
                formatDate(e, true);
              }}
              value={secondDate}
            />
          </Col>
          <Col className="pr-1" md="4">
            <div className="input-group">
              <div className="custom-file">
                <input
                  type="file"
                  name="file"
                  className="custom-file-input"
                  id="inputGroupFile"
                  required
                  onChange={handleImport}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </div>
            </div>

            {/* <div className="row mb-2 mt-5">
              <div className="col-sm-6 offset-3">
                <div className="row">
                  <div className="col-md-4">
                    
                  </div>
                </div>
              </div>
            </div> */}
          </Col>

          <Col>
            <div>Tổng Số Tiền Thu Được:</div>
            <span
              style={{
                color: "green",
                fontWeight: "bold",
              }}
            >
              {Number(totalMoney).toLocaleString("vi-VN")} VND
            </span>
          </Col>
          <Col>
            <span>
              <button
                onClick={handleExport}
                className="btn btn-primary float-right"
              >
                Tải lên CSDL <i className="fa fa-upload"></i>
              </button>
            </span>
          </Col>
        </Row>
        <Row>
          <div className="row">
            <div className="col-sm-6 offset-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Date</th>
                    <th scope="col">Info</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length ? (
                    data.map((transaction, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{transaction.date}</td>
                        <td>{transaction.content}</td>

                        <td>
                          {transaction.real_value < 0 ? (
                            <span className="badge bg-danger text-white">
                              - {transaction.value}
                            </span>
                          ) : (
                            <span className="badge bg-info text-white">
                              {transaction.value}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No transactions Found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SheetImport;
