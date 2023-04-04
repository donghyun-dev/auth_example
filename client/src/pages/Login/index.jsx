import axios from "axios";
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthApis } from "../../apis";
import {
  Button,
  Error,
  Form,
  Header,
  Input,
  Label,
  LinkContainer,
  Success,
} from "../SignUp/style";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginState, setLoginState] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  //동기식으로 로그인정보를 통신하여 출력
  const onSubmitAccount = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email || !password) {
        alert("이메일 또는 비밀번호를 입력해주세요!");
        return;
      }
      console.log("서버로 보냅니다.");
      try {
        const { data } = await AuthApis.userLogIn({
          email,
          password,
        });
        if (data.isSuccess) {
          setIsSuccess(data.isSuccess);
          setLoginState(data);
          navigate("/", { replace: true });
          alert("로그인 성공!");
        } else {
          setIsSuccess(data.isSuccess);
          setLoginState(data);
          alert("로그인 실패!");
        }
      } catch (error) {
        alert(`네트워크 에러가 생겼습니다. \n message: ${error.message}`);
      }
    },
    [email, password, navigate]
  );

  return (
    <div id="container">
      <Header>Demo</Header>
      <Form>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              onChange={onChangeEmail}
            />
            {!email && <Error>이메일을 입력해주세요.</Error>}
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              onChange={onChangePassword}
            />
            {!password && <Error>비밀번호를 입력해주세요.</Error>}
          </div>
          {isSuccess && <Success>로그인 성공!!</Success>}
          {loginState.isSuccess === false && (
            <Error>
              아이디 또는 비밀번호를 잘못입력했습니다.
              <br />
              다시 한번 확인해주세요
            </Error>
          )}
        </Label>
        <Button type="submit" onClick={onSubmitAccount}>
          로그인
        </Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
}

export default LoginForm;
