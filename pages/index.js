import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import Page from '../components/HOC/Page'

const Container = styled(Grid) `
  margin: 20px;
`

const FormContainer = styled(Row) `
  margin-top: 60px;
  margin-bottom: 30px;
`

const FormBox = styled(Col) `
  border: 3px solid #e6e6e6;
  border-radius: 4px;
  min-height: 390px;
  padding: 20px 60px;
`

const LoginTitle = styled.div`
  font-size: 1.7em;
  font-weight: 500;
  margin-bottom: 5px;
`

const LoginSubTitle = styled.div`
  font-size: 14px;
  margin-bottom: 40px;
`

const Input = styled.input`
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1em;
  line-height: 2;
  color: #495057;
  background-color: #fff;
  background-image: none;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  &:focus {
    border-color: #0e5aa7;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
  }
  &.error {
    border-color: #f53f50;
    border-top-right-radius: 0;
  }
`

const Div = styled.div`
  margin-bottom: 30px;
`

const RememberLoginContainer = styled.div`
  font-size: 12px;
  margin-bottom: 20px;
  &:after {
    content: ' ';
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
  div {
    display: inline-block;
    &:first-child {
      float: left;
    }
    &:last-child {
      float: right;
    }
  }
`

const Checkbox = styled.label`
  vertical-align: middle;
  position: relative;
  padding-left: 30px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 18px;
  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  input:checked ~ div {
    background: #0e5aa7;
  }
  input:checked ~ div:after {
    display: block;
    top: 4px;
    left: 8px;
    width: 5px;
    height: 10px;
    transform: rotate(45deg);
    border: solid #fff;
    border-width: 0 2px 2px 0;
  }
  input:disabled ~ div:after {
    border-color: #7b7b7b;
  }
  input:disabled ~ div {
    pointer-events: none;
    opacity: .6;
    background: #e6e6e6;
  }
  div {
    border-radius: 4px;
    position: absolute;
    top: 2px;
    left: 0;
    width: 20px;
    height: 20px;
    background: #0e5aa7;
    &:after {
      position: absolute;
      display: none;
      content: '';
    }
  }
`;

const ForgotPassword = styled.div`
  line-height: 1.4;
`

const Link = styled.a`
  color: #0e5aa7;
  text-decoration: none;
`

const Button = styled.button`
  font-size: 1.2em;
  width: 100%;
  cursor: pointer;
  display: block;
  position: relative;
  padding: 0;
  margin: 10px 20px 10px 0;
  font-weight: 600;
  text-align: center;
  line-height: 50px;
  color: #FFF;
  border: 1px solid transparent;
  border-radius: 5px;
  transition: all 0.2s;
  background: #0e5aa7;
  &:hover {
    background: #072e56;
  }
`

const ErrorMessage = styled.div`
  float: right;
  background-color: #ffb2b9;
  color: #f53f50;
  padding: 5px;
`

const SearchIcon = css`
  color: #0e5aa7;
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: '\f002';
`

const SearchContainer = styled.div`
  background: #d5eaff;
  border-radius: 5px;
  float: right;
  position: relative;
  display: inline-block;
  margin: 4px 2px;
  height: 30px;
  width: 40px;
  vertical-align: bottom;
`

const SearchButton = styled.label`
  line-height: 2;
  margin-left: 14px;
  cursor: pointer;
  span {
    &:before {
      ${SearchIcon} 
    }
  }
`

const SearchInput = styled.input`
  position: absolute;
  left: 49px;
  background-color: #d5eaff;
  outline: none;
  border: none;
  width: 0;
  height: 100%;
  z-index: 10;
  transition-duration: 0.4s;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  &:focus {
    width: 200px;
    padding: 10px;
  }
  left: auto;
	right: 32px;
`

const ProductSuggestion = styled(Row) `
  border-top: 1px solid #e6e6e6;
  padding: 20px;
`

const ProductBox = styled(Col) `
  border: 1px solid #e6e6e6;
  background: url(../static/carrefour-product.png) no-repeat 50% 50%;
  height: 200px;
  margin-bottom: 10px;
  background-size: contain;
`

const ProductName = styled.div`
  font-size: 1em;
  color: #777676;
`

const ProductCode = styled.div`
  font-size: 1.2em;
`

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    {touched && error && <ErrorMessage>{error}</ErrorMessage>}
    <Input {...input} className={touched && error ? "error" : ""} placeholder={label} type={type} />
  </div>
)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
  return sleep(1000).then(() => {
    // simulate server latency
    if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw new SubmissionError({
        username: 'User does not exist',
        _error: 'Login failed!'
      })
    } else if (values.password !== 'password') {
      throw new SubmissionError({
        password: 'Wrong password',
        _error: 'Login failed!'
      })
    } else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    }
  })
}

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required field'
  }
  if (!values.password) {
    errors.password = 'Required field'
  }
  return errors
}

class Index extends Component {
  handleSubmit(event) {
    console.log('hello')
    event.preventDefault();
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <Container fluid>
        <Row>
          <Col xs={4}>
            <img width="200" src="../static/logo.png" alt="Carrefour UAE Logo" />
          </Col>
          <Col xs={8}>
            <SearchContainer>
              <form>
                <SearchInput id="searchright" type="search" name="q" placeholder="Search" />
                <SearchButton htmlFor="searchright">
                  <span></span>
                </SearchButton>
              </form>
            </SearchContainer>
          </Col>
        </Row>
        <FormContainer center="xs">
          <FormBox xs={12} sm={6} md={6} lg={4}>
            <form onSubmit={handleSubmit(submit)} noValidate>
              <LoginTitle>Sign In Now</LoginTitle>
              <LoginSubTitle>Unlock awesome features!</LoginSubTitle>
              <Div>
                <Field
                  name="username"
                  type="text"
                  id="username"
                  component={renderField}
                  label="Username"
                  placeholder="Username" />
              </Div>
              <Div>
                <Field
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  component={renderField}
                />
              </Div>
              <RememberLoginContainer>
                <div>
                  <Checkbox>
                    <input id="keep-me-logged-in" type="checkbox" />
                    <div></div>
                  </Checkbox>
                  <span>Keep me logged in</span>
                </div>
                <ForgotPassword><Link href="">Forgot Password?</Link></ForgotPassword>
              </RememberLoginContainer>
              <Div>
                <Button type="submit">SIGN IN</Button>
              </Div>
            </form>
          </FormBox>
        </FormContainer>
        <ProductSuggestion>
          <Col xs={4}>
            <ProductBox />
            <ProductName>iPhone 6 Black</ProductName>
            <ProductCode>AED 1000</ProductCode>
          </Col>
          <Col xs={4}>
            <ProductBox />
            <ProductName>iPhone 7 Black</ProductName>
            <ProductCode>AED 2000</ProductCode>
          </Col>
          <Col xs={4}>
            <ProductBox />
            <ProductName>iPhone 8 Black</ProductName>
            <ProductCode>AED 3000</ProductCode>
          </Col>
        </ProductSuggestion>
      </Container>
    )
  }
}

const LoginEnhanced = reduxForm({
  form: 'login', // a unique identifier for this form
  validate
})(Index)

export default Page(LoginEnhanced)