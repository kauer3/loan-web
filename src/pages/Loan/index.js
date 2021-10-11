import React, { useState, useEffect } from "react";

import api from "../../services/api";
import moment from "moment";
import "moment/locale/pt-br";

import { Container, GlobalStyles, Form, Simulation } from "./styles";

moment.locale("pt-br");

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const formatDate = (date) => {
  return moment.utc(date.toLocaleString()).format("DD/MM/YYYY");
};

export default function Loan() {
  const [simulation, setSimulation] = useState({});
  const [simulated, setSimulated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [valueFocus, setValueFocus] = useState(false);
  const [paybackFocus, setPaybackFocus] = useState(false);
  const [submit, setSubmit] = useState(false);

  const simulate = async (loan) => {
    try {
      const response = await api.get("/loan/simulate", {
        params: {
          cpf: loan.cpf,
          uf: loan.uf,
          birth: formatDate(loan.birth),
          loan_amount: loan.loan_amount,
          monthly_payback: loan.monthly_payback,
        },
      });
      setSimulation(response.data);
      setSimulated(true);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const saveLoan = async (loan) => {
    try {
      const response = await api.post("/loan", {
        cpf: Number(loan.cpf),
        uf: loan.uf,
        birth: loan.birth,
        loan_amount: loan.loan_amount,
        monthly_payback: loan.monthly_payback,
        monthly_fee: loan.monthly_fee,
        total_fees: loan.total_fees,
        months: loan.months,
      });
      setSaved(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <GlobalStyles simulated={simulated} />
      {saved ? (
        <h1 className="saved">Empréstimo efetivado com sucesso!</h1>
      ) : (
        <>
          <h1 className="title">Simule e solicite o seu empréstimo.</h1>
          <h5 className={`subTitle ${loading && "loading"}`}>
            {loading
              ? "Carregando..."
              : "Preencha o formulário abaixo para simular"}
          </h5>
          <Form
            simulated={simulated}
            submit={submit}
            onSubmit={(e) => {
              e.preventDefault();
              const sim = simulate(editData);
              if (sim) {
                setLoading(true);
                setTimeout(() => {
                  window.scroll({
                    top: 700,
                    behavior: "smooth",
                  });
                  setLoading(false);
                }, 2000);
              }
            }}
          >
            <input
              required
              pattern="\d+"
              type="number"
              placeholder="CPF"
              value={editData ? editData.cpf : ""}
              onChange={(e) => {
                setEditData({ ...editData, cpf: e.target.value });
              }}
            />
            <select
              required
              placeholder="Categoria"
              name="category"
              id="category"
              value={editData ? editData.uf : ""}
              onChange={(e) => {
                setEditData({ ...editData, uf: e.target.value });
              }}
            >
              <option value="" disabled selected hidden>
                UF
              </option>
              <option value="SP">SP</option>
              <option value="MG">MG</option>
              <option value="RJ">RJ</option>
              <option value="ES">ES</option>
            </select>
            <input
              required
              type="date"
              placeholder="DATA DE NASCIMENTO"
              value={editData ? editData.birth : ""}
              onChange={(e) => {
                setEditData({ ...editData, birth: e.target.value });
              }}
            />
            <input
              required
              type={valueFocus ? "number" : "text"}
              min="50000"
              placeholder="QUAL O VALOR DO EMPRÉSTIMO?"
              value={
                editData
                  ? valueFocus
                    ? editData.loan_amount
                    : editData.loan_amount_formatted
                  : ""
              }
              onChange={(e) => {
                setEditData({ ...editData, loan_amount: e.target.value });
              }}
              onFocus={() => setValueFocus(true)}
              onBlur={(e) => {
                setValueFocus(false);
                if (editData.loan_amount) {
                  let value = editData.loan_amount;
                  if (e.target.value < 50000) {
                    value = 50000;
                  }
                  setEditData({
                    ...editData,
                    loan_amount: value,
                    loan_amount_formatted: formatter.format(value),
                  });
                }
              }}
            />
            <input
              required
              type={paybackFocus ? "number" : "text"}
              min="0"
              placeholder="QUAL VALOR DESEJA PAGAR POR MÊS?"
              value={
                editData
                  ? paybackFocus
                    ? editData.monthly_payback
                    : editData.monthly_payback_formatted
                  : ""
              }
              onChange={(e) => {
                setEditData({ ...editData, monthly_payback: e.target.value });
              }}
              onFocus={() => setPaybackFocus(true)}
              onBlur={(e) => {
                setPaybackFocus(false);
                if (editData.monthly_payback) {
                  let value = editData.monthly_payback;
                  if (e.target.value < 0) {
                    value = 0;
                  }
                  setEditData({
                    ...editData,
                    monthly_payback: value,
                    monthly_payback_formatted: formatter.format(value),
                  });
                }
              }}
            />
            <input
              type="submit"
              value="Simular"
              onClick={() => setSubmit(true)}
            />
          </Form>
          {simulated && (
            <h5
              className={`subTitle simulation-subtitle ${
                !simulation.approved && "error"
              }`}
            >
              {simulation.approved
                ? "Veja a simulação do seu empréstimo antes de efetivá-lo"
                : simulation.message}
            </h5>
          )}
          {simulation.approved && (
            <Simulation>
              <div className="first_section">
                <div className="amount sub_section">
                  <h5 className="name">VALOR REQUERIDO</h5>
                  <h4 className="value">
                    {formatter.format(simulation.loan_amount)}
                  </h4>
                </div>
                <div className="fee sub_section">
                  <h5 className="name">TAXA DE JUROS</h5>
                  <h4 className="value">{simulation.monthly_fee}% ao mês</h4>
                </div>
                <div className="monthly_payback sub_section">
                  <h5 className="name">VALOR DA PARCELA</h5>
                  <h4 className="value">
                    {formatter.format(simulation.monthly_payback)}
                  </h4>
                </div>
                <div className="amount sub_section">
                  <h5 className="name">TOTAL DE MESES PARA QUITAR</h5>
                  <h4 className="value">{simulation.months}</h4>
                </div>
                <div className="amount sub_section">
                  <h5 className="name">TOTAL DE JUROS</h5>
                  <h4 className="value">
                    {formatter.format(simulation.total_fees)}
                  </h4>
                </div>
                <div className="amount sub_section">
                  <h5 className="name">TOTAL A PAGAR</h5>
                  <h4 className="value">
                    {formatter.format(
                      simulation.total_fees + Number(simulation.loan_amount)
                    )}
                  </h4>
                </div>
              </div>
              <div className="second_section">
                <h5 className="second_section_title">PROJEÇÃO DAS PARCELAS:</h5>
                <table>
                  <tr>
                    <th>SALDO DEVEDOR</th>
                    <th>JUROS</th>
                    <th>SALDO DEVEDOR AJUSTADO</th>
                    <th>VALOR DA PARCELA</th>
                    <th>VENCIMENTO</th>
                  </tr>
                  {simulation.monthly_update.map((month) => {
                    return (
                      <tr>
                        <td>{formatter.format(month.to_be_paid)}</td>
                        <td>{formatter.format(month.current_fee)}</td>
                        <td>{formatter.format(month.to_be_paid_with_fees)}</td>
                        <td>{formatter.format(month.current_payback)}</td>
                        <td>{month.expiration_date}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td>{formatter.format(0)}</td>
                  </tr>
                </table>
                <hr />
                <div className="buttonWrapper">
                  <input
                    type="button"
                    className="submit"
                    value="EFETIVAR O EMPRÉSTIMO"
                    onClick={() => saveLoan(simulation)}
                  />
                </div>
              </div>
            </Simulation>
          )}
        </>
      )}
    </Container>
  );
}
