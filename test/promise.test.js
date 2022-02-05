const { readFile } = require("../src/readFile");

describe("Promise - fs.readFile를 프로미스 패턴만 사용", () => {
  test("fs.readFile을 이용해 Promise를 반환하는 readFile 함수 만들기", (done) => {
    const promise = readFile("assets/first.json");
    expect(promise instanceof Promise).toBe(true);
    done();
  });

  test("assets/first.json을 불러오기", (done) => {
    readFile("assets/first.json").then((data) => {
      const first = JSON.parse(data);
      expect(first.hi).toBe("방가방가");
      done();
    });
  });

  test("assets/first.json에서 불러온 second_key를 이용해 second.json에서 key에 일치하는 오브젝트 찾기", (done) => {
    let secondKey = null;

    readFile("assets/first.json")
      .then((data) => {
        const first = JSON.parse(data);
        secondKey = first?.["second_key"];

        return readFile("assets/second.json");
      })
      .then((data) => {
        const secondData = JSON.parse(data);
        const second = secondData.find((obj) => obj.key === secondKey);

        expect(second.hi).toBe("Second 방가방가");
        done();
      });
  });

  test("assets/second.json에서 불러온 third_key를 이용해 third.json에서 key에 일치하는 오브젝트 찾기", (done) => {
    let secondKey = null;
    let thirdKey = null;

    readFile("assets/first.json")
      .then((data) => {
        const first = JSON.parse(data);
        secondKey = first?.["second_key"];

        return readFile("assets/second.json");
      })
      .then((data) => {
        const secondData = JSON.parse(data);
        const second = secondData.find((obj) => obj.key === secondKey);
        thirdKey = second["third_key"];

        return readFile("assets/third.json");
      })
      .then((data) => {
        const thirdData = JSON.parse(data);
        const third = thirdData.find((obj) => obj.key === thirdKey);
        expect(third.hi).toBe("Third 방가방가");
        done();
      });
  });
});
