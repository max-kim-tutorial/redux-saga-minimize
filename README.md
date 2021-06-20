# Minimize Redux+Saga Typing

- Redux+Saga의 타이핑을 여러 도구를 이용해 줄여봅니다.
- 사용 도구 : Redux Toolkit, 자체 utils

## Motivation

- [이 글](https://maxkim-j.github.io/posts/how-to-use-redux-saga)에서 Redux+Saga가 러닝 커브가 높은 편이고, 타이핑이 너무 많다고 불평(?)한 바 있습니다.
- 실제로 Saga를 도입해서 프로젝트를 했을 때, 반복되는 타이핑에 지쳐 컴포넌트 단에 Saga를 사용하다 말고 async/await 를 사용해 컴포넌트 단에서 API를 패치했던 적도 있습니다. 비즈니스 로직과 UI로직이 섞이고, 프로덕트의 일관성 있는 컨벤션을 침해하는 좋지 않은 방법인데도 말입니다.
- Redux Toolkit의 createSlice를 사용하면 리덕스+사가의 타이핑을 많이 줄일 수 있습니다. 하지만 혹시 자체 유틸 함수를 이용해 '더' 줄일 수 있는지 타진합니다.

## Requirements

다음과 같은 요구사항을 만족해야 합니다.

1. 타입 오류가 발생하지 않아야 합니다(TypeScript를 사용합니다)
2. 추론이 잘 되서 오류 없이 돌아가더라도, 개발자들의 원할한 협업을 위해 타입을 노출시키는게 좋다고 판단 될 경우 명시적으로 타입을 작성합니다.
3. 맹목적으로 타이핑을 줄이는 것만이 목적이 되어서는 안 됩니다. **타이핑을 해야 좋은 부분**도 명백히 존재함을 인지하고 팀의 생산성과 프로덕트의 유지보수에 기여할 수 있는 방향으로 생각하려 노력합니다.
4. 프로젝트에 실제로 적용될 수 있음을 인지하며, **쓸만한 practice**를 만듭니다.
