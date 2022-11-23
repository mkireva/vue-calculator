export interface IResult {
  error: { code: number; message: string };
  jsonrpc: String;
  result: Number;
  id: Number;
}

let calcId = 0;

export const createNumber = async (
  first: Number,
  second: Number
): Promise<IResult> => {
  const body = {
    jsonrpc: "2.0",
    method: "add",
    params: {
      first: first,
      second: second,
    },
    id: calcId++,
  };

  return await fetch("http://localhost:9090/jrpc", {
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  }).then((val) => val.json());
};
