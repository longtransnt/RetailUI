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
} from "react-bootstrap";

const SheetImport = () => {
  const [bankFormat, setBankFormat] = useState("");
  const [data, setData] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);

  const formatTransaction = (transactions) => {
    let dataChart = [];
    let totalMoney = 0;

    transactions.forEach(function (transaction) {
      let value = "";
      if (bankFormat == "VTB") {
        value = transaction["1900-55-88-68\ncontact@vietinbank.vn"];
        dataChart.push({
          id: transaction["__EMPTY"],
          date: transaction["__EMPTY_1"],
          content: transaction["__EMPTY_2"],
          value: value,
        });
      } else if (bankFormat == "VCB") {
        if (+transaction["__EMPTY_1"]) {
          value = transaction["SAO KÊ TÀI KHOẢN\nSTATEMENT OF ACCOUNT"];
          dataChart.push({
            id: transaction["__EMPTY_1"],
            date: transaction["__EMPTY_2"],
            content: transaction["__EMPTY_5"],
            value: value,
          });
        }
      }
      if (value !== undefined) {
        let real = parseFloat(value.replace(/,/g, ""));
        if (real > 0) {
          totalMoney += real;
        }
      }
    });

    setData(dataChart);
    setTotalMoney(totalMoney);
    // console.log(totalMoney);
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
          // console.log(rows);
          if (bankFormat == "VCB") {
            rows.splice(0, 10);
          } else if (bankFormat == "VTB") {
            rows.splice(0, 3);
          }
          formatTransaction(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExport = () => {
    const headings = [["STT", "Ngày", "Nội Dung", "Số Tiền GĐ"]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, data, { origin: "A2", skipHeader: true });
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
              <option value="VTB">Vietinbank</option>
            </Form.Control>
          </Col>
          <Col md="6">
            <div className="row mb-2 mt-5">
              <div className="col-sm-6 offset-3">
                <div className="row">
                  <div className="col-md-6">
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
                  </div>
                  {/* <div className="col-md-6">
                    <button
                      disabled
                      onClick={handleExport}
                      className="btn btn-primary float-right"
                    >
                      Export <i className="fa fa-download"></i>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <label>Tổng Số Tiền Thu Được:</label>
            <br />
            <label
              style={{
                color: "green",
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              {Number(totalMoney).toLocaleString("vi-VN")} VND
            </label>
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
                          <span className="badge bg-warning text-dark">
                            {transaction.value}
                          </span>
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
