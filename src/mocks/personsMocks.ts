import { type PersonMockStructure } from "../server/types";
import { Types } from "mongoose";

const personMock: PersonMockStructure[] = [
  {
    _id: new Types.ObjectId(),
    image: "fotico",
    name: "Marc",
    password: "$2y$10$JJVK.zgT9wLURyjEl64HM.gy8iM9OodTINog9t5u0Lj72S5XsvgOa",
    username: "Maracos",
  },
];

export default personMock;
