import styled, { createGlobalStyle, keyframes } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background: #E5E5E5;
    padding: ${(props) => (props.simulated ? "20px 0 20px" : "5px 0 5px")} 0;
    transition: ease-in-out .1s;
  }
`;

const Loading = keyframes`
  0% {
    transform: scale(1);
    filter: invert(0%);
  }
  50% {
    transform: scale(1.3, 1.1);
    filter: invert(30%);
  }
  100% {
    transform: scale(1);
    filter: invert(0%);
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  wrap: no-wrap;
  align-items: center;

  .saved {
    position: absolute;
    font-family: "Open Sans", sans-serif;
    font-size: 40px;
    font-weight: bold;
    color: #444;
    top: 35%;
  }

  .loading {
    animation: ${Loading};
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
  }

  .title {
    font-family: "Open Sans", sans-serif;
    font-size: 50px;
    font-weight: 300;
    margin: 1vh;
    color: #8f99a6;
  }

  .subTitle {
    font-family: "Open Sans", sans-serif;
    font-size: 20px;
    font-weight: bold;
    margin: 2vh;
    color: #000;
  }

  .error {
    color: #ff3434;
  }

  @media screen and (max-width: 830px) {
    .title {
      font-size: 6vw;
    }

    .subTitle,
    .saved {
      font-size: 4vw;
    }

    .simulation-subtitle {
      font-size: 3.3vw;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  wrap: no-wrap;
  gap: 15px;
  align-items: center;
  width: 64%;
  padding: 70px 40px 40px;
  background: #ffffff;
  box-shadow: 0px 0px 10px #ececec;
  border-radius: 5px;
  margin-bottom: ${(props) => (props.simulated ? "50" : "0")}px;

  input,
  select {
    width: 100%;
    height: 50px;
    background: #ffffff;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 0 20px 0 20px;
  }

  input:not(last-child),
  select {
    border: 1px solid ${(props) => (props.submit ? "#ff3434" : "#D4D4D4")};
    :required:valid {
      border: 1px solid #d4d4d4;
    }
  }

  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    color: #737373;
    :valid,
    option {
      color: #000;
    }
  }

  input[type="date"] {
    color: #737373;
    ::-webkit-calendar-picker-indicator {
      filter: invert(45%);
    }
    :valid {
      color: #000;
      ::-webkit-calendar-picker-indicator {
        filter: none;
      }
    }
  }

  input[type="submit"] {
    background: #f3a126;
    border: 1px solid #d4d4d4;
    box-shadow: 0px 4px 4px rgba(135, 135, 135, 0.25);
    font-family: "Open Sans", sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: ease-out 0.3s;

    :active {
      filter: saturate(200%);
      transform: scale(1.01);
      transition: ease-out 0.1s;
    }
  }
`;

export const Simulation = styled.div`
  width: 64%;
  padding: 10px 40px 40px;
  background: #ffffff;
  box-shadow: 0px 0px 10px #ececec;
  border-radius: 5px;
  font-family: "Open Sans", sans-serif;

  .first_section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .sub_section {
      width: 30%;
      font-weight: 700;

      .name {
        font-size: 14px;
        color: #737373;
      }
      .value {
        font-size: 20px;
        color: #333333;
      }
    }
  }

  .second_section {
    .second_section_title {
      font-weight: 700;
      font-size: 14px;
    }

    table {
      width: 100%;
      text-align: left;
      border-collapse: collapse;
    }

    td,
    th {
      border-bottom: 1px solid #c4c4c4;
      padding: 10px 0 10px 0;
      font-size: 16px;
      color: #333333;

      :nth-child(2) {
        width: 13%;
      }
    }

    tr:last-child > td {
      border: none;
      padding: 10px 0 5px 0;
    }

    hr {
      border-top: 1px solid #c4c4c4;
      border-bottom: none;
    }
  }

  .buttonWrapper {
    text-align: center;

    input[type="button"] {
      width: 50%;
      background: #21ae1e;
      border: none;
      box-shadow: 0px 4px 4px rgba(135, 135, 135, 0.25);
      border-radius: 6px;
      font-family: "Open Sans", sans-serif;
      font-size: 17px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 0.08em;
      text-align: center;
      padding: 15px;
      margin-top: 50px;
      cursor: pointer;
      transition: ease-out 0.3s;

      :active {
        filter: saturate(200%);
        transform: scale(1.01);
        transition: ease-out 0.1s;
      }
    }
  }

  @media screen and (max-width: 830px) {
    .name,
    .value,
    td,
    th,
    input[type="button"] {
      font-size: 2vw !important;
    }

    .second_section_title {
      font-size: 3vw !important;
    }

    input[type="button"] {
      font-size: 1.8vw !important;
    }
  }
`;
