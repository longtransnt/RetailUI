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
  const [dataExport, setDataExport] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);

  const formatTransaction = (transactions) => {
    let dataChart = [];
    let dataChart2 = [];
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
        if (+transaction["__EMPTY_1"]) {
          value = transaction["SAO KÊ TÀI KHOẢN\nSTATEMENT OF ACCOUNT"];
          real = parseFloat(value.replace(/,/g, ""));

          if (value === "") {
            value = transaction["__EMPTY_3"];
            real = -1 * parseFloat(value.replace(/,/g, ""));
          }

          const day_array = transaction["__EMPTY_2"].split("\n");
          const stringArray = day_array[0].split("/");
          const format_date =
            stringArray[2] + "-" + stringArray[1] + "-" + stringArray[0];
          dataChart.push({
            id: transaction["__EMPTY_1"],
            date: format_date,
            content: transaction["__EMPTY_5"],
            value: value,
            real_value: real,
          });

          if (real > 0) {
            dataChart2.push({
              id: transaction["__EMPTY_1"],
              date: format_date,
              content: transaction["__EMPTY_5"],
              value: value,
              real_value: real,
            });
          }
        }
      } else if (bankFormat === "SCB") {
        // Get current transaction date
        console.log(transaction);
        const date_string = transaction["__EMPTY_4"].split(" ");
        const stringArray = date_string[0].split("-");
        const format_date =
          stringArray[2] + "-" + stringArray[1] + "-" + stringArray[0];
        if (date1 !== "" && format_date !== undefined) {
          if (format_date === date1 || format_date === date2) {
            // Get value and real value
            value = transaction["__EMPTY_18"] + "";
            real = parseFloat(value.replaceAll(".", ""));
            // If real value is error, check the negative error
            if (value === "undefined") {
              value = transaction["__EMPTY_16"] + "";
              real = -1 * parseFloat(value.replaceAll(".", ""));
            }

            // Push data in data frame
            dataChart.push({
              id: transaction["__EMPTY_1"],
              date: format_date,
              content: transaction["__EMPTY_12"],
              value: value,
              real_value: real,
            });

            if (real > 0) {
              // Push data export if real value is larger than 0
              dataChart2.push({
                id: transaction["__EMPTY_1"],
                date: format_date,
                content: transaction["__EMPTY_12"],
                value: value,
                real_value: real,
              });
            }
          }
        }
      }
      // Count total gain money and output to UI
      if (value !== undefined) {
        if (real > 0) {
          totalMoney += real;
        }
      }
    });
    dataChart2.push({
      value: "Tổng Tiền",
      real_value: totalMoney,
    });
    setData(dataChart);
    setDataExport(dataChart2);
    setTotalMoney(totalMoney);
  };

  const handleImport = ($event) => {
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

  const handleUpload = () => {
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

  const handleExport = () => {
    const headings = [
      ["STT", "Ngày", "Nội Dung", "Số Tiền GĐ", "Số Tiền Thực"],
    ];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, dataExport, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "transaction Report.xlsx");
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
                setDate1(e.target.value);
              }}
              value={date1}
            />
          </Col>
          <Col className="pr-1" md="4">
            <label>Chọn Thêm Ngày</label>
            <Form.Control
              type="date"
              onChange={(e) => {
                setDate2(e.target.value);
              }}
              value={date2}
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
                onClick={handleUpload}
                className="btn btn-primary float-right"
              >
                Tải lên CSDL <i className="fa fa-upload"></i>
              </button>
            </span>
          </Col>
          <Col>
            <span>
              <button
                onClick={handleExport}
                className="btn btn-primary float-right"
              >
                Tải Về <i className="fa fa-download"></i>
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
