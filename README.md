# 한이음 프로젝트

## WebAR, WebRTC를 이용한 MZ세대를 위한 온라인 화상회의 앱

### 팀원 소개
| 이름 | 역할 |
| ------ | ------ |
| 권지환 | PM: 프로젝트 총괄 및 수행 계획 조정, DB관리|
| 송준원 | 개발자: 아바타 모델링 및 이모지 모델링 프로젝트 개발 총괄|
| 이도영 | 개발자: 아바타 모델링 및 이모지 모델링, 개발 관련 내용 총괄|
| 윤민성 | 아키텍트: WebRTC 관리 및 서버 관리|

### 팀 규칙

1. 조 활동 및 회의 시 시간준수
2. 브레인스토밍 시간에 본인 의견 2번 이상 내기, 의견 충돌 시 투표로 의견 결정
3. 서로의 프로젝트나 아이디어에 대해 검토, 수정 도와주고 피드백 해주기
4. 자신이 맡은 파트 이외의 코드를 바꿀때, 담당자에게 확인 후 수정


웹을 통한 온라인 화상회의 앱

master-new 브랜치 이용 작업 수행, 최종 발표전 디폴트 브랜치, master 브랜치로 최종 변경.

------------------------------------

# 프로젝트 소개

3D아바타와 이모지를 통해 오락적 요소를 가미한 온라인 화상회의 앱

 1. 작품 구성도
   1) 서비스 흐름도
    

① 사용자는 회워가입, 로그인을 진행
② 방을 생성하여 URL과 입력코드를 생성
③ URL에서 입력 코드를 입력하여 입장
④ 화면 대체도구를 설정
  - 아바타 설정
  - 이모지 설정
⑤ 설정된 화면으로 화상회의를 진행
  - 문자채팅과 영상채팅으로 구분하여 진행
⑥ 환경 설정(음량, 화면, 마이크 설정)
⑦ 시스템 종료


   2) S/W 구성도
    

○ 화상회의 아바타 설정
  1. 사용자는 React로 제작된 화상회의에 Web을 통해 통신한다.
  2. 사용자는 아바타 및 이모지를 설정하거나 제작하지 않는다.
  3. 아바타 및 이모지를 저장하고 싶거나 가져오고 싶다면 Firebase 서버에 요청한다.
○ 화상회의 통신
  4. 화상회의 아바타 및 이모지 등의 설정이 끝났다면 WebRTC와 three.js등으로 제작된 화상회의를 사용할 수 있다.
