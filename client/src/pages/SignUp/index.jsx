import React, { useCallback, useState } from 'react';
import { UserApis, AuthApis } from "../../apis";
import {
  Header,
  Form,
  Input,
  Label,
  Button,
  LinkContainer,
  Error,
  Success,
} from './style';

import { Link } from 'react-router-dom';

const SignUp = () => {
  const data = true;
  const [email, setEmail] = useState('');
  const [nickname, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const onChangeEmail = useCallback(
    e => {
      setEmail(e.target.value);
    },
    [setEmail],
  );
  const onChangeNickname = useCallback(
    e => {
      setNickName(e.target.value);
    },
    [setNickName],
  );

  const onChangePassword = useCallback(
    e => {
      setPassword(e.target.value);
      setMismatchError(passwordCheck !== e.target.value);
    },
    [passwordCheck, setPassword],
  );

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      setMismatchError(password !== e.target.value);
    },
    [password, setPasswordCheck],
  );
  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      // 비밀번호 일치하는 지 체크
      if (!mismatchError) {
        console.log('서버로 회원가입하기');

        try {
          const {data} = await UserApis.createUser({
            email,
            nickname,
            password,
          })
          // const { data } = await axios.post(
          //   '/api/users/signup',
          //   {
          //     email,
          //     nickname,
          //     password,
          //   },
          //   { withCredentials: true },
          // );

          console.log(data);
          data.isSuccess
            ? setIsSuccess(data.isSuccess)
            : setIsSuccess(data.isSuccess);
        } catch (error) {
          alert(`네트워크 에러가 생겼습니다. \n message: ${error}`);
        }
      }
    },
    [email, mismatchError, nickname, password],
  );

  // 로딩중 처리
  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  // 로그인이 된 상황
  // if (data) {
  //   return <Redirect to="/workspace/channel" />;
  // }

  return (
    <div id="container">
      <Header>Demo</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
            {!email && <Error>이메일을 입력해주세요.</Error>}
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={onChangeNickname}
            />
            {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {isSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
          {isSuccess === false && <Error>이미 사용중인 계정입니다.</Error>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
