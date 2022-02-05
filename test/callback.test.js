const fs = require("fs");

describe("Callback - fs.readFile를 콜백 패턴만 사용", () => {
  test("assets/first.json을 불러오기", (done) => {
    fs.readFile("assets/first.json", (err, data) => {
      const first = JSON.parse(data);
      expect(first.hi).toBe("방가방가");
      done();
    });
  });

  test("assets/first.json에서 불러온 second_key를 이용해 second.json에서 key에 일치하는 오브젝트 찾기", (done) => {
    fs.readFile("assets/first.json", (err, data) => {
      const first = JSON.parse(data);
      const secondKey = first?.["second_key"];

      fs.readFile("assets/second.json", (err, data) => {
        const secondData = JSON.parse(data);
        const second = secondData.find((obj) => obj.key === secondKey);

        expect(second.hi).toBe("Second 방가방가");
        done();
      });
    });
  });

  test("assets/second.json에서 불러온 third_key를 이용해 third.json에서 key에 일치하는 오브젝트 찾기", (done) => {
    fs.readFile("assets/first.json", (err, data) => {
      const first = JSON.parse(data);
      const secondKey = first?.["second_key"];

      fs.readFile("assets/second.json", (err, data) => {
        const secondData = JSON.parse(data);
        const second = secondData.find((obj) => obj.key === secondKey);
        const thirdKey = second["third_key"];

        fs.readFile("assets/third.json", (err, data) => {
          const thirdData = JSON.parse(data);
          const third = thirdData.find((obj) => obj.key === thirdKey);
          expect(third.hi).toBe("Third 방가방가");
          done();
        });
      });
    });
  });
});
