const { readFile } = require("../src/readFile");

describe("async/await - readFile함수를 async/await 만 사용하여 테스트 통과하기", () => {
  test("assets/first.json을 불러오기", async () => {
    const data = await readFile("assets/first.json");
    const first = JSON.parse(data);
    expect(first.hi).toBe("방가방가");
  });

  test("assets/first.json에서 불러온 second_key를 이용해 second.json에서 key에 일치하는 오브젝트 찾기", async () => {
    const firstData = await readFile("assets/first.json");
    const secondData = await readFile("assets/second.json");

    const first = JSON.parse(firstData);
    const seconds = JSON.parse(secondData);

    secondKey = first?.["second_key"];
    const second = seconds.find((obj) => obj.key === secondKey);

    expect(second.hi).toBe("Second 방가방가");
  });

  test("assets/second.json에서 불러온 third_key를 이용해 third.json에서 key에 일치하는 오브젝트 찾기", async () => {
    const buffers = await Promise.all([
      readFile("assets/first.json"),
      readFile("assets/second.json"),
      readFile("assets/third.json"),
    ]);

    const [first, seconds, thirds] = buffers.map((data) => JSON.parse(data));

    const secondKey = first?.["second_key"];
    const second = seconds.find((obj) => obj.key === secondKey);
    const thirdKey = second?.["third_key"];
    const third = thirds.find((obj) => obj.key === thirdKey);

    expect(third.hi).toBe("Third 방가방가");
  });
});
